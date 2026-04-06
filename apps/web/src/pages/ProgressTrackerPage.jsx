
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { useAuth } from '@/contexts/AuthContext.jsx';
import pb from '@/lib/pocketbaseClient';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Skeleton } from '@/components/ui/skeleton';
import StreakCounter from '@/components/StreakCounter.jsx';
import { ArrowLeft, Calendar, CheckCircle2, FileText } from 'lucide-react';
import { toast } from 'sonner';
import { format, subDays, isSameDay } from 'date-fns';

function ProgressTrackerPage() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [userMissions, setUserMissions] = useState([]);
  const [program, setProgram] = useState(null);
  const [calendarDays, setCalendarDays] = useState([]);

  useEffect(() => {
    loadProgressData();
  }, [currentUser]);

  const loadProgressData = async () => {
    try {
      setLoading(true);

      // Fetch user data
      const user = await pb.collection('users').getOne(currentUser.id, { $autoCancel: false });

      // Fetch program
      if (user.current_program_id) {
        const programData = await pb.collection('programs').getOne(user.current_program_id, { $autoCancel: false });
        setProgram(programData);
      }

      // Fetch all user missions with mission details
      const missions = await pb.collection('user_missions').getFullList({
        filter: `user_id = "${currentUser.id}"`,
        expand: 'mission_id',
        sort: '-submitted_at',
        $autoCancel: false
      });

      setUserMissions(missions);

      // Generate calendar for last 30 days
      const days = [];
      for (let i = 29; i >= 0; i--) {
        const date = subDays(new Date(), i);
        const completedMission = missions.find(m => 
          m.status === 'completed' && 
          m.submitted_at && 
          isSameDay(new Date(m.submitted_at), date)
        );
        
        days.push({
          date,
          completed: !!completedMission,
          mission: completedMission
        });
      }
      setCalendarDays(days);

    } catch (error) {
      console.error('Error loading progress:', error);
      toast.error('Failed to load progress data');
    } finally {
      setLoading(false);
    }
  };

  const completedMissions = userMissions.filter(m => m.status === 'completed');
  const currentDay = currentUser?.current_day || 1;
  const totalDays = program?.duration_days || 30;
  const progressPercentage = (currentDay / totalDays) * 100;

  if (loading) {
    return (
      <>
        <Helmet>
          <title>Progress Tracker - Learnfinity</title>
          <meta name="description" content="Track your AI learning progress and completed missions." />
        </Helmet>
        <div className="min-h-screen bg-background flex flex-col">
          <div className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <Skeleton className="h-12 w-64 mb-8" />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                <Skeleton className="h-96" />
              </div>
              <div className="space-y-6">
                <Skeleton className="h-48" />
                <Skeleton className="h-48" />
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>Progress Tracker - Learnfinity</title>
        <meta name="description" content="Track your AI learning progress and completed missions." />
      </Helmet>

      <div className="min-h-screen bg-background flex flex-col">
        <div className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Back Button */}
          <Button
            variant="ghost"
            onClick={() => navigate('/')}
            className="mb-6 gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to dashboard
          </Button>

          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-4" style={{letterSpacing: '-0.02em'}}>
              Your progress
            </h1>
            <p className="text-lg text-muted-foreground">
              Track your learning journey and celebrate your achievements
            </p>
          </div>

          {/* Main Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Calendar & Recent Outputs */}
            <div className="lg:col-span-2 space-y-6">
              {/* Calendar View */}
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-primary" />
                    <CardTitle>Last 30 days</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-7 gap-2">
                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                      <div key={day} className="text-center text-xs font-medium text-muted-foreground pb-2">
                        {day}
                      </div>
                    ))}
                    {calendarDays.map((day, index) => (
                      <div
                        key={index}
                        className={`aspect-square rounded-lg flex items-center justify-center text-xs transition-all ${
                          day.completed
                            ? 'bg-accent text-accent-foreground font-semibold'
                            : 'bg-muted text-muted-foreground'
                        }`}
                        title={day.completed ? `Completed: ${day.mission?.expand?.mission_id?.title}` : format(day.date, 'MMM d')}
                      >
                        {day.completed ? <CheckCircle2 className="w-4 h-4" /> : format(day.date, 'd')}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Recent Outputs */}
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <FileText className="w-5 h-5 text-primary" />
                    <CardTitle>Recent outputs</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  {completedMissions.length === 0 ? (
                    <div className="text-center py-12">
                      <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground mb-2">No completed missions yet</p>
                      <p className="text-sm text-muted-foreground">
                        Start your first mission to see your progress here
                      </p>
                      <Button onClick={() => navigate('/mission')} className="mt-4">
                        Start today's mission
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {completedMissions.slice(0, 5).map((userMission) => (
                        <div
                          key={userMission.id}
                          className="p-4 rounded-lg border bg-card hover:bg-accent/5 transition-colors"
                        >
                          <div className="flex items-start justify-between gap-4 mb-2">
                            <div className="flex-1">
                              <h3 className="font-semibold text-foreground mb-1">
                                {userMission.expand?.mission_id?.title || 'Mission'}
                              </h3>
                              <p className="text-sm text-muted-foreground">
                                {userMission.submitted_at && format(new Date(userMission.submitted_at), 'MMM d, yyyy')}
                              </p>
                            </div>
                            <Badge variant="default" className="gap-1">
                              <CheckCircle2 className="w-3 h-3" />
                              Completed
                            </Badge>
                          </div>
                          {userMission.output && (
                            <p className="text-sm text-foreground/80 line-clamp-2 mt-2">
                              {userMission.output}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Stats */}
            <div className="space-y-6">
              {/* Streak */}
              <StreakCounter streak={currentUser?.streak_count || 0} />

              {/* Program Progress */}
              <Card>
                <CardHeader>
                  <CardTitle>Program progress</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-foreground">
                        Day {currentDay} of {totalDays}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        {Math.round(progressPercentage)}%
                      </span>
                    </div>
                    <Progress value={progressPercentage} className="h-2" />
                  </div>
                  {program && (
                    <div>
                      <p className="text-sm font-medium text-foreground mb-1">
                        {program.title}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {program.description}
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Total Missions */}
              <Card>
                <CardHeader>
                  <CardTitle>Missions completed</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-4">
                    <p className="text-5xl font-bold text-foreground mb-2">
                      {completedMissions.length}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {completedMissions.length === 1 ? 'mission' : 'missions'} completed
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

export default ProgressTrackerPage;
