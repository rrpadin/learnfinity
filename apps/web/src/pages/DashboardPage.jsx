import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { formatDistanceToNow } from 'date-fns';
import { getDashboardData, getPrograms, getProgress } from '@learnfinity/core';
import { useAuth } from '@/contexts/AuthContext.jsx';
import pb from '@/lib/pocketbaseClient';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Bell,
  BookOpen,
  BrainCircuit,
  ChevronRight,
  Compass,
  Flame,
  Home,
  Play,
  Plus,
  Search,
  Sparkles,
  Target,
  UserCircle2,
  Users,
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

  const loadDashboardData = useCallback(async () => {
    if (!currentUser?.id) {
      return;
    }

    try {
      setLoading(true);

      const [dashboardData, programsData, progressData] = await Promise.all([
        getDashboardData(pb, currentUser.id),
        getPrograms(pb),
        getProgress(pb, currentUser.id),
      ]);

      setCurrentProgram(dashboardData.currentProgram);
      setNextMission(dashboardData.nextMission);
      setUserMissionStatus(dashboardData.missionStatus);
      setPrograms(programsData);
      setProgress(progressData);
    } catch (error) {
      console.error('Error loading dashboard:', error);
      toast.error('Failed to load your home screen');
    } finally {
      setLoading(false);
    }
  }, [currentUser?.id]);

  useEffect(() => {
    loadDashboardData();
  }, [loadDashboardData]);

  const greeting = useMemo(() => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  }, []);

  const firstName = currentUser?.name?.split(' ')[0] || 'Reggie';
  const streak = currentUser?.streak_count || 0;
  const learnedThisWeek = progress ? Math.max(12, progress.completedCount * 5) : 12;
  const goalProgress = currentProgram
    ? Math.min(100, Math.round(((currentUser?.current_day || 1) / (currentProgram.duration_days || 7)) * 100))
    : 24;

  const contextStrip = currentProgram
    ? `Day ${currentUser?.current_day || 1} of ${currentProgram.title}`
    : 'You have 7 minutes for a quick win';

  const quickWins = useMemo(() => {
    const sourcePrograms = programs.slice(0, 5);
    if (sourcePrograms.length === 0) {
      return [
        { id: 'quick-1', duration: '3 min', title: 'Reset before your next decision' },
        { id: 'quick-2', duration: '5 min', title: 'Run a calmer meeting today' },
        { id: 'quick-3', duration: '4 min', title: 'Stop procrastinating this hour' },
      ];
    }

    return sourcePrograms.map((program, index) => ({
      id: program.id,
      duration: `${Math.min(7, Math.max(3, (program.duration_days || 5) % 8 || 5))} min`,
      title:
        [
          `Decide faster under pressure`,
          `Run a better meeting today`,
          `Get unstuck in the next 5 minutes`,
          `Refocus before your next task switch`,
          `Communicate clearly when it matters`,
        ][index] || program.title,
      programId: program.id,
    }));
  }, [programs]);

  const journeyCards = useMemo(() => {
    if (currentProgram) {
      return [
        {
          id: currentProgram.id,
          title: currentProgram.title,
          progress: goalProgress,
          subtitle: `${currentUser?.current_day || 1}/${currentProgram.duration_days || 7} days completed`,
          cta: 'Resume',
          onClick: () => navigate('/mission'),
        },
      ];
    }

    return quickWins.slice(0, 2).map((item, index) => ({
      id: item.id,
      title: item.title,
      progress: 22 + index * 16,
      subtitle: `${item.duration} reset path`,
      cta: 'Resume',
      onClick: () => navigate('/programs'),
    }));
  }, [currentProgram, currentUser?.current_day, goalProgress, navigate, quickWins]);

  const learningPaths = useMemo(() => {
    const defaults = [
      { id: 'path-1', outcome: 'Become AI Fluent', duration: '7 days' },
      { id: 'path-2', outcome: 'Improve Focus in 7 Days', duration: '7 days' },
      { id: 'path-3', outcome: 'Launch Your Consulting Practice', duration: '14 days' },
    ];

    if (programs.length === 0) {
      return defaults;
    }

    return programs.slice(0, 3).map((program, index) => ({
      id: program.id,
      outcome: defaults[index]?.outcome || program.title,
      duration: `${program.duration_days || 7} days`,
      programId: program.id,
    }));
  }, [programs]);

  const momentumFeed = useMemo(
    () => [
      `${Math.max(3, (progress?.completedCount || 0) + 3)} people completed a quick win today`,
      `${firstName}, your streak is stronger than 82% of this week’s learners`,
      `Maria just shared a win from Focus Reset`,
    ],
    [firstName, progress?.completedCount]
  );

  const primaryCard = {
    eyebrow: 'Fix This Now',
    title: nextMission
      ? `Feeling overwhelmed? Reset with ${nextMission.title.toLowerCase()}`
      : 'Feeling overloaded? Reset in 3 minutes',
    subtitle: nextMission
      ? `${Math.min(7, Math.max(3, nextMission.day_number + 2))} minute guided action based on what you’ve been working on`
      : 'Short, AI-curated guidance designed to help you make a better next decision',
    cta: 'Start',
    onClick: () => navigate(nextMission ? '/mission' : '/programs'),
  };

  const navItems = [
    { id: 'home', label: 'Home', icon: Home, active: true, onClick: () => navigate('/') },
    { id: 'explore', label: 'Explore', icon: Compass, onClick: () => navigate('/programs') },
    { id: 'create', label: 'Create', icon: Plus, emphasize: true, onClick: () => navigate('/mission') },
    { id: 'community', label: 'Community', icon: Users, onClick: () => navigate('/community') },
    { id: 'profile', label: 'Profile', icon: UserCircle2, onClick: () => navigate('/settings') },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-[linear-gradient(180deg,#f7f9ff_0%,#edf3ff_55%,#e7efff_100%)] px-4 pb-28 pt-5">
        <div className="mx-auto flex max-w-md flex-col gap-4 sm:max-w-2xl lg:max-w-5xl xl:max-w-6xl">
          <Skeleton className="h-16 rounded-3xl" />
          <Skeleton className="h-52 rounded-[2rem]" />
          <Skeleton className="h-36 rounded-[2rem]" />
          <Skeleton className="h-32 rounded-[2rem]" />
          <Skeleton className="h-28 rounded-[2rem]" />
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Learnfinity Home</title>
        <meta
          name="description"
          content="An intent-first, mobile-first learner home built around AI-curated microlearning and personalized next actions."
        />
      </Helmet>

      <div className="min-h-screen bg-[linear-gradient(180deg,#f7f9ff_0%,#edf3ff_55%,#e7efff_100%)] pb-28">
        <div className="mx-auto flex max-w-md flex-col gap-5 px-4 pb-8 pt-5 sm:max-w-2xl lg:max-w-5xl xl:max-w-6xl">
          <section className="rounded-[2rem] border border-white/70 bg-white/70 p-4 shadow-[0_20px_50px_rgba(44,94,204,0.08)] backdrop-blur-xl">
            <div className="flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => navigate('/settings')}
                className="flex h-12 w-12 items-center justify-center rounded-full bg-[linear-gradient(135deg,#2c5ecc,#9ab6f5)] text-white shadow-lg transition-transform active:scale-95"
              >
                <span className="text-base font-bold">{firstName.charAt(0)}</span>
              </button>

              <div className="flex-1 text-center">
                <p className="text-sm font-medium text-muted-foreground">{greeting}</p>
                <h1 className="text-xl font-black tracking-[-0.03em] text-foreground">
                  {firstName}
                </h1>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => toast('Notifications are being personalized')}
                  className="flex h-11 w-11 items-center justify-center rounded-full bg-secondary text-foreground transition-transform active:scale-95"
                >
                  <Bell className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => toast('Search is coming soon')}
                  className="flex h-11 w-11 items-center justify-center rounded-full bg-secondary text-foreground transition-transform active:scale-95"
                >
                  <Search className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="mt-4 flex items-center gap-2 rounded-full bg-[linear-gradient(90deg,rgba(44,94,204,0.1),rgba(154,182,245,0.18))] px-3.5 py-2.5 text-sm font-semibold text-primary">
              <Sparkles className="h-4 w-4" />
              <span>{contextStrip}</span>
            </div>
          </section>

          <section className="relative overflow-hidden rounded-[2rem] bg-[linear-gradient(145deg,#17305e_0%,#2c5ecc_58%,#9ab6f5_100%)] p-5 text-white shadow-[0_28px_70px_rgba(44,94,204,0.26)]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.24),transparent_34%),radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.12),transparent_24%)]" />
            <div className="relative">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/14 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-white/82">
                <BrainCircuit className="h-3.5 w-3.5" />
                {primaryCard.eyebrow}
              </div>
              <h2 className="mt-4 text-3xl font-black leading-[1.02] tracking-[-0.04em] text-balance">
                {primaryCard.title}
              </h2>
              <p className="mt-3 max-w-xs text-sm leading-6 text-white/78">
                {primaryCard.subtitle}
              </p>
              <Button
                size="lg"
                onClick={primaryCard.onClick}
                className="mt-6 h-12 rounded-full bg-white px-6 text-slate-900 shadow-lg transition-transform active:scale-95"
              >
                <Play className="mr-1 h-4 w-4" />
                {primaryCard.cta}
              </Button>
            </div>
          </section>

          <section>
            <div className="mb-3 flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary/70">Quick Wins</p>
                <h3 className="mt-1 text-xl font-black tracking-[-0.03em] text-foreground">You can finish these fast</h3>
              </div>
            </div>

            <div className="-mx-4 overflow-x-auto px-4 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:mx-0 md:overflow-visible md:px-0">
              <div className="flex gap-3 md:grid md:grid-cols-2 xl:grid-cols-3">
                {quickWins.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => navigate(item.programId ? `/programs/${item.programId}` : '/programs')}
                    className="min-w-[240px] rounded-[1.75rem] border border-white/80 bg-white/78 p-4 text-left shadow-[0_16px_40px_rgba(44,94,204,0.08)] backdrop-blur-lg transition-transform active:scale-[0.98] md:min-w-0"
                  >
                    <div className="flex items-center justify-between">
                      <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                        {item.duration}
                      </span>
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white">
                        <Play className="ml-0.5 h-4 w-4" />
                      </div>
                    </div>
                    <p className="mt-5 text-lg font-bold leading-tight text-foreground">{item.title}</p>
                  </button>
                ))}
              </div>
            </div>
          </section>

          <section className="rounded-[2rem] border border-white/80 bg-white/72 p-4 shadow-[0_18px_45px_rgba(44,94,204,0.08)] backdrop-blur-lg">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary/70">Continue your journey</p>
                <h3 className="mt-1 text-xl font-black tracking-[-0.03em] text-foreground">Pick up where you left off</h3>
              </div>
            </div>

            <div className="mt-4 space-y-3">
              {journeyCards.map((item) => (
                <div
                  key={item.id}
                  className="rounded-[1.5rem] bg-[linear-gradient(180deg,rgba(255,255,255,0.95),rgba(234,241,255,0.95))] p-4"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h4 className="text-base font-bold text-foreground">{item.title}</h4>
                      <p className="mt-1 text-sm text-muted-foreground">{item.subtitle}</p>
                    </div>
                    <Button
                      size="sm"
                      onClick={item.onClick}
                      className="h-10 rounded-full px-4 transition-transform active:scale-95"
                    >
                      {item.cta}
                    </Button>
                  </div>
                  <div className="mt-4 h-2 overflow-hidden rounded-full bg-primary/10">
                    <div
                      className="h-full rounded-full bg-[linear-gradient(90deg,#2c5ecc,#9ab6f5)] transition-all duration-500"
                      style={{ width: `${item.progress}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <div className="mb-3">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary/70">Learning paths</p>
              <h3 className="mt-1 text-xl font-black tracking-[-0.03em] text-foreground">Goal-based paths</h3>
            </div>

            <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
              {learningPaths.map((path) => (
                <button
                  key={path.id}
                  type="button"
                  onClick={() => navigate(path.programId ? `/programs/${path.programId}` : '/programs')}
                  className="rounded-[1.75rem] border border-white/80 bg-white/75 p-4 text-left shadow-[0_16px_40px_rgba(44,94,204,0.08)] backdrop-blur-lg transition-transform active:scale-[0.98]"
                >
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-base font-bold text-foreground">{path.outcome}</p>
                      <p className="mt-1 text-sm text-muted-foreground">{path.duration}</p>
                    </div>
                    <ChevronRight className="h-5 w-5 text-primary" />
                  </div>
                </button>
              ))}
            </div>
          </section>

          <section className="rounded-[2rem] border border-white/80 bg-white/72 p-4 shadow-[0_18px_45px_rgba(44,94,204,0.08)] backdrop-blur-lg">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary/70">Momentum feed</p>
                <h3 className="mt-1 text-xl font-black tracking-[-0.03em] text-foreground">Light social proof</h3>
              </div>
            </div>

            <div className="mt-4 space-y-3">
              {momentumFeed.map((item) => (
                <div key={item} className="rounded-[1.35rem] bg-secondary/70 px-4 py-3 text-sm text-foreground/85">
                  {item}
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-[2rem] border border-white/80 bg-white/72 p-4 shadow-[0_18px_45px_rgba(44,94,204,0.08)] backdrop-blur-lg">
            <div className="mb-4">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary/70">Personal growth snapshot</p>
              <h3 className="mt-1 text-xl font-black tracking-[-0.03em] text-foreground">Small wins, visible momentum</h3>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div className="rounded-[1.4rem] bg-[linear-gradient(180deg,rgba(255,255,255,0.95),rgba(234,241,255,0.95))] p-3.5">
                <div className="flex items-center gap-2 text-primary">
                  <Flame className="h-4 w-4" />
                  <span className="text-xs font-semibold uppercase tracking-[0.16em]">Streak</span>
                </div>
                <p className="mt-3 text-2xl font-black text-foreground">{streak}</p>
              </div>

              <div className="rounded-[1.4rem] bg-[linear-gradient(180deg,rgba(255,255,255,0.95),rgba(234,241,255,0.95))] p-3.5">
                <div className="flex items-center gap-2 text-primary">
                  <BookOpen className="h-4 w-4" />
                  <span className="text-xs font-semibold uppercase tracking-[0.16em]">Week</span>
                </div>
                <p className="mt-3 text-2xl font-black text-foreground">{learnedThisWeek}m</p>
              </div>

              <div className="rounded-[1.4rem] bg-[linear-gradient(180deg,rgba(255,255,255,0.95),rgba(234,241,255,0.95))] p-3.5">
                <div className="flex items-center gap-2 text-primary">
                  <Target className="h-4 w-4" />
                  <span className="text-xs font-semibold uppercase tracking-[0.16em]">Goal</span>
                </div>
                <p className="mt-3 text-2xl font-black text-foreground">{goalProgress}%</p>
              </div>
            </div>
          </section>
        </div>

        <button
          type="button"
          onClick={() => toast('Jordy will open your AI coach thread soon')}
          className="fixed bottom-24 right-4 z-40 inline-flex items-center gap-2 rounded-full bg-[linear-gradient(135deg,#2c5ecc,#17305e)] px-5 py-3 text-sm font-semibold text-white shadow-[0_20px_40px_rgba(23,48,94,0.3)] transition-transform active:scale-95 sm:right-6"
        >
          <Sparkles className="h-4 w-4" />
          Ask Jordy
        </button>

        <nav className="fixed inset-x-0 bottom-0 z-50 border-t border-white/70 bg-white/88 px-3 pb-[calc(env(safe-area-inset-bottom,0px)+10px)] pt-3 shadow-[0_-10px_35px_rgba(44,94,204,0.1)] backdrop-blur-xl">
          <div className="mx-auto flex max-w-md items-end justify-between gap-2 sm:max-w-2xl lg:max-w-5xl xl:max-w-6xl">
            {navItems.map((item) => {
              const Icon = item.icon;

              if (item.emphasize) {
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={item.onClick}
                    className="flex h-14 w-14 -translate-y-4 items-center justify-center rounded-full bg-[linear-gradient(135deg,#2c5ecc,#17305e)] text-white shadow-[0_18px_30px_rgba(44,94,204,0.28)] transition-transform active:scale-95"
                  >
                    <Icon className="h-5 w-5" />
                  </button>
                );
              }

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={item.onClick}
                  className={`flex min-w-[58px] flex-col items-center gap-1 rounded-2xl px-2 py-1.5 transition-transform active:scale-95 ${
                    item.active ? 'text-primary' : 'text-muted-foreground'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span className="text-[11px] font-semibold">{item.label}</span>
                </button>
              );
            })}
          </div>
        </nav>
      </div>
    </>
  );
}

export default DashboardPage;
