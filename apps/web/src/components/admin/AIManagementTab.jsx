
import React, { useState, useEffect, useCallback } from 'react';
import { Play, Settings, History } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AIManagementService } from '@/lib/AIManagementService.js';
import { AIStatusCard } from './AIStatusCard.jsx';
import { TrainAIModal } from './TrainAIModal.jsx';
import { TrainingHistoryTable } from './TrainingHistoryTable.jsx';

export function AIManagementTab({ orgId }) {
  const [config, setConfig] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isTrainModalOpen, setIsTrainModalOpen] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const fetchConfig = useCallback(async () => {
    if (!orgId) return;
    setLoading(true);
    try {
      const data = await AIManagementService.getOrganizationAIConfig(orgId);
      setConfig(data);
    } catch (error) {
      console.error("Failed to fetch AI config", error);
    } finally {
      setLoading(false);
    }
  }, [orgId]);

  useEffect(() => {
    fetchConfig();
  }, [fetchConfig]);

  const handleTrainingComplete = () => {
    fetchConfig();
    setRefreshTrigger(prev => prev + 1);
  };

  return (
    <div className="space-y-8">
      <AIStatusCard 
        organizationId={orgId} 
        config={config} 
        loading={loading} 
        onConfigChange={fetchConfig} 
      />

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h3 className="text-lg font-semibold">Training History</h3>
        <div className="flex gap-3 w-full sm:w-auto">
          <Button variant="outline" className="gap-2 flex-1 sm:flex-none">
            <Settings className="w-4 h-4" /> AI Settings
          </Button>
          <Button 
            onClick={() => setIsTrainModalOpen(true)} 
            disabled={!config?.ai_enabled || loading}
            className="gap-2 flex-1 sm:flex-none"
          >
            <Play className="w-4 h-4" /> Train AI
          </Button>
        </div>
      </div>

      <TrainingHistoryTable 
        organizationId={orgId} 
        refreshTrigger={refreshTrigger} 
      />

      <TrainAIModal 
        isOpen={isTrainModalOpen}
        onClose={() => setIsTrainModalOpen(false)}
        onTrainingComplete={handleTrainingComplete}
        organizationId={orgId}
      />
    </div>
  );
}
