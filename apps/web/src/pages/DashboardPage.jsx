import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { formatDistanceToNow } from 'date-fns';
import { getDashboardData, getPrograms, getProgress } from '@learnfinity/core';
import { useAuth } from '@/contexts/AuthContext.jsx';
import pb from '@/lib/pocketbaseClient';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import ProgramCard from '@/components/ProgramCard.jsx';
import MissionCard from '@/components/MissionCard.jsx';
import {
  BookOpen,
  Compass,
  Flame,
  PlayCircle,
  Sparkles,
  Star,
  TrendingUp,
} from 'lucide-react';
import { toast } from 'sonner';

function DashboardPage() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [currentProgram, setCurrentProgram] = useState(null);
  const [nextMission, setNextMission] = useState(null);
  const [userMissionStatus, setUserMissionStatus] = useState('pending');
  const [programs, setPrograms] = useState([]);
  const [progress, setProgress] = useState(null);

  useEffect(() => {
    loadDashboardData();
  }, [currentUser]);

  const loadDashboardData = useCallback(async () => {
    try {
      setLoading(true);

      const [dashboardData, libraryData, progressData] = await Promise.all([
        getDashboardData(pb, currentUser.id),
        getPrograms(pb),
        getProgress(pb, currentUser.id),
      ]);

      setCurrentProgram(dashboardData.currentProgram);
      setNextMission(dashboardData.nextMission);
      setUserMissionStatus(dashboardData.missionStatus);
      setPrograms(libraryData);
      setProgress(progressData);
    } catch (error) {
      console.error('Error loading dashboard:', error);
      toast.error('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  }, [currentUser?.id]);

  const featuredPrograms = programs.slice(0, 6);
  const recommendedPrograms = programs
    .filter((program) => program.id !== currentProgram?.id)
    .slice(0, 4);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <Skeleton className="mb-8 h-[420px] w-full rounded-[2rem]" />
          <div className="mb-10 grid gap-4 md:grid-cols-3">
            <Skeleton className="h-28 rounded-3xl" />
            <Skeleton className="h-28 rounded-3xl" />
            <Skeleton className="h-28 rounded-3xl" />
          </div>
          <Skeleton className="mb-4 h-8 w-56" />
          <div className="grid gap-6 lg:grid-cols-3">
            <Skeleton className="h-80 rounded-[2rem] lg:col-span-2" />
            <Skeleton className="h-80 rounded-[2rem]" />
          </div>
        </div>
      </div>
    );
  }

  const firstName = currentUser?.name?.split(' ')[0] || 'Learner';
  const streak = currentUser?.streak_count || 0;
  const currentDay = currentUser?.current_day || 1;
  const completionLabel = progress
    ? `${progress.completedCount} missions completed`
    : 'Your progress is loading';

  return (
    <>
      <Helmet>
        <title>Dashboard - Learnfinity</title>
        <meta
          name="description"
          content="A cinematic learner home for daily AI missions, streaks, and recommended programs."
        />
      </Helmet>

      <div className="min-h-screen bg-[radial-gradient(circle_at_top,#ffffff_0%,#eef4ff_42%,#e4edff_100%)]">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <section className="relative overflow-hidden rounded-[2rem] border border-white/60 bg-[linear-gradient(135deg,rgba(18,39,80,0.96),rgba(44,94,204,0.9),rgba(154,182,245,0.7))] p-8 text-white shadow-[0_30px_80px_rgba(36,79,176,0.24)] md:p-10">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.24),transparent_36%),radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.14),transparent_28%)]" />
            <div className="absolute right-0 top-0 h-72 w-72 translate-x-10 -translate-y-16 rounded-full bg-white/10 blur-3xl" />
            <div className="relative grid gap-8 lg:grid-cols-[1.5fr_0.9fr] lg:items-end">
              <div className="max-w-3xl">
                <div className="mb-4 flex flex-wrap items-center gap-3">
                  <span className="rounded-full border border-white/20 bg-white/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.28em] text-white/80">
                    Learnfinity Home
                  </span>
                  <span className="rounded-full bg-white/15 px-4 py-1 text-sm font-medium text-white/85">
                    {completionLabel}
                  </span>
                </div>

                <h1 className="max-w-2xl text-4xl font-black tracking-[-0.04em] text-balance md:text-6xl">
                  Welcome back, {firstName}. Your next breakthrough is queued up.
                </h1>

                <p className="mt-5 max-w-2xl text-base leading-7 text-white/80 md:text-lg">
                  A feed-first learning home with cinematic momentum, smart recommendations,
                  and just enough urgency to keep your streak alive.
                </p>

                <div className="mt-8 flex flex-wrap gap-3">
                  <Button
                    size="lg"
                    onClick={() => navigate(nextMission ? '/mission' : '/programs')}
                    className="gap-2 rounded-full bg-white px-6 text-slate-900 shadow-lg hover:bg-white/90"
                  >
                    <PlayCircle className="h-4 w-4" />
                    {nextMission ? 'Resume today’s mission' : 'Start exploring'}
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    onClick={() => navigate('/programs')}
                    className="rounded-full border-white/25 bg-white/10 px-6 text-white hover:bg-white/15 hover:text-white"
                  >
                    Browse your catalog
                  </Button>
                </div>
              </div>

              <div className="grid gap-4">
                <div className="rounded-[1.75rem] border border-white/15 bg-black/20 p-5 backdrop-blur-md">
                  <p className="mb-2 text-xs font-semibold uppercase tracking-[0.28em] text-white/60">
                    In focus
                  </p>
                  <h2 className="text-2xl font-bold text-balance">
                    {currentProgram?.title || 'Find your next high-signal AI track'}
                  </h2>
                  <p className="mt-3 text-sm leading-6 text-white/75">
                    {currentProgram?.description ||
                      'Curated learning paths, fast mission loops, and a feed that makes daily progress feel addictive.'}
                  </p>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div className="rounded-[1.5rem] border border-white/15 bg-white/10 p-4 backdrop-blur-md">
                    <p className="text-xs uppercase tracking-[0.22em] text-white/55">Streak</p>
                    <p className="mt-2 text-3xl font-black">{streak}</p>
                    <p className="mt-1 text-sm text-white/70">days running</p>
                  </div>
                  <div className="rounded-[1.5rem] border border-white/15 bg-white/10 p-4 backdrop-blur-md">
                    <p className="text-xs uppercase tracking-[0.22em] text-white/55">Day</p>
                    <p className="mt-2 text-3xl font-black">{currentDay}</p>
                    <p className="mt-1 text-sm text-white/70">in current arc</p>
                  </div>
                  <div className="rounded-[1.5rem] border border-white/15 bg-white/10 p-4 backdrop-blur-md">
                    <p className="text-xs uppercase tracking-[0.22em] text-white/55">Queue</p>
                    <p className="mt-2 text-3xl font-black">{featuredPrograms.length}</p>
                    <p className="mt-1 text-sm text-white/70">programs live</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="mt-8 grid gap-4 md:grid-cols-3">
            <div className="rounded-[1.75rem] border border-primary/10 bg-white/80 p-5 shadow-[0_15px_40px_rgba(36,79,176,0.08)] backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <div className="rounded-2xl bg-primary/10 p-3 text-primary">
                  <Flame className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">Momentum</p>
                  <p className="text-sm text-muted-foreground">Keep your daily run alive</p>
                </div>
              </div>
            </div>
            <div className="rounded-[1.75rem] border border-primary/10 bg-white/80 p-5 shadow-[0_15px_40px_rgba(36,79,176,0.08)] backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <div className="rounded-2xl bg-primary/10 p-3 text-primary">
                  <TrendingUp className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    {progress?.activeCount || 0} active missions
                  </p>
                  <p className="text-sm text-muted-foreground">Your learning feed is in motion</p>
                </div>
              </div>
            </div>
            <div className="rounded-[1.75rem] border border-primary/10 bg-white/80 p-5 shadow-[0_15px_40px_rgba(36,79,176,0.08)] backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <div className="rounded-2xl bg-primary/10 p-3 text-primary">
                  <Star className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    {recommendedPrograms.length} fresh recommendations
                  </p>
                  <p className="text-sm text-muted-foreground">New tracks matched to your pace</p>
                </div>
              </div>
            </div>
          </section>

          <section className="mt-12 grid gap-6 xl:grid-cols-[1.45fr_0.95fr]">
            <div className="rounded-[2rem] border border-primary/10 bg-white/80 p-6 shadow-[0_20px_60px_rgba(36,79,176,0.08)] backdrop-blur-sm">
              <div className="mb-6 flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary/70">
                    Continue Watching
                  </p>
                  <h2 className="mt-2 text-3xl font-black tracking-[-0.03em] text-foreground">
                    Your main stage
                  </h2>
                </div>
                <Button variant="ghost" onClick={() => navigate('/progress')}>
                  View progress
                </Button>
              </div>

              {nextMission ? (
                <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
                  <div className="rounded-[1.75rem] bg-[linear-gradient(140deg,rgba(255,255,255,0.9),rgba(232,241,255,0.95))] p-1">
                    <MissionCard
                      mission={nextMission}
                      status={userMissionStatus}
                      onClick={() => navigate('/mission')}
                    />
                  </div>
                  <div className="rounded-[1.75rem] border border-primary/10 bg-background/70 p-5">
                    <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary/70">
                      Quick take
                    </p>
                    <h3 className="mt-3 text-2xl font-bold text-balance text-foreground">
                      {currentProgram?.title || 'New program pending'}
                    </h3>
                    <p className="mt-3 text-sm leading-6 text-muted-foreground">
                      {currentProgram?.description ||
                        'Select a program from the library and your home feed will immediately start to feel personal.'}
                    </p>
                    <div className="mt-6 flex flex-wrap gap-2">
                      <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                        {userMissionStatus.replace('_', ' ')}
                      </span>
                      <span className="rounded-full bg-accent/40 px-3 py-1 text-xs font-semibold text-foreground">
                        Day {nextMission.day_number}
                      </span>
                      <span className="rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-secondary-foreground">
                        Learner feed
                      </span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="rounded-[2rem] border border-dashed border-primary/20 bg-[linear-gradient(180deg,rgba(255,255,255,0.7),rgba(232,241,255,0.9))] px-8 py-14 text-center">
                  <Compass className="mx-auto h-14 w-14 text-primary/70" />
                  <h3 className="mt-5 text-2xl font-bold text-foreground">
                    No active program yet
                  </h3>
                  <p className="mx-auto mt-3 max-w-lg text-muted-foreground">
                    Build a home feed worth returning to. Pick a program and Learnfinity will start queuing missions,
                    momentum, and recommendations around it.
                  </p>
                  <Button size="lg" onClick={() => navigate('/programs')} className="mt-8 rounded-full px-6">
                    Browse Program Library
                  </Button>
                </div>
              )}
            </div>

            <div className="rounded-[2rem] border border-primary/10 bg-[#0f1b3d] p-6 text-white shadow-[0_20px_60px_rgba(15,27,61,0.28)]">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-white/55">
                Activity Feed
              </p>
              <h2 className="mt-2 text-3xl font-black tracking-[-0.03em]">
                Your momentum
              </h2>
              <div className="mt-6 space-y-4">
                {(progress?.recent || []).length > 0 ? (
                  progress.recent.slice(0, 5).map((item, index) => (
                    <div
                      key={item.id}
                      className="rounded-[1.5rem] border border-white/10 bg-white/5 p-4 backdrop-blur-sm"
                    >
                      <div className="flex items-center justify-between gap-4">
                        <p className="text-sm font-semibold text-white/90">Mission #{index + 1}</p>
                        <span className="rounded-full bg-white/10 px-2.5 py-1 text-xs font-semibold uppercase text-white/70">
                          {item.status.replace('_', ' ')}
                        </span>
                      </div>
                      <p className="mt-2 text-sm text-white/65">
                        Updated {formatDistanceToNow(new Date(item.updated), { addSuffix: true })}
                      </p>
                    </div>
                  ))
                ) : (
                  <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5 text-white/75">
                    Your recent completions and in-progress missions will start appearing here as your feed wakes up.
                  </div>
                )}
              </div>
            </div>
          </section>

          <section className="mt-12">
            <div className="mb-5 flex items-end justify-between gap-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary/70">
                  Trending now
                </p>
                <h2 className="mt-2 text-3xl font-black tracking-[-0.03em] text-foreground">
                  Learning worth bingeing
                </h2>
              </div>
              <Button variant="ghost" onClick={() => navigate('/programs')}>
                See all programs
              </Button>
            </div>

            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {featuredPrograms.map((program) => (
                <ProgramCard
                  key={program.id}
                  program={program}
                  onAction={(selectedProgram) => navigate(`/programs/${selectedProgram.id}`)}
                />
              ))}
            </div>
          </section>

          <section className="mt-12 rounded-[2rem] border border-primary/10 bg-white/75 p-6 shadow-[0_20px_60px_rgba(36,79,176,0.08)] backdrop-blur-sm">
            <div className="mb-5 flex items-center gap-3">
              <div className="rounded-2xl bg-primary/10 p-3 text-primary">
                <BookOpen className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary/70">
                  For you
                </p>
                <h2 className="text-2xl font-black tracking-[-0.03em] text-foreground">
                  Your next row of picks
                </h2>
              </div>
            </div>

            <div className="grid gap-4 lg:grid-cols-4">
              {recommendedPrograms.length > 0 ? (
                recommendedPrograms.map((program) => (
                  <button
                    key={program.id}
                    type="button"
                    onClick={() => navigate(`/programs/${program.id}`)}
                    className="group rounded-[1.5rem] border border-primary/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.92),rgba(232,241,255,0.92))] p-5 text-left transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                        {program.category || 'General'}
                      </span>
                      <Sparkles className="h-4 w-4 text-primary/70 transition-transform duration-300 group-hover:rotate-12" />
                    </div>
                    <h3 className="mt-5 text-xl font-bold leading-tight text-foreground">
                      {program.title}
                    </h3>
                    <p className="mt-3 line-clamp-3 text-sm leading-6 text-muted-foreground">
                      {program.description || 'Short, focused learning content ready to slot into your routine.'}
                    </p>
                  </button>
                ))
              ) : (
                <div className="rounded-[1.5rem] border border-dashed border-primary/20 bg-secondary/50 p-6 text-muted-foreground lg:col-span-4">
                  Recommendations will show up here as soon as more programs land in your library.
                </div>
              )}
            </div>
          </section>
        </div>
      </div>
    </>
  );
}

export default DashboardPage;
