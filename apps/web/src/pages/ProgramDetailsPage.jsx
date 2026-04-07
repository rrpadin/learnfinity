
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import pb from '@/lib/pocketbaseClient';
import { useAuth } from '@/contexts/AuthContext.jsx';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import EnrollmentDialog from '@/components/EnrollmentDialog.jsx';
import { ArrowLeft, Clock, Users, Star, CheckCircle2, Target, Sparkles } from 'lucide-react';
import { getProgramPresentation } from '@/lib/programPresentation';
import { toast } from 'sonner';

function ProgramDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  
  const [program, setProgram] = useState(null);
  const [missions, setMissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [enrollDialogOpen, setEnrollDialogOpen] = useState(false);

  useEffect(() => {
    fetchProgramDetails();
  }, [id]);

  const fetchProgramDetails = async () => {
    try {
      setLoading(true);
      const programData = await pb.collection('programs').getOne(id, { $autoCancel: false });
      setProgram(programData);

      const missionsData = await pb.collection('missions').getFullList({
        filter: `program_id = "${id}"`,
        sort: 'day_number',
        $autoCancel: false
      });
      setMissions(missionsData);
    } catch (error) {
      console.error("Error fetching program details:", error);
      toast.error("Failed to load program details.");
      navigate('/programs');
    } finally {
      setLoading(false);
    }
  };

  const isCurrentProgram = currentUser?.current_program_id === id;
  const presentation = getProgramPresentation(program || {});
  const HeroIcon = presentation.Icon;

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Skeleton className="w-full h-[400px]" />
        <div className="container mx-auto px-4 py-12 grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-6">
            <Skeleton className="h-12 w-3/4" />
            <Skeleton className="h-32 w-full" />
          </div>
          <Skeleton className="h-[300px] w-full" />
        </div>
      </div>
    );
  }

  if (!program) return null;

  return (
    <>
      <Helmet>
        <title>{`${program.title} - Learnfinity`}</title>
        <meta name="description" content={program.description} />
      </Helmet>

      <div className="min-h-screen bg-background flex flex-col">
        {/* Hero Section */}
        <div className="relative w-full h-[350px] md:h-[450px] overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/75 to-black/20 z-10" />
          <img 
            src={program.cover_image || "https://images.unsplash.com/photo-1632158707180-d2873939cd20"} 
            alt="Program hero background" 
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className={`absolute inset-0 bg-gradient-to-br ${presentation.gradient} opacity-70`} />
          <div className="relative z-20 container mx-auto px-4 h-full flex flex-col justify-end pb-12">
            <Button variant="ghost" className="w-fit mb-6 text-white hover:text-white hover:bg-white/20" onClick={() => navigate('/programs')}>
              <ArrowLeft className="w-4 h-4 mr-2" /> Back to Library
            </Button>
            <div className="flex gap-3 mb-4">
              <Badge variant="secondary" className="bg-white/20 text-white hover:bg-white/30 border-none backdrop-blur-md">
                {program.category}
              </Badge>
              <Badge variant="secondary" className="bg-white/20 text-white hover:bg-white/30 border-none backdrop-blur-md">
                {presentation.formatLabel}
              </Badge>
              {presentation.aiLabel ? (
                <Badge variant="secondary" className="bg-white/20 text-white hover:bg-white/30 border-none backdrop-blur-md">
                  {presentation.aiLabel}
                </Badge>
              ) : null}
              <Badge variant="outline" className="text-white border-white/30 backdrop-blur-md capitalize">
                {program.difficulty}
              </Badge>
            </div>
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15 text-white backdrop-blur-md">
                <HeroIcon className="w-6 h-6" />
              </div>
              {program.jordy_personalization_hint ? (
                <p className="max-w-md text-sm text-white/80">
                  {program.jordy_personalization_hint}
                </p>
              ) : null}
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 tracking-tight text-balance">
              {program.title}
            </h1>
          </div>
        </div>

        <div className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            
            {/* Left Column - Details */}
            <div className="lg:col-span-2 space-y-12">
              {/* Description */}
              <section>
                <h2 className="text-2xl font-semibold mb-4">About this program</h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {program.description}
                </p>
              </section>

              {/* Learning Outcomes */}
              {program.learning_outcomes && program.learning_outcomes.length > 0 && (
                <section>
                  <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
                    <Target className="w-6 h-6 text-primary" />
                    What you'll learn
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {program.learning_outcomes.map((outcome, idx) => (
                      <div key={idx} className="flex items-start gap-3 bg-muted/30 p-4 rounded-xl">
                        <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                        <span className="text-foreground/90">{outcome}</span>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Mission Preview */}
              <section>
                <h2 className="text-2xl font-semibold mb-6">Curriculum Preview</h2>
                <Accordion type="single" collapsible className="w-full">
                  {missions.slice(0, 3).map((mission) => (
                    <AccordionItem key={mission.id} value={mission.id} className="border-border/50">
                      <AccordionTrigger className="hover:no-underline hover:bg-muted/30 px-4 rounded-lg transition-colors">
                        <div className="flex items-center gap-4 text-left">
                          <span className="text-sm font-medium text-muted-foreground w-12">Day {mission.day_number}</span>
                          <span className="font-semibold">{mission.title}</span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="px-4 pt-4 pb-6 text-muted-foreground">
                        <p className="mb-4"><strong className="text-foreground">Objective:</strong> {mission.objective}</p>
                        <p className="whitespace-pre-line">{mission.instructions}</p>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
                {missions.length > 3 && (
                  <p className="text-sm text-muted-foreground mt-4 text-center italic">
                    + {missions.length - 3} more missions included in this program.
                  </p>
                )}
              </section>
            </div>

            {/* Right Column - Sticky Action Card */}
            <div className="relative">
              <div className="sticky top-24">
                <Card className="border-primary/20 shadow-xl">
                  <CardContent className="p-6 md:p-8">
                    <div className="space-y-6">
                      <div className="flex items-center justify-between pb-6 border-b border-border/50">
                        <div className="flex flex-col items-center justify-center gap-1">
                          <Clock className="w-6 h-6 text-muted-foreground" />
                          <span className="text-sm font-medium">{program.duration_days} Days</span>
                        </div>
                        <div className="flex flex-col items-center justify-center gap-1">
                          <Users className="w-6 h-6 text-muted-foreground" />
                          <span className="text-sm font-medium">{program.enrollment_count || 0}+</span>
                        </div>
                        <div className="flex flex-col items-center justify-center gap-1">
                          <Star className="w-6 h-6 text-accent fill-accent" />
                          <span className="text-sm font-medium">{program.rating?.toFixed(1) || 'New'}</span>
                        </div>
                      </div>

                      <div className="space-y-4">
                        {isCurrentProgram ? (
                          <Button size="lg" className="w-full text-lg h-14" onClick={() => navigate('/')}>
                            Continue Program
                          </Button>
                        ) : (
                          <Button size="lg" className="w-full text-lg h-14" onClick={() => setEnrollDialogOpen(true)}>
                            {presentation.isSprint ? 'Start Sprint' : presentation.isAdaptive ? 'Start with Jordy' : 'Enroll Now'}
                          </Button>
                        )}
                        {presentation.aiLabel ? (
                          <Button variant="outline" size="lg" className="w-full text-base h-12 gap-2">
                            <Sparkles className="w-4 h-4" />
                            Ask Jordy to tailor this
                          </Button>
                        ) : null}
                        <p className="text-xs text-center text-muted-foreground">
                          {presentation.isSprint ? 'Short, outcome-driven sprint with fast momentum.' : 'Self-paced learning. Start anytime.'}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

          </div>
        </div>
      </div>

      <EnrollmentDialog 
        program={program} 
        open={enrollDialogOpen} 
        onOpenChange={setEnrollDialogOpen} 
      />
    </>
  );
}

export default ProgramDetailsPage;
