import {
  BrainCircuit,
  Mountain,
  Sparkles,
  Target,
  Zap,
} from 'lucide-react';

const themeMap = {
  ocean: {
    gradient: 'from-[#17305e] via-[#2c5ecc] to-[#9ab6f5]',
    badge: 'bg-blue-500/10 text-blue-700 border-blue-500/20',
  },
  sunrise: {
    gradient: 'from-[#7c2d12] via-[#ea580c] to-[#fdba74]',
    badge: 'bg-orange-500/10 text-orange-700 border-orange-500/20',
  },
  forest: {
    gradient: 'from-[#14532d] via-[#15803d] to-[#86efac]',
    badge: 'bg-green-500/10 text-green-700 border-green-500/20',
  },
  midnight: {
    gradient: 'from-[#0f172a] via-[#312e81] to-[#818cf8]',
    badge: 'bg-indigo-500/10 text-indigo-700 border-indigo-500/20',
  },
  citrus: {
    gradient: 'from-[#854d0e] via-[#ca8a04] to-[#fde68a]',
    badge: 'bg-yellow-500/10 text-yellow-700 border-yellow-500/20',
  },
};

const iconMap = {
  spark: Sparkles,
  target: Target,
  brain: BrainCircuit,
  bolt: Zap,
  mountain: Mountain,
};

export function getProgramPresentation(program = {}) {
  const theme = themeMap[program.visual_theme] || themeMap.ocean;
  const Icon = iconMap[program.visual_icon] || Sparkles;
  const formatLabel =
    program.program_format === 'sprint'
      ? 'Sprint'
      : program.program_format === 'adaptive'
        ? 'Adaptive Path'
        : 'Program';
  const aiLabel =
    program.ai_mode === 'jordy_generated'
      ? 'Jordy generated'
      : program.ai_mode === 'jordy_guided'
        ? 'Jordy guided'
        : null;

  return {
    ...theme,
    Icon,
    formatLabel,
    aiLabel,
    isSprint: program.program_format === 'sprint',
    isAdaptive: program.program_format === 'adaptive',
  };
}
