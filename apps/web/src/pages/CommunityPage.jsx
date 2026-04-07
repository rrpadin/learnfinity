import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { useAuth } from '@/contexts/AuthContext.jsx';
import { Button } from '@/components/ui/button';
import {
  ArrowLeft,
  Bell,
  Bookmark,
  Flame,
  Home,
  MessageCircle,
  Plus,
  Search,
  Sparkles,
  Target,
  UserCircle2,
  Users,
} from 'lucide-react';
import { toast } from 'sonner';

function CommunityPage() {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [expandedPostId, setExpandedPostId] = useState(null);
  const [composerMode, setComposerMode] = useState('win');

  const firstName = currentUser?.name?.split(' ')[0] || 'Reggie';
  const streak = currentUser?.streak_count || 5;
  const currentDay = currentUser?.current_day || 2;

  const communityData = useMemo(
    () => ({
      activeLearnersToday: 128,
      currentProgram: 'Focus Reset',
      posts: [
        {
          id: 'post-1',
          type: 'completion',
          user: 'Maria S.',
          avatar: 'M',
          program: 'Focus Reset',
          timestamp: '12m ago',
          text: 'Completed: Improve Focus in 5 Days. The 3-minute reset before meetings actually worked today.',
          badge: 'Day 5 complete',
          sameGoal: true,
        },
        {
          id: 'post-2',
          type: 'insight',
          user: 'Andre P.',
          avatar: 'A',
          program: 'AI Fluent',
          timestamp: '28m ago',
          text: 'One thing I applied today: I asked AI for options, then used my own rubric to make the final decision.',
          badge: 'Applied today',
          sameGoal: false,
        },
        {
          id: 'post-3',
          type: 'question',
          user: 'Jasmine R.',
          avatar: 'J',
          program: 'Focus Reset',
          timestamp: '41m ago',
          text: 'How are you staying consistent when the day gets chaotic? I can start strong, but I lose the thread by afternoon.',
          badge: 'Needs help',
          sameGoal: true,
        },
        {
          id: 'post-4',
          type: 'completion',
          user: 'Leo K.',
          avatar: 'L',
          program: 'Decision Sprint',
          timestamp: '1h ago',
          text: 'Finished a quick win on making faster decisions. The short prompt helped me stop spiraling.',
          badge: 'Quick win',
          sameGoal: false,
        },
        {
          id: 'post-5',
          type: 'insight',
          user: 'Nina T.',
          avatar: 'N',
          program: 'Focus Reset',
          timestamp: '2h ago',
          text: 'I realized my “I’m too busy” moment is exactly when I need the shortest lesson, not when I should skip it.',
          badge: 'Insight',
          sameGoal: true,
        },
      ],
      circles: [
        { id: 'circle-1', name: 'Focus Builders', members: 18, activity: '7 active today' },
        { id: 'circle-2', name: 'AI Skill Sprinters', members: 26, activity: 'Fresh wins this morning' },
        { id: 'circle-3', name: 'Consistency Crew', members: 14, activity: '3 questions waiting' },
      ],
      trending: [
        'Most completed today: Improve Focus in 5 Days',
        'Trending program: AI Fluent',
        'Popular insight: “Short sessions beat perfect schedules”',
      ],
      leaderboard: [
        { id: 'lb-1', name: 'Sam', value: '14-day streak' },
        { id: 'lb-2', name: 'Priya', value: '12-day streak' },
        { id: 'lb-3', name: 'Jordan', value: '9-day streak' },
      ],
    }),
    []
  );

  const composerActions = [
    { id: 'win', label: 'I completed a lesson' },
    { id: 'insight', label: 'I learned something' },
    { id: 'help', label: 'I need help' },
  ];

  const navItems = [
    { id: 'home', label: 'Home', icon: Home, onClick: () => navigate('/') },
    { id: 'explore', label: 'Explore', icon: Search, onClick: () => navigate('/programs') },
    { id: 'create', label: 'Create', icon: Plus, emphasize: true, onClick: () => navigate('/mission') },
    { id: 'community', label: 'Community', icon: Users, active: true, onClick: () => navigate('/community') },
    { id: 'profile', label: 'Profile', icon: UserCircle2, onClick: () => navigate('/settings') },
  ];

  const toggleExpanded = (postId) => {
    setExpandedPostId((current) => (current === postId ? null : postId));
  };

  return (
    <>
      <Helmet>
        <title>Community - Learnfinity</title>
        <meta
          name="description"
          content="A low-noise, purpose-driven learning community built to reinforce progress, accountability, and helpful momentum."
        />
      </Helmet>

      <div className="min-h-screen bg-[linear-gradient(180deg,#f7f9ff_0%,#edf3ff_55%,#e7efff_100%)] pb-28">
        <div className="mx-auto flex max-w-md flex-col gap-5 px-4 pb-8 pt-5 sm:max-w-2xl lg:max-w-5xl xl:max-w-6xl">
          <section className="rounded-[2rem] border border-white/70 bg-white/70 p-4 shadow-[0_20px_50px_rgba(44,94,204,0.08)] backdrop-blur-xl">
            <div className="flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => navigate('/')}
                className="flex h-11 w-11 items-center justify-center rounded-full bg-secondary text-foreground transition-transform active:scale-95"
              >
                <ArrowLeft className="h-4 w-4" />
              </button>

              <h1 className="text-lg font-black tracking-[-0.03em] text-foreground">
                Community
              </h1>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => toast('Community notifications are coming soon')}
                  className="flex h-11 w-11 items-center justify-center rounded-full bg-secondary text-foreground transition-transform active:scale-95"
                >
                  <Bell className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => toast('Messaging is future-ready here')}
                  className="flex h-11 w-11 items-center justify-center rounded-full bg-secondary text-foreground transition-transform active:scale-95"
                >
                  <MessageCircle className="h-4 w-4" />
                </button>
              </div>
            </div>
          </section>

          <section className="rounded-[1.8rem] bg-[linear-gradient(145deg,#17305e_0%,#2c5ecc_65%,#9ab6f5_100%)] px-4 py-3 text-white shadow-[0_24px_60px_rgba(44,94,204,0.24)]">
            <p className="text-sm font-semibold leading-6 text-white/90">
              🔥 {streak}-day streak • 👥 {communityData.activeLearnersToday} learners active • 🎯 You’re on Day {currentDay} of {communityData.currentProgram}
            </p>
          </section>

          <section className="rounded-[2rem] border border-white/80 bg-white/75 p-4 shadow-[0_18px_45px_rgba(44,94,204,0.08)] backdrop-blur-lg">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary/70">
              Share moment
            </p>
            <div className="mt-3 rounded-[1.5rem] bg-secondary/70 px-4 py-4 text-sm text-muted-foreground">
              Share a win, insight, or question…
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {composerActions.map((action) => (
                <button
                  key={action.id}
                  type="button"
                  onClick={() => setComposerMode(action.id)}
                  className={`rounded-full px-4 py-2 text-sm font-semibold transition-transform active:scale-95 ${
                    composerMode === action.id
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-secondary text-secondary-foreground'
                  }`}
                >
                  {action.label}
                </button>
              ))}
            </div>
          </section>

          <section>
            <div className="mb-3">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary/70">
                Momentum feed
              </p>
              <h2 className="mt-1 text-xl font-black tracking-[-0.03em] text-foreground">
                Relevant progress only
              </h2>
            </div>

            <div className="space-y-3 lg:grid lg:grid-cols-2 lg:gap-4 lg:space-y-0">
              {communityData.posts.map((post) => {
                const expanded = expandedPostId === post.id;

                return (
                  <article
                    key={post.id}
                    className="rounded-[1.8rem] border border-white/80 bg-white/78 p-4 shadow-[0_16px_40px_rgba(44,94,204,0.08)] backdrop-blur-lg"
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[linear-gradient(135deg,#2c5ecc,#9ab6f5)] text-sm font-bold text-white">
                        {post.avatar}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-3">
                          <div>
                            <p className="text-sm font-bold text-foreground">{post.user}</p>
                            <p className="text-xs text-muted-foreground">
                              {post.program} • {post.timestamp}
                            </p>
                          </div>
                          <span className="rounded-full bg-primary/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.15em] text-primary">
                            {post.badge}
                          </span>
                        </div>

                        <button
                          type="button"
                          onClick={() => toggleExpanded(post.id)}
                          className="mt-3 block text-left"
                        >
                          <p className={`text-sm leading-6 text-foreground/85 ${expanded ? '' : 'line-clamp-2'}`}>
                            {post.text}
                          </p>
                        </button>

                        <div className="mt-4 flex flex-wrap items-center gap-2">
                          <button
                            type="button"
                            onClick={() => toast(`You encouraged ${post.user}`)}
                            className="rounded-full bg-secondary px-3 py-1.5 text-xs font-semibold text-secondary-foreground transition-transform active:scale-95"
                          >
                            👍 Like
                          </button>
                          <button
                            type="button"
                            onClick={() => toast('Comments stay lightweight here')}
                            className="rounded-full bg-secondary px-3 py-1.5 text-xs font-semibold text-secondary-foreground transition-transform active:scale-95"
                          >
                            💬 Comment
                          </button>
                          <button
                            type="button"
                            onClick={() => toast('Saved for later')}
                            className="rounded-full bg-secondary px-3 py-1.5 text-xs font-semibold text-secondary-foreground transition-transform active:scale-95"
                          >
                            <span className="inline-flex items-center gap-1">
                              <Bookmark className="h-3.5 w-3.5" />
                              Save
                            </span>
                          </button>
                          {post.sameGoal ? (
                            <button
                              type="button"
                              onClick={() => toast(`We’ll help ${firstName} connect with similar learners soon`)}
                              className="rounded-full bg-primary/10 px-3 py-1.5 text-xs font-semibold text-primary transition-transform active:scale-95"
                            >
                              Same goal
                            </button>
                          ) : null}
                        </div>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>

          <section>
            <div className="mb-3">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary/70">
                Your circles
              </p>
              <h2 className="mt-1 text-xl font-black tracking-[-0.03em] text-foreground">
                Smaller groups, shared goals
              </h2>
            </div>

            <div className="-mx-4 overflow-x-auto px-4 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:mx-0 md:overflow-visible md:px-0">
              <div className="flex gap-3 md:grid md:grid-cols-2 xl:grid-cols-3">
                {communityData.circles.map((circle) => (
                  <div
                    key={circle.id}
                    className="min-w-[230px] rounded-[1.8rem] border border-white/80 bg-white/78 p-4 shadow-[0_16px_40px_rgba(44,94,204,0.08)] backdrop-blur-lg md:min-w-0"
                  >
                    <p className="text-base font-bold text-foreground">{circle.name}</p>
                    <p className="mt-2 text-sm text-muted-foreground">
                      {circle.members} members
                    </p>
                    <p className="mt-1 text-sm text-primary">{circle.activity}</p>
                    <Button
                      size="sm"
                      className="mt-4 h-10 rounded-full px-4"
                      onClick={() => toast(`${circle.name} opens next`)}
                    >
                      Enter
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="rounded-[2rem] border border-white/80 bg-white/75 p-4 shadow-[0_18px_45px_rgba(44,94,204,0.08)] backdrop-blur-lg">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary/70">
              Trending learning moments
            </p>
            <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
              {communityData.trending.map((item) => (
                <div
                  key={item}
                  className="rounded-[1.4rem] bg-secondary/70 px-4 py-3 text-sm text-foreground/85"
                >
                  {item}
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-[2rem] border border-white/80 bg-white/75 p-4 shadow-[0_18px_45px_rgba(44,94,204,0.08)] backdrop-blur-lg">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary/70">
              Encouraging snapshot
            </p>
            <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
              {communityData.leaderboard.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between rounded-[1.4rem] bg-[linear-gradient(180deg,rgba(255,255,255,0.95),rgba(234,241,255,0.95))] px-4 py-3"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <Flame className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-foreground">{item.name}</p>
                      <p className="text-xs text-muted-foreground">Keeping momentum visible</p>
                    </div>
                  </div>
                  <span className="text-sm font-semibold text-primary">{item.value}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-[2rem] border border-white/80 bg-[linear-gradient(145deg,rgba(23,48,94,0.98),rgba(44,94,204,0.92))] p-4 text-white shadow-[0_20px_60px_rgba(23,48,94,0.24)]">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/60">
                  AI community assistant
                </p>
                <h2 className="mt-2 text-xl font-black tracking-[-0.03em]">
                  Ask Jordy about the community
                </h2>
                <p className="mt-3 text-sm leading-6 text-white/78">
                  Find people with the same goals, surface the most relevant discussions, or get pointed toward the right circle.
                </p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/12">
                <Sparkles className="h-5 w-5" />
              </div>
            </div>

            <Button
              size="lg"
              className="mt-5 h-11 rounded-full bg-white px-5 text-slate-900"
              onClick={() => toast('Jordy community assistant is next on deck')}
            >
              Ask Jordy
            </Button>
          </section>
        </div>

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

export default CommunityPage;
