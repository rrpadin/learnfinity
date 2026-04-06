
import React, { useState } from 'react';
import { format } from 'date-fns';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Skeleton } from '@/components/ui/skeleton';
import { BrainCircuit, Database, Clock, Activity } from 'lucide-react';
import { toast } from 'sonner';
import { AIManagementService } from '@/lib/AIManagementService.js';
import { TrainingStatusBadge } from './TrainingStatusBadge.jsx';
import { DisableAIDialog } from './DisableAIDialog.jsx';

export function AIStatusCard({ organizationId, config, loading, onConfigChange }) {
  const [isDisableDialogOpen, setIsDisableDialogOpen] = useState(false);
  const [isToggling, setIsToggling] = useState(false);

  const handleToggle = async (checked) => {
    if (!checked) {
      setIsDisableDialogOpen(true);
      return;
    }

    setIsToggling(true);
    try {
      await AIManagementService.enableAI(organizationId);
      toast.success("AI features enabled successfully.");
      onConfigChange();
    } catch (error) {
      console.error("Failed to enable AI", error);
      toast.error("Failed to enable AI.");
    } finally {
      setIsToggling(false);
    }
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-48 mb-2" />
          <Skeleton className="h-4 w-72" />
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="space-y-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-8 w-32" />
            </div>
          ))}
        </CardContent>
      </Card>
    );
  }

  if (!config) return null;

  return (
    <>
      <Card>
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl flex items-center gap-2">
                <BrainCircuit className="w-5 h-5 text-primary" />
                AI Configuration
              </CardTitle>
              <CardDescription>
                Manage artificial intelligence features and model training for this organization.
              </CardDescription>
            </div>
            <div className="flex items-center space-x-2 bg-muted/50 p-2 rounded-lg border">
              <Switch 
                id="ai-enabled" 
                checked={config.ai_enabled} 
                onCheckedChange={handleToggle}
                disabled={isToggling}
              />
              <Label htmlFor="ai-enabled" className="font-medium cursor-pointer">
                {config.ai_enabled ? 'AI Enabled' : 'AI Disabled'}
              </Label>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-4 border-t">
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground flex items-center gap-1.5">
                <Activity className="w-4 h-4" /> Current Model
              </p>
              <p className="text-lg font-semibold">{config.ai_model || 'GPT-4'}</p>
            </div>
            
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground flex items-center gap-1.5">
                <BrainCircuit className="w-4 h-4" /> Training Status
              </p>
              <div className="pt-1">
                <TrainingStatusBadge status={config.training_status} />
              </div>
            </div>
            
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground flex items-center gap-1.5">
                <Clock className="w-4 h-4" /> Last Training
              </p>
              <p className="text-base font-medium">
                {config.last_training_date 
                  ? format(new Date(config.last_training_date), 'MM/dd/yyyy h:mm a') 
                  : 'Never'}
              </p>
            </div>
            
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground flex items-center gap-1.5">
                <Database className="w-4 h-4" /> Data Points
              </p>
              <p className="text-lg font-semibold">
                {config.training_data_count?.toLocaleString() || 0}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <DisableAIDialog 
        isOpen={isDisableDialogOpen}
        onClose={() => setIsDisableDialogOpen(false)}
        onConfirm={onConfigChange}
        organizationId={organizationId}
      />
    </>
  );
}
