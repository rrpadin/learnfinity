import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { getPrograms } from '@learnfinity/core';
import { useAuth } from '@/contexts/AuthContext.jsx';
import pb from '@/lib/pocketbaseClient';
import { getProgramPresentation } from '@/lib/programPresentation';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import {
  ArrowLeft,
  BookOpen,
  Briefcase,
  ChevronRight,
  Compass,
  Filter,
  Home,
  Play,
  Plus,
  Search,
  Sparkles,
  Target,
  UserCircle2,
  Users,
  X,
  Zap,
} from 'lucide-react';
import { toast } from 'sonner';

const FILTER_CHIPS = [
  '5 min wins',
  'This week',
  'Career',
  'Focus',
  'AI Skills',
  'Mindset',
  'Leadership',
];

const FILTER_PANEL = {
  duration: ['Under 5 min', 'Under 30 min', 'Multi-day'],
  goal: ['Productivity', 'Career', 'AI Skills', 'Mindset'],
  level: ['Beginner', 'Intermediate', 'Advanced'],
  status: ['Not started', 'In progress', 'Completed'],
};

function ProgramLibraryPage() {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(true);
  const [programs, setPrograms] = useState([]);
  const [query, setQuery] = useState('');
  const [activeChip, setActiveChip] = useState('This week');
  const [filterPanelOpen, setFilterPanelOpen] = useState(false);
  const [filters, setFilters] = useState({
    duration: '',
    goal: '',
    level: '',
    status: '',
  });

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        const records = await getPrograms(pb);
        setPrograms(records);
      } catch (error) {
        console.error('Error fetching programs:', error);
        toast.error('Failed to load programs');
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  const firstName = currentUser?.name?.split(' ')[0] || 'Reggie';

  const enrichedPrograms = useMemo(() => {
    const outcomeFallbacks = [
      'Improve Focus in 5 Days',
      'Become AI Fluent',
      'Lead Better Conversations',
      'Launch Stronger Work Habits',
      'Build Faster Decision Loops',
      'Communicate with Clarity',
    ];

    const benefitFallbacks = [
      'Get to the right next action without overthinking.',
      'Use AI more confidently in real work situations.',
      'Turn scattered effort into focused progress.',
      'Build a repeatable routine that actually sticks.',
      'Make sharper calls under pressure.',
      'Translate ideas into action quickly.',
    ];

    return programs.map((program, index) => {
      const totalMinutes = Math.max(15, (program.duration_days || 5) * 5);
      const started = index % 4 === 0;
      const completed = index % 7 === 0;
      const status = completed ? 'Completed' : started ? 'In progress' : 'Not started';

      return {
        ...program,
        outcomeTitle: outcomeFallbacks[index % outcomeFallbacks.length] || program.title,
        benefit: benefitFallbacks[index % benefitFallbacks.length],
        durationLabel: `${program.duration_days || 5} days • ${totalMinutes} min total`,
        quickMinutes: Math.min(7, Math.max(3, (program.duration_days || 5) % 8 || 5)),
        goal:
          ['Productivity', 'Career', 'AI Skills', 'Mindset', 'Leadership'][index % 5],
        level:
          ['Beginner', 'Intermediate', 'Advanced'][index % 3],
        status,
        isRecommended: started || index < 3,
        tag: completed ? 'Popular' : started ? 'Recommended' : index % 3 === 0 ? 'New' : '',
        cta: completed ? 'Continue' : started ? 'Resume' : 'Start',
        icon:
          [Zap, Briefcase, Sparkles, Target, BookOpen][index % 5],
        program_format: program.program_format || (index % 5 === 0 ? 'sprint' : 'standard'),
        ai_mode: program.ai_mode || (index % 6 === 0 ? 'jordy_generated' : index % 4 === 0 ? 'jordy_guided' : 'static'),
        visual_theme: program.visual_theme || ['ocean', 'sunrise', 'forest', 'midnight', 'citrus'][index % 5],
        visual_icon: program.visual_icon || ['spark', 'target', 'brain', 'bolt', 'mountain'][index % 5],
      };
    });
  }, [programs]);

  const personalizedPrograms = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return enrichedPrograms.filter((program) => {
      const haystack = [
        program.outcomeTitle,
        program.goal,
        program.title,
        program.benefit,
        program.category,
        program.description,
      ]
        .filter(Boolean)
        .join(' ')
        .toLowerCase();

      const queryMatch = !normalizedQuery || haystack.includes(normalizedQuery);

      const chipMatch =
        !activeChip ||
        activeChip === 'This week' ||
        (activeChip === '5 min wins' && program.quickMinutes <= 5) ||
        haystack.includes(activeChip.toLowerCase().replace(' skills', '')) ||
        program.goal.toLowerCase().includes(activeChip.toLowerCase().replace(' skills', ''));

      const durationMatch =
        !filters.duration ||
        (filters.duration === 'Under 5 min' && program.quickMinutes <= 5) ||
        (filters.duration === 'Under 30 min' && parseInt(program.durationLabel, 10) <= 30) ||
        (filters.duration === 'Multi-day' && (program.duration_days || 0) > 1);

      const goalMatch = !filters.goal || program.goal === filters.goal;
      const levelMatch = !filters.level || program.level === filters.level;
      const statusMatch = !filters.status || program.status === filters.status;

      return queryMatch && chipMatch && durationMatch && goalMatch && levelMatch && statusMatch;
    });
  }, [activeChip, enrichedPrograms, filters, query]);

  const recommendedPrograms = personalizedPrograms
    .filter((program) => program.isRecommended)
    .slice(0, 3);

  const groupedPrograms = useMemo(
    () => ({
      improveNow: personalizedPrograms.filter((program) => program.quickMinutes <= 5).slice(0, 6),
      buildSkill: personalizedPrograms.filter((program) => program.goal === 'AI Skills').slice(0, 6),
      transformRoutine: personalizedPrograms.filter((program) => program.goal === 'Mindset' || program.goal === 'Productivity').slice(0, 6),
      advanceCareer: personalizedPrograms.filter((program) => program.goal === 'Career' || program.goal === 'Leadership').slice(0, 6),
    }),
    [personalizedPrograms]
  );

  const emptySuggestions = enrichedPrograms.slice(0, 3);

  const navItems = [
    { id: 'home', label: 'Home', icon: Home, onClick: () => navigate('/') },
    { id: 'explore', label: 'Explore', icon: Compass, active: true, onClick: () => navigate('/programs') },
    { id: 'create', label: 'Create', icon: Plus, emphasize: true, onClick: () => navigate('/mission') },
    { id: 'community', label: 'Community', icon: Users, onClick: () => navigate('/community') },
    { id: 'profile', label: 'Profile', icon: UserCircle2, onClick: () => navigate('/settings') },
  ];

  const ProgramCard = ({ program, featured = false }) => {
    const presentation = getProgramPresentation(program);
    const Icon = presentation.Icon;

    return (
      <button
        type="button"
        onClick={() => navigate(`/programs/${program.id}`)}
        className={`text-left transition-transform active:scale-[0.98] ${
          featured ? 'w-full' : 'min-w-[252px]'
        }`}
      >
        <div className={`rounded-[1.9rem] border border-white/80 bg-white/75 p-4 shadow-[0_16px_40px_rgba(44,94,204,0.08)] backdrop-blur-lg ${featured ? 'min-h-[218px]' : 'min-h-[196px]'}`}>
          <div className="flex items-start justify-between gap-3">
            <div className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${presentation.gradient} text-white`}>
              <Icon className="h-5 w-5" />
            </div>
            <div className="flex flex-wrap justify-end gap-2">
              <span className="rounded-full bg-primary/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.15em] text-primary">
                {presentation.formatLabel}
              </span>
              {presentation.aiLabel ? (
                <span className="rounded-full bg-secondary px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.15em] text-secondary-foreground">
                  {presentation.aiLabel}
                </span>
              ) : null}
              {program.tag ? (
                <span className="rounded-full bg-primary/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.15em] text-primary">
                  {program.tag}
                </span>
              ) : null}
            </div>
          </div>

          <h3 className="mt-5 text-xl font-black leading-tight tracking-[-0.03em] text-foreground">
            {program.outcomeTitle}
          </h3>
          <p className="mt-2 text-sm text-muted-foreground">
            {presentation.isSprint ? `${program.duration_days || 5} day sprint • ${program.quickMinutes} min bursts` : program.durationLabel}
          </p>
          <p className="mt-3 line-clamp-2 text-sm leading-6 text-foreground/80">{program.benefit}</p>

          {program.status === 'In progress' ? (
            <div className="mt-4 h-2 overflow-hidden rounded-full bg-primary/10">
              <div className="h-full w-[58%] rounded-full bg-[linear-gradient(90deg,#2c5ecc,#9ab6f5)]" />
            </div>
          ) : null}

          <div className="mt-5 flex items-center justify-between gap-3">
            <span className="text-xs font-semibold uppercase tracking-[0.16em] text-primary/70">
              {program.status}
            </span>
            <Button
              size="sm"
              className="h-10 rounded-full px-4"
            >
              {program.cta}
            </Button>
          </div>
        </div>
      </button>
    );
  };

  const ProgramRail = ({ title, subtitle, items }) => {
    if (items.length === 0) {
      return null;
    }

    return (
      <section>
        <div className="mb-3">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary/70">{subtitle}</p>
          <h3 className="mt-1 text-xl font-black tracking-[-0.03em] text-foreground">{title}</h3>
        </div>

        <div className="-mx-4 overflow-x-auto px-4 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <div className="flex gap-3">
            {items.map((program) => (
              <ProgramCard key={program.id} program={program} />
            ))}
          </div>
        </div>
      </section>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[linear-gradient(180deg,#f7f9ff_0%,#edf3ff_55%,#e7efff_100%)] px-4 pb-28 pt-5">
        <div className="mx-auto flex max-w-md flex-col gap-4">
          <Skeleton className="h-14 rounded-3xl" />
          <Skeleton className="h-14 rounded-3xl" />
          <Skeleton className="h-48 rounded-[2rem]" />
          <Skeleton className="h-12 rounded-full" />
          <Skeleton className="h-40 rounded-[2rem]" />
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Explore Programs - Learnfinity</title>
        <meta
          name="description"
          content="A smart program discovery layer that helps learners quickly find the right next program by intent, goals, time, and current state."
        />
      </Helmet>

      <div className="min-h-screen bg-[linear-gradient(180deg,#f7f9ff_0%,#edf3ff_55%,#e7efff_100%)] pb-28">
        <div className="mx-auto flex max-w-md flex-col gap-5 px-4 pb-8 pt-5 sm:max-w-lg">
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
                Explore Programs
              </h1>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => toast('Search is already active below')}
                  className="flex h-11 w-11 items-center justify-center rounded-full bg-secondary text-foreground transition-transform active:scale-95"
                >
                  <Search className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setFilterPanelOpen(true)}
                  className="flex h-11 w-11 items-center justify-center rounded-full bg-secondary text-foreground transition-transform active:scale-95"
                >
                  <Filter className="h-4 w-4" />
                </button>
              </div>
            </div>
          </section>

          <section className="rounded-[2rem] border border-white/70 bg-white/78 p-3 shadow-[0_18px_45px_rgba(44,94,204,0.08)] backdrop-blur-xl">
            <label className="flex items-center gap-3 rounded-[1.5rem] bg-secondary/70 px-4 py-3">
              <Search className="h-4 w-4 text-primary" />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="What do you want to improve today?"
                className="w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
              />
            </label>
          </section>

          <section>
            <div className="mb-3">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary/70">AI Recommended</p>
              <h2 className="mt-1 text-xl font-black tracking-[-0.03em] text-foreground">Recommended for You</h2>
            </div>

            <div className="space-y-3">
              {recommendedPrograms.length > 0 ? (
                recommendedPrograms.map((program) => (
                  <ProgramCard key={program.id} program={program} featured />
                ))
              ) : null}
            </div>
          </section>

          <section className="sticky top-0 z-30 -mx-4 bg-[linear-gradient(180deg,rgba(247,249,255,0.96),rgba(247,249,255,0.88))] px-4 py-1 backdrop-blur-xl">
            <div className="-mx-0 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              <div className="flex gap-2 pb-1">
                {FILTER_CHIPS.map((chip) => (
                  <button
                    key={chip}
                    type="button"
                    onClick={() => setActiveChip(chip)}
                    className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold transition-transform active:scale-95 ${
                      activeChip === chip
                        ? 'bg-primary text-primary-foreground shadow-md'
                        : 'bg-white/75 text-foreground shadow-sm'
                    }`}
                  >
                    {chip}
                  </button>
                ))}
              </div>
            </div>
          </section>

          {personalizedPrograms.length > 0 ? (
            <>
              <ProgramRail
                title="Improve Right Now"
                subtitle="Fast results"
                items={groupedPrograms.improveNow}
              />
              <ProgramRail
                title="Build a Skill"
                subtitle="Structured learning paths"
                items={groupedPrograms.buildSkill}
              />
              <ProgramRail
                title="Transform Your Routine"
                subtitle="Habit-based programs"
                items={groupedPrograms.transformRoutine}
              />
              <ProgramRail
                title="Advance Your Career"
                subtitle="Professional growth"
                items={groupedPrograms.advanceCareer}
              />
            </>
          ) : (
            <section className="rounded-[2rem] border border-white/80 bg-white/75 p-5 shadow-[0_18px_45px_rgba(44,94,204,0.08)] backdrop-blur-lg">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary/70">No exact match</p>
              <h3 className="mt-2 text-2xl font-black tracking-[-0.03em] text-foreground">
                We couldn’t find a match, try this instead
              </h3>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                Shift the filters or jump into one of these strong next-fit options.
              </p>

              <div className="mt-4 space-y-3">
                {emptySuggestions.map((program) => (
                  <ProgramCard key={program.id} program={program} featured />
                ))}
              </div>
            </section>
          )}
        </div>

        {filterPanelOpen ? (
          <div className="fixed inset-0 z-50 bg-slate-950/30 backdrop-blur-[2px]">
            <div className="absolute inset-x-0 bottom-0 rounded-t-[2rem] bg-white p-5 shadow-[0_-20px_60px_rgba(23,48,94,0.18)]">
              <div className="mx-auto mb-4 h-1.5 w-12 rounded-full bg-slate-200" />
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary/70">Sort & filter</p>
                  <h3 className="mt-1 text-2xl font-black tracking-[-0.03em] text-foreground">Find the right fit</h3>
                </div>
                <button
                  type="button"
                  onClick={() => setFilterPanelOpen(false)}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-foreground"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="space-y-5 pb-4">
                {Object.entries(FILTER_PANEL).map(([group, items]) => (
                  <div key={group}>
                    <p className="mb-2 text-sm font-bold capitalize text-foreground">{group}</p>
                    <div className="flex flex-wrap gap-2">
                      {items.map((item) => (
                        <button
                          key={item}
                          type="button"
                          onClick={() =>
                            setFilters((current) => ({
                              ...current,
                              [group]: current[group] === item ? '' : item,
                            }))
                          }
                          className={`rounded-full px-4 py-2 text-sm font-semibold ${
                            filters[group] === item
                              ? 'bg-primary text-primary-foreground'
                              : 'bg-secondary text-secondary-foreground'
                          }`}
                        >
                          {item}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 flex gap-3">
                <Button
                  variant="outline"
                  className="h-12 flex-1 rounded-full"
                  onClick={() => setFilters({ duration: '', goal: '', level: '', status: '' })}
                >
                  Reset
                </Button>
                <Button
                  className="h-12 flex-1 rounded-full"
                  onClick={() => setFilterPanelOpen(false)}
                >
                  Apply
                </Button>
              </div>
            </div>
          </div>
        ) : null}

        <nav className="fixed inset-x-0 bottom-0 z-50 border-t border-white/70 bg-white/88 px-3 pb-[calc(env(safe-area-inset-bottom,0px)+10px)] pt-3 shadow-[0_-10px_35px_rgba(44,94,204,0.1)] backdrop-blur-xl">
          <div className="mx-auto flex max-w-md items-end justify-between gap-2">
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

export default ProgramLibraryPage;
