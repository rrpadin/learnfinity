
import React from 'react';
import { useDemoContext } from '@/contexts/DemoContext.jsx';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, CheckCircle2 } from 'lucide-react';

export default function DemoModal() {
  const { 
    isActive, 
    currentStep, 
    totalSteps, 
    steps, 
    nextStep, 
    previousStep, 
    exitDemo 
  } = useDemoContext();

  if (!isActive || !steps.length) return null;

  const stepData = steps[currentStep - 1];
  if (!stepData) return null;

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[90] w-full max-w-md demo-fade-in">
      <div className="bg-card border border-border shadow-2xl rounded-2xl overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-border flex items-center justify-between bg-muted/30">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Step {currentStep} of {totalSteps}
            </span>
          </div>
          <div className="flex gap-1">
            {Array.from({ length: totalSteps }).map((_, i) => (
              <div 
                key={i}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i + 1 === currentStep 
                    ? 'w-4 bg-[hsl(var(--demo-primary))]' 
                    : i + 1 < currentStep
                      ? 'w-1.5 bg-[hsl(var(--demo-primary))]/40'
                      : 'w-1.5 bg-border'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <h3 className="text-xl font-bold mb-2">{stepData.title}</h3>
          <p className="text-muted-foreground mb-6 leading-relaxed">
            {stepData.description}
          </p>

          {stepData.keyPoints && stepData.keyPoints.length > 0 && (
            <div className="space-y-2 mb-8">
              <p className="text-sm font-medium text-foreground">Key Features:</p>
              <ul className="space-y-2">
                {stepData.keyPoints.map((point, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <CheckCircle2 className="w-4 h-4 text-[hsl(var(--demo-primary))] mt-0.5 shrink-0" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Navigation */}
          <div className="flex items-center justify-between pt-4 border-t border-border">
            <Button 
              variant="ghost" 
              onClick={exitDemo}
              className="text-muted-foreground hover:text-foreground"
            >
              Skip Demo
            </Button>
            
            <div className="flex items-center gap-2">
              <Button 
                variant="outline" 
                size="icon"
                onClick={previousStep}
                disabled={currentStep === 1}
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <Button 
                onClick={nextStep}
                className="bg-[hsl(var(--demo-primary))] hover:bg-[hsl(var(--demo-primary))]/90 text-white min-w-[100px]"
              >
                {currentStep === totalSteps ? 'Finish' : (
                  <>
                    Next <ChevronRight className="w-4 h-4 ml-1" />
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
