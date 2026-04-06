
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { GoalService } from '@/lib/GoalService.js';

export function EditGoalModal({ isOpen, onClose, onSuccess, goal }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    goal_type: '',
    priority: 'medium',
    status: 'active',
    target_date: ''
  });

  useEffect(() => {
    if (goal && isOpen) {
      setFormData({
        title: goal.title || '',
        description: goal.description || '',
        goal_type: goal.goal_type || '',
        priority: goal.priority || 'medium',
        status: goal.status || 'active',
        target_date: goal.target_date ? goal.target_date.split('T')[0] : ''
      });
    }
  }, [goal, isOpen]);

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
        dataToSubmit.target_date = null;
      }

      await GoalService.updateGoal(goal.id, dataToSubmit);
      toast.success('Goal updated successfully');
      onSuccess();
      onClose();
    } catch (error) {
      toast.error(error.message || 'Failed to update goal');
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid = formData.title.trim().length > 0 && formData.goal_type;
  
  // Check if changes were made
  const hasChanges = goal && (
    formData.title !== goal.title ||
    formData.description !== (goal.description || '') ||
    formData.goal_type !== goal.goal_type ||
    formData.priority !== goal.priority ||
    formData.status !== goal.status ||
    formData.target_date !== (goal.target_date ? goal.target_date.split('T')[0] : '')
  );

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Edit Organizational Goal</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="edit-title">Goal Title <span className="text-destructive">*</span></Label>
            <Input 
              id="edit-title" 
              placeholder="e.g., Improve Customer Satisfaction" 
              value={formData.title}
              onChange={(e) => handleChange('title', e.target.value)}
              maxLength={200}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-description">Description</Label>
            <Textarea 
              id="edit-description" 
              placeholder="Provide more details about this goal..." 
              value={formData.description}
              onChange={(e) => handleChange('description', e.target.value)}
              maxLength={1000}
              className="resize-none h-24"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="edit-goal_type">Goal Type <span className="text-destructive">*</span></Label>
              <Select value={formData.goal_type} onValueChange={(val) => handleChange('goal_type', val)} required>
                <SelectTrigger id="edit-goal_type">
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
              <Label htmlFor="edit-priority">Priority</Label>
              <Select value={formData.priority} onValueChange={(val) => handleChange('priority', val)}>
                <SelectTrigger id="edit-priority">
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
              <Label htmlFor="edit-status">Status</Label>
              <Select value={formData.status} onValueChange={(val) => handleChange('status', val)}>
                <SelectTrigger id="edit-status">
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
              <Label htmlFor="edit-target_date">Target Date</Label>
              <Input 
                id="edit-target_date" 
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
            <Button type="submit" disabled={!isFormValid || !hasChanges || isSubmitting}>
              {isSubmitting ? 'Saving...' : 'Save Changes'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
