
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { OrganizationService } from '@/lib/OrganizationService.js';

export function EditOrganizationModal({ isOpen, onClose, onSuccess, organization }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    website: '',
    primary_contact_name: '',
    primary_contact_email: '',
    primary_contact_phone: '',
    user_limit: 100,
    status: 'active'
  });

  useEffect(() => {
    if (organization && isOpen) {
      setFormData({
        name: organization.name || '',
        description: organization.description || '',
        website: organization.website || '',
        primary_contact_name: organization.primary_contact_name || '',
        primary_contact_email: organization.primary_contact_email || '',
        primary_contact_phone: organization.primary_contact_phone || '',
        user_limit: organization.user_limit || 100,
        status: organization.status || 'active'
      });
    }
  }, [organization, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleStatusChange = (value) => {
    setFormData(prev => ({ ...prev, status: value }));
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
    if (!validateForm() || !organization?.id) return;

    setIsSubmitting(true);
    try {
      await OrganizationService.updateOrganization(organization.id, formData);
      toast.success('Organization updated successfully');
      onSuccess();
      onClose();
    } catch (error) {
      toast.error(error.message || 'Failed to update organization');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Organization</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6 py-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="edit-name">Organization Name *</Label>
              <Input 
                id="edit-name" name="name" 
                value={formData.name} onChange={handleChange} 
                required 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-status">Status</Label>
              <Select value={formData.status} onValueChange={handleStatusChange}>
                <SelectTrigger id="edit-status">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                  <SelectItem value="suspended">Suspended</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-description">Description</Label>
            <Textarea 
              id="edit-description" name="description" 
              value={formData.description} onChange={handleChange} 
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-website">Website</Label>
            <Input 
              id="edit-website" name="website" type="url"
              value={formData.website} onChange={handleChange} 
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="edit-contact-name">Primary Contact Name *</Label>
              <Input 
                id="edit-contact-name" name="primary_contact_name" 
                value={formData.primary_contact_name} onChange={handleChange} 
                required 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-contact-email">Primary Contact Email *</Label>
              <Input 
                id="edit-contact-email" name="primary_contact_email" type="email"
                value={formData.primary_contact_email} onChange={handleChange} 
                required 
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="edit-contact-phone">Primary Contact Phone</Label>
              <Input 
                id="edit-contact-phone" name="primary_contact_phone" type="tel"
                value={formData.primary_contact_phone} onChange={handleChange} 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-user-limit">User Limit * (1-10000)</Label>
              <Input 
                id="edit-user-limit" name="user_limit" type="number" min="1" max="10000"
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
              {isSubmitting ? 'Saving...' : 'Save Changes'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
