
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { toast } from 'sonner';
import { UserService } from '@/lib/UserService.js';
import { PasswordStrengthIndicator } from './PasswordStrengthIndicator.jsx';

export function EditUserModal({ isOpen, onClose, onSuccess, user }) {
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '', // Only for changing password
    phone: '',
    job_title: '',
    department: '',
    role: 'learner',
    employment_type: 'full_time',
    status: 'active',
    location: '',
    bio: ''
  });

  useEffect(() => {
    if (user && isOpen) {
      setFormData({
        first_name: user.first_name || '',
        last_name: user.last_name || '',
        email: user.email || '',
        password: '', // Don't populate password
        phone: user.phone || '',
        job_title: user.job_title || '',
        department: user.department || '',
        role: user.role || 'learner',
        employment_type: user.employment_type || 'full_time',
        status: user.status || 'active',
        location: user.location || '',
        bio: user.bio || ''
      });
    }
  }, [user, isOpen]);

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const isFormValid = () => {
    return (
      formData.first_name.trim() !== '' &&
      formData.last_name.trim() !== '' &&
      formData.email.trim() !== '' &&
      (formData.password === '' || formData.password.length >= 8)
    );
  };

  const handleSubmit = async () => {
    if (!isFormValid() || !user) return;
    
    setSubmitting(true);
    try {
      const updates = { ...formData };
      if (!updates.password) {
        delete updates.password; // Don't send empty password
      }
      
      await UserService.updateUser(user.id, updates);
      toast.success(`User ${formData.first_name} updated successfully`);
      onSuccess();
      onClose();
    } catch (error) {
      console.error("Failed to update user", error);
      toast.error(error.message || "Failed to update user.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] flex flex-col p-0">
        <DialogHeader className="px-6 py-4 border-b">
          <DialogTitle>Edit User</DialogTitle>
        </DialogHeader>

        <ScrollArea className="flex-1 px-6 py-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>First Name <span className="text-destructive">*</span></Label>
              <Input 
                value={formData.first_name} 
                onChange={(e) => handleChange('first_name', e.target.value)} 
              />
            </div>
            <div className="space-y-2">
              <Label>Last Name <span className="text-destructive">*</span></Label>
              <Input 
                value={formData.last_name} 
                onChange={(e) => handleChange('last_name', e.target.value)} 
              />
            </div>
            
            <div className="space-y-2 md:col-span-2">
              <Label>Email <span className="text-destructive">*</span></Label>
              <Input 
                type="email"
                value={formData.email} 
                onChange={(e) => handleChange('email', e.target.value)} 
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label>New Password (leave blank to keep current)</Label>
              <Input 
                type="password"
                value={formData.password} 
                onChange={(e) => handleChange('password', e.target.value)} 
                placeholder="Minimum 8 characters"
              />
              {formData.password && <PasswordStrengthIndicator password={formData.password} />}
            </div>

            <div className="space-y-2">
              <Label>Role</Label>
              <Select value={formData.role} onValueChange={(v) => handleChange('role', v)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="manager">Manager</SelectItem>
                  <SelectItem value="employee">Employee</SelectItem>
                  <SelectItem value="learner">Learner</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Status</Label>
              <Select value={formData.status} onValueChange={(v) => handleChange('status', v)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Job Title</Label>
              <Input 
                value={formData.job_title} 
                onChange={(e) => handleChange('job_title', e.target.value)} 
              />
            </div>

            <div className="space-y-2">
              <Label>Department</Label>
              <Input 
                value={formData.department} 
                onChange={(e) => handleChange('department', e.target.value)} 
              />
            </div>

            <div className="space-y-2">
              <Label>Employment Type</Label>
              <Select value={formData.employment_type} onValueChange={(v) => handleChange('employment_type', v)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="full_time">Full Time</SelectItem>
                  <SelectItem value="part_time">Part Time</SelectItem>
                  <SelectItem value="contract">Contract</SelectItem>
                  <SelectItem value="temporary">Temporary</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Location</Label>
              <Input 
                value={formData.location} 
                onChange={(e) => handleChange('location', e.target.value)} 
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label>Bio</Label>
              <Textarea 
                value={formData.bio} 
                onChange={(e) => handleChange('bio', e.target.value)} 
                rows={3}
              />
            </div>
          </div>
        </ScrollArea>

        <DialogFooter className="px-6 py-4 border-t">
          <Button variant="outline" onClick={onClose} disabled={submitting}>Cancel</Button>
          <Button onClick={handleSubmit} disabled={!isFormValid() || submitting}>
            {submitting ? "Updating..." : "Update User"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
