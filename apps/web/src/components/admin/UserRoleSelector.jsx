
import React, { useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { OrganizationService } from '@/lib/OrganizationService.js';

export function UserRoleSelector({ orgId, orgUserId, currentRole, onRoleChange }) {
  const [isUpdating, setIsUpdating] = useState(false);

  const handleRoleChange = async (newRole) => {
    if (newRole === currentRole) return;
    
    setIsUpdating(true);
    try {
      await OrganizationService.updateUserRole(orgId, orgUserId, newRole);
      toast.success('User role updated successfully');
      if (onRoleChange) onRoleChange();
    } catch (error) {
      toast.error(error.message || 'Failed to update role');
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <Select value={currentRole} onValueChange={handleRoleChange} disabled={isUpdating}>
      <SelectTrigger className="w-[130px] h-8 text-xs bg-transparent border-none shadow-none hover:bg-muted focus:ring-0">
        <SelectValue placeholder="Select role" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="org_admin">Admin</SelectItem>
        <SelectItem value="user">User</SelectItem>
      </SelectContent>
    </Select>
  );
}
