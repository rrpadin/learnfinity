
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { getDashboardData } from '@learnfinity/core';
import { useAuth } from '@/contexts/AuthContext.jsx';
import pb from '@/lib/pocketbaseClient';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import ProgramProgressCard from '@/components/ProgramProgressCard.jsx';
import MissionCard from '@/components/MissionCard.jsx';
import { Compass } from 'lucide-react';
import { toast } from 'sonner';

function DashboardPage() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [currentProgram, setCurrentProgram] = useState(null);
  const [nextMission, setNextMission] = useState(null);
  const [userMissionStatus, setUserMissionStatus] = useState('pending');

  useEffect(() => {
    loadDashboardData();
  }, [currentUser]);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      const data = await getDashboardData(pb, currentUser.id);
      setCurrentProgram(data.currentProgram);
      setNextMission(data.nextMission);
      setUserMissionStatus(data.missionStatus);
    } catch (error) {
      console.error('Error loading dashboard:', error);
      toast.error('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <div className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Skeleton className="h-12 w-64 mb-8" />
          <Skeleton className="h-48 w-full mb-12 rounded-2xl" />
          <Skeleton className="h-64 w-full rounded-2xl" />
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Dashboard - Learnfinity</title>
        <meta name="description" content="Your AI learning dashboard - track progress and start today's mission." />
      </Helmet>

      <div className="min-h-screen bg-background flex flex-col">
        <div className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-2 tracking-tight">
                Welcome back, {currentUser?.name?.split(' ')[0] || 'Learner'}
              </h1>
              <p className="text-lg text-muted-foreground">
                Ready to continue your AI mastery journey?
              </p>
            </div>
            <Button variant="outline" onClick={() => navigate('/programs')} className="gap-2">
              <Compass className="w-4 h-4" />
              Explore Programs
            </Button>
          </div>

          {currentProgram ? (
            <div className="space-y-12">
              <section>
                <ProgramProgressCard 
                  program={currentProgram}
                  currentDay={currentUser?.current_day || 1}
                  streak={currentUser?.streak_count || 0}
                  onAction={() => navigate('/mission')}
                  actionLabel={userMissionStatus === 'completed' ? 'Review Mission' : "Continue Today's Mission"}
                />
              </section>

              {nextMission && (
                <section>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-semibold text-foreground">Up Next</h2>
                  </div>
                  <div className="max-w-3xl">
                    <MissionCard
                      mission={nextMission}
                      status={userMissionStatus}
                      onClick={() => navigate('/mission')}
                    />
                  </div>
                </section>
              )}
            </div>
          ) : (
            <div className="text-center py-24 bg-muted/30 rounded-3xl border border-dashed">
              <Compass className="w-16 h-16 text-muted-foreground mx-auto mb-6" />
              <h2 className="text-2xl font-bold text-foreground mb-3">No Active Program</h2>
              <p className="text-muted-foreground max-w-md mx-auto mb-8">
                You haven't enrolled in any learning programs yet. Explore our library to start your journey.
              </p>
              <Button size="lg" onClick={() => navigate('/programs')}>
                Browse Program Library
              </Button>
            </div>
          )}

        </div>
      </div>
    </>
  );
}

export default DashboardPage;
