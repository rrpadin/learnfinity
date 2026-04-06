
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { GoalService } from '@/lib/GoalService.js';

export function CreateGoalModal({ isOpen, onClose, onSuccess, orgId }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    goal_type: '',
    priority: 'medium',
    status: 'active',
    target_date: ''
  });

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.goal_type) {
      toast.error('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);
    try {
      const dataToSubmit = { ...formData };
      if (dataToSubmit.target_date) {
        dataToSubmit.target_date = new Date(dataToSubmit.target_date).toISOString();
      } else {
        delete dataToSubmit.target_date;
      }

      await GoalService.createGoal(orgId, dataToSubmit);
      toast.success('Goal created successfully');
      setFormData({
        title: '',
        description: '',
        goal_type: '',
        priority: 'medium',
        status: 'active',
        target_date: ''
      });
      onSuccess();
      onClose();
    } catch (error) {
      toast.error(error.message || 'Failed to create goal');
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid = formData.title.trim().length > 0 && formData.goal_type;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Create Organizational Goal</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="title">Goal Title <span className="text-destructive">*</span></Label>
            <Input 
              id="title" 
              placeholder="e.g., Improve Customer Satisfaction" 
              value={formData.title}
              onChange={(e) => handleChange('title', e.target.value)}
              maxLength={200}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea 
              id="description" 
              placeholder="Provide more details about this goal..." 
              value={formData.description}
              onChange={(e) => handleChange('description', e.target.value)}
              maxLength={1000}
              className="resize-none h-24"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="goal_type">Goal Type <span className="text-destructive">*</span></Label>
              <Select value={formData.goal_type} onValueChange={(val) => handleChange('goal_type', val)} required>
                <SelectTrigger id="goal_type">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="strategic">Strategic</SelectItem>
                  <SelectItem value="operational">Operational</SelectItem>
                  <SelectItem value="learning">Learning</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="priority">Priority</Label>
              <Select value={formData.priority} onValueChange={(val) => handleChange('priority', val)}>
                <SelectTrigger id="priority">
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select value={formData.status} onValueChange={(val) => handleChange('status', val)}>
                <SelectTrigger id="status">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="on_hold">On Hold</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="target_date">Target Date</Label>
              <Input 
                id="target_date" 
                type="date" 
                value={formData.target_date}
                onChange={(e) => handleChange('target_date', e.target.value)}
              />
            </div>
          </div>

          <DialogFooter className="pt-4">
            <Button type="button" variant="outline" onClick={onClose} disabled={isSubmitting}>
              Cancel
            </Button>
            <Button type="submit" disabled={!isFormValid || isSubmitting}>
              {isSubmitting ? 'Creating...' : 'Create Goal'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
