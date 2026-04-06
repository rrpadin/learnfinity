
import React, { useState } from 'react';
import { Plus, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { UsersList } from './users/UsersList.jsx';
import { AddUserModal } from './users/AddUserModal.jsx';
import { BulkImportUsersModal } from './users/BulkImportUsersModal.jsx';

export function OrganizationUsersTab({ orgId }) {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleSuccess = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h3 className="text-lg font-semibold">User Management</h3>
          <p className="text-sm text-muted-foreground">Manage access and roles for organization members.</p>
        </div>
        <div className="flex gap-3 w-full sm:w-auto">
          <Button variant="outline" onClick={() => setIsImportModalOpen(true)} className="flex-1 sm:flex-none gap-2">
            <Upload className="w-4 h-4" /> Bulk Import
          </Button>
          <Button onClick={() => setIsAddModalOpen(true)} className="flex-1 sm:flex-none gap-2">
            <Plus className="w-4 h-4" /> Add User
          </Button>
        </div>
      </div>

      <UsersList orgId={orgId} refreshTrigger={refreshTrigger} />

      <AddUserModal 
        isOpen={isAddModalOpen} 
        onClose={() => setIsAddModalOpen(false)} 
        onSuccess={handleSuccess}
        orgId={orgId}
      />

      <BulkImportUsersModal 
        isOpen={isImportModalOpen} 
        onClose={() => setIsImportModalOpen(false)} 
        onSuccess={handleSuccess}
        orgId={orgId}
      />
    </div>
  );
}
