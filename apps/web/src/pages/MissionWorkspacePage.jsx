
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { useAuth } from '@/contexts/AuthContext.jsx';
import pb from '@/lib/pocketbaseClient';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import ConversationHistory from '@/components/ConversationHistory.jsx';
import FollowUpQuestions from '@/components/FollowUpQuestions.jsx';
import FeedbackPanel from '@/components/FeedbackPanel.jsx';
import { 
  getContextAwareGuidance, 
  generateFeedback, 
  generateFollowUpQuestions, 
  handleCustomQuestion 
} from '@/lib/aiService.js';
import { Save, Send, ArrowLeft, Sparkles } from 'lucide-react';
import { toast } from 'sonner';

function MissionWorkspacePage() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [chatLoading, setChatLoading] = useState(false);
  
  const [mission, setMission] = useState(null);
  const [userMission, setUserMission] = useState(null);
  const [output, setOutput] = useState('');
  const [feedback, setFeedback] = useState(null);
  
  const [messages, setMessages] = useState([]);
  const [followUps, setFollowUps] = useState([]);
  const [customQuestion, setCustomQuestion] = useState('');

  useEffect(() => {
    loadMissionData();
  }, [currentUser]);

  const loadMissionData = async () => {
    try {
      setLoading(true);
      const user = await pb.collection('users').getOne(currentUser.id, { $autoCancel: false });
      const currentProgramId = user.current_program_id;
      const currentDay = user.current_day || 1;

      if (!currentProgramId) {
        toast.error('No program assigned. Please enroll in a program first.');
        navigate('/programs');
        return;
      }

      const missions = await pb.collection('missions').getFullList({
        filter: `program_id = "${currentProgramId}" && day_number = ${currentDay}`,
        $autoCancel: false
      });

      if (missions.length === 0) {
        toast.error('No mission found for today');
        navigate('/');
        return;
      }

      const currentMission = missions[0];
      setMission(currentMission);

      const userMissions = await pb.collection('user_missions').getFullList({
        filter: `user_id = "${currentUser.id}" && mission_id = "${currentMission.id}"`,
        $autoCancel: false
      });

      let umRecord;
      if (userMissions.length > 0) {
        umRecord = userMissions[0];
        setUserMission(umRecord);
        setOutput(umRecord.output || '');
        if (umRecord.status === 'completed' && umRecord.feedback) {
          setFeedback(umRecord.feedback);
        }
        if (umRecord.ai_coach_messages && umRecord.ai_coach_messages.length > 0) {
          setMessages(umRecord.ai_coach_messages);
          const lastMsg = umRecord.ai_coach_messages[umRecord.ai_coach_messages.length - 1];
          setFollowUps(generateFollowUpQuestions(currentMission.title, lastMsg.text));
        } else {
          initializeChat(currentMission, umRecord, user);
        }
      } else {
        umRecord = await pb.collection('user_missions').create({
          user_id: currentUser.id,
          mission_id: currentMission.id,
          status: 'in_progress',
          ai_coach_messages: []
        }, { $autoCancel: false });
        setUserMission(umRecord);
        initializeChat(currentMission, umRecord, user);
      }
    } catch (error) {
      console.error('Error loading mission:', error);
      toast.error('Failed to load mission data');
    } finally {
      setLoading(false);
    }
  };

  const initializeChat = async (missionData, umRecord, user) => {
    const initialMsg = getContextAwareGuidance(missionData.title, {
      completedMissions: user.current_day - 1,
      streak: user.streak_count
    }, []);
    
    const newMessages = [initialMsg];
    setMessages(newMessages);
    setFollowUps(generateFollowUpQuestions(missionData.title, initialMsg.text));
    
    await pb.collection('user_missions').update(umRecord.id, {
      ai_coach_messages: newMessages
    }, { $autoCancel: false });
  };

  const handleAskQuestion = async (questionText) => {
    if (!questionText.trim() || !userMission) return;
    
    const userMsg = {
      id: Date.now().toString(),
      sender: 'user',
      text: questionText,
      timestamp: new Date().toISOString()
    };

    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setCustomQuestion('');
    setFollowUps([]);
    setChatLoading(true);

    // Simulate AI delay
    setTimeout(async () => {
      const aiResponse = handleCustomQuestion(questionText, mission.title, updatedMessages);
      const finalMessages = [...updatedMessages, aiResponse];
      
      setMessages(finalMessages);
      setFollowUps(generateFollowUpQuestions(mission.title, aiResponse.text));
      setChatLoading(false);

      try {
        await pb.collection('user_missions').update(userMission.id, {
          ai_coach_messages: finalMessages
        }, { $autoCancel: false });
      } catch (err) {
        console.error("Failed to save chat history", err);
      }
    }, 1000);
  };

  const handleSaveDraft = async () => {
    if (!userMission) return;
    try {
      setSaving(true);
      await pb.collection('user_missions').update(userMission.id, {
        output: output,
        status: 'in_progress'
      }, { $autoCancel: false });
      toast.success('Draft saved');
    } catch (error) {
      toast.error('Failed to save draft');
    } finally {
      setSaving(false);
    }
  };

  const handleSubmit = async () => {
    if (!userMission || !mission) return;
    if (output.trim().length < 20) {
      toast.error('Please write at least 20 characters before submitting');
      return;
    }

    try {
      setSubmitting(true);
      const generatedFeedback = generateFeedback(mission.title, output);
      setFeedback(generatedFeedback);

      await pb.collection('user_missions').update(userMission.id, {
        output: output,
        status: 'completed',
        feedback: generatedFeedback,
        submitted_at: new Date().toISOString()
      }, { $autoCancel: false });

      const user = await pb.collection('users').getOne(currentUser.id, { $autoCancel: false });
      await pb.collection('users').update(currentUser.id, {
        current_day: (user.current_day || 1) + 1,
        streak_count: (user.streak_count || 0) + 1
      }, { $autoCancel: false });

      toast.success('Mission completed! Great work!');
      setTimeout(() => {
        document.getElementById('feedback-section')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } catch (error) {
      toast.error('Failed to submit mission');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <div className="flex-1 container mx-auto px-4 py-12">
          <Skeleton className="h-12 w-64 mb-8" />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6"><Skeleton className="h-64" /><Skeleton className="h-96" /></div>
            <div><Skeleton className="h-[600px]" /></div>
          </div>
        </div>
      </div>
    );
  }

  if (!mission) return null;

  return (
    <>
      <Helmet>
        <title>{`Day ${mission.day_number}: ${mission.title} - Learnfinity`}</title>
      </Helmet>

      <div className="min-h-screen bg-background flex flex-col relative">
        {/* Subtle background reference */}
        <div className="fixed inset-0 opacity-[0.02] pointer-events-none z-0" 
             style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1675023035272-3426884896f8)', backgroundSize: 'cover', backgroundPosition: 'center' }} />
        
        <div className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
          <Button variant="ghost" onClick={() => navigate('/')} className="mb-6 gap-2">
            <ArrowLeft className="w-4 h-4" /> Back to dashboard
          </Button>

          <div className="mb-8">
            <Badge variant="outline" className="mb-3">Day {mission.day_number}</Badge>
            <h1 className="text-4xl font-bold text-foreground mb-4 tracking-tight">{mission.title}</h1>
            <p className="text-lg text-muted-foreground">{mission.objective}</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Mission Details & Output */}
            <div className="lg:col-span-2 space-y-6">
              <Card className="shadow-md border-border/50">
                <CardHeader><CardTitle>Mission details</CardTitle></CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Instructions</h3>
                    <p className="text-sm text-foreground/80 leading-relaxed whitespace-pre-line">{mission.instructions}</p>
                  </div>
                  <div className="bg-muted/30 p-4 rounded-xl border border-border/50">
                    <h3 className="font-semibold text-foreground mb-2">Expected output</h3>
                    <p className="text-sm text-foreground/80 leading-relaxed whitespace-pre-line">{mission.expected_output}</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-md border-border/50">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Your output</CardTitle>
                    <span className="text-sm text-muted-foreground">{output.length} characters</span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Textarea
                    value={output}
                    onChange={(e) => setOutput(e.target.value)}
                    placeholder="Start writing your response here..."
                    className="min-h-[300px] text-foreground resize-none bg-background"
                    disabled={userMission?.status === 'completed'}
                  />
                  {userMission?.status !== 'completed' && (
                    <div className="flex gap-3">
                      <Button variant="outline" onClick={handleSaveDraft} disabled={saving} className="gap-2">
                        <Save className="w-4 h-4" /> {saving ? 'Saving...' : 'Save draft'}
                      </Button>
                      <Button onClick={handleSubmit} disabled={submitting || output.trim().length < 20} className="gap-2">
                        <Send className="w-4 h-4" /> {submitting ? 'Submitting...' : 'Submit mission'}
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>

              {feedback && (
                <div id="feedback-section">
                  <FeedbackPanel feedback={feedback} />
                </div>
              )}
            </div>

            {/* Right Column - AI Coach Interface */}
            <div className="lg:h-[calc(100vh-12rem)] sticky top-24">
              <Card className="h-full flex flex-col shadow-lg border-primary/20 bg-card/95 backdrop-blur-sm">
                <CardHeader className="border-b border-border/50 pb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                      <Sparkles className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">Jordy</CardTitle>
                      <p className="text-xs text-muted-foreground">AI Learning Coach</p>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="flex-1 overflow-hidden p-0 flex flex-col">
                  <div className="flex-1 overflow-hidden px-4">
                    <ConversationHistory messages={messages} loading={chatLoading} />
                  </div>
                  
                  <div className="px-4 pb-2">
                    <FollowUpQuestions questions={followUps} onQuestionClick={handleAskQuestion} />
                  </div>

                  <div className="p-4 border-t border-border/50 bg-muted/10">
                    <form 
                      onSubmit={(e) => { e.preventDefault(); handleAskQuestion(customQuestion); }}
                      className="flex gap-2"
                    >
                      <Input
                        value={customQuestion}
                        onChange={(e) => setCustomQuestion(e.target.value)}
                        placeholder="Ask Jordy a question..."
                        className="flex-1 bg-background"
                        disabled={chatLoading}
                      />
                      <Button type="submit" size="icon" disabled={!customQuestion.trim() || chatLoading}>
                        <Send className="w-4 h-4" />
                      </Button>
                    </form>
                    <p className="text-[10px] text-center text-muted-foreground mt-3">
                      Real AI will respond to custom questions when API key is configured.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MissionWorkspacePage;
