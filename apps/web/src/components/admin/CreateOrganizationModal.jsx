
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { OrganizationService } from '@/lib/OrganizationService.js';

export function CreateOrganizationModal({ isOpen, onClose, onSuccess }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    website: '',
    primary_contact_name: '',
    primary_contact_email: '',
    primary_contact_phone: '',
    user_limit: 100,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    if (!formData.name.trim()) return false;
    if (!formData.primary_contact_name.trim()) return false;
    if (!formData.primary_contact_email.trim() || !/^\S+@\S+\.\S+$/.test(formData.primary_contact_email)) return false;
    if (formData.user_limit < 1 || formData.user_limit > 10000) return false;
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      await OrganizationService.createOrganization({
        ...formData,
        status: 'active',
        current_user_count: 0
      });
      toast.success('Organization created successfully');
      onSuccess();
      onClose();
      setFormData({
        name: '', description: '', website: '', primary_contact_name: '',
        primary_contact_email: '', primary_contact_phone: '', user_limit: 100
      });
    } catch (error) {
      toast.error(error.message || 'Failed to create organization');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create New Organization</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6 py-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Organization Name *</Label>
              <Input 
                id="name" name="name" 
                value={formData.name} onChange={handleChange} 
                placeholder="Acme Corp" required 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="website">Website</Label>
              <Input 
                id="website" name="website" type="url"
                value={formData.website} onChange={handleChange} 
                placeholder="https://example.com" 
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea 
              id="description" name="description" 
              value={formData.description} onChange={handleChange} 
              placeholder="Brief description of the organization..." 
              rows={3}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="primary_contact_name">Primary Contact Name *</Label>
              <Input 
                id="primary_contact_name" name="primary_contact_name" 
                value={formData.primary_contact_name} onChange={handleChange} 
                placeholder="Jane Doe" required 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="primary_contact_email">Primary Contact Email *</Label>
              <Input 
                id="primary_contact_email" name="primary_contact_email" type="email"
                value={formData.primary_contact_email} onChange={handleChange} 
                placeholder="jane@example.com" required 
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="primary_contact_phone">Primary Contact Phone</Label>
              <Input 
                id="primary_contact_phone" name="primary_contact_phone" type="tel"
                value={formData.primary_contact_phone} onChange={handleChange} 
                placeholder="+1 (555) 000-0000" 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="user_limit">User Limit * (1-10000)</Label>
              <Input 
                id="user_limit" name="user_limit" type="number" min="1" max="10000"
                value={formData.user_limit} onChange={handleChange} 
                required 
              />
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose} disabled={isSubmitting}>
              Cancel
            </Button>
            <Button type="submit" disabled={!validateForm() || isSubmitting}>
              {isSubmitting ? 'Creating...' : 'Create Organization'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
