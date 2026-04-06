
import React from 'react';
import { cn } from '@/lib/utils';

export function PasswordStrengthIndicator({ password }) {
  const calculateStrength = (pass) => {
    if (!pass) return { score: 0, label: 'None', color: 'bg-muted' };
    
    let score = 0;
    if (pass.length >= 8) score += 1;
    if (pass.length >= 12) score += 1;
    if (/[A-Z]/.test(pass)) score += 1;
    if (/[0-9]/.test(pass)) score += 1;
    if (/[^A-Za-z0-9]/.test(pass)) score += 1;

    if (score <= 2) return { score, label: 'Weak', color: 'bg-destructive' };
    if (score === 3) return { score, label: 'Fair', color: 'bg-amber-500' };
    if (score === 4) return { score, label: 'Good', color: 'bg-blue-500' };
    return { score, label: 'Strong', color: 'bg-emerald-500' };
  };

  const strength = calculateStrength(password);

  return (
    <div className="space-y-1.5 mt-2">
      <div className="flex gap-1 h-1.5">
        {[1, 2, 3, 4].map((segment) => (
          <div 
            key={segment} 
            className={cn(
              "flex-1 rounded-full transition-colors duration-300",
              password && segment <= Math.min(4, Math.max(1, strength.score)) ? strength.color : "bg-muted"
            )}
          />
        ))}
      </div>
      <div className="flex justify-between items-center text-xs">
        <span className="text-muted-foreground">Password strength:</span>
        <span className={cn("font-medium", password ? `text-${strength.color.replace('bg-', '')}` : "text-muted-foreground")}>
          {strength.label}
        </span>
      </div>
    </div>
  );
}
