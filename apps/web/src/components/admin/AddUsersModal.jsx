
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Search } from 'lucide-react';
import { toast } from 'sonner';
import { OrganizationService } from '@/lib/OrganizationService.js';

export function AddUsersModal({ isOpen, onClose, onSuccess, orgId }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [availableUsers, setAvailableUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [selectedUserIds, setSelectedUserIds] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [role, setRole] = useState('user');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen && orgId) {
      fetchAvailableUsers();
      setSelectedUserIds([]);
      setSearchQuery('');
      setRole('user');
    }
  }, [isOpen, orgId]);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredUsers(availableUsers);
    } else {
      const lowerQuery = searchQuery.toLowerCase();
      setFilteredUsers(availableUsers.filter(u => 
        (u.name && u.name.toLowerCase().includes(lowerQuery)) || 
        (u.email && u.email.toLowerCase().includes(lowerQuery))
      ));
    }
  }, [searchQuery, availableUsers]);

  const fetchAvailableUsers = async () => {
    setLoading(true);
    try {
      const users = await OrganizationService.getAvailableUsers(orgId);
      setAvailableUsers(users);
      setFilteredUsers(users);
    } catch (error) {
      toast.error('Failed to load available users');
    } finally {
      setLoading(false);
    }
  };

  const toggleUser = (userId) => {
    setSelectedUserIds(prev => 
      prev.includes(userId) 
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    );
  };

  const handleSubmit = async () => {
    if (selectedUserIds.length === 0) return;

    setIsSubmitting(true);
    try {
      await OrganizationService.addUsersToOrganization(orgId, selectedUserIds, role);
      toast.success(`Successfully added ${selectedUserIds.length} user(s)`);
      onSuccess();
      onClose();
    } catch (error) {
      toast.error(error.message || 'Failed to add users');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add Users to Organization</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input 
                placeholder="Search users..." 
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select value={role} onValueChange={setRole}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="user">User</SelectItem>
                <SelectItem value="org_admin">Admin</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="border rounded-md">
            <ScrollArea className="h-[300px]">
              {loading ? (
                <div className="p-4 text-center text-sm text-muted-foreground">Loading users...</div>
              ) : filteredUsers.length === 0 ? (
                <div className="p-4 text-center text-sm text-muted-foreground">No users found.</div>
              ) : (
                <div className="p-2 space-y-1">
                  {filteredUsers.map(user => (
                    <div 
                      key={user.id} 
                      className="flex items-center space-x-3 p-2 hover:bg-muted/50 rounded-md cursor-pointer"
                      onClick={() => toggleUser(user.id)}
                    >
                      <Checkbox 
                        checked={selectedUserIds.includes(user.id)}
                        onCheckedChange={() => toggleUser(user.id)}
                      />
                      <div className="flex flex-col">
                        <span className="text-sm font-medium leading-none">{user.name || 'Unknown'}</span>
                        <span className="text-xs text-muted-foreground">{user.email}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </ScrollArea>
          </div>
          <div className="text-sm text-muted-foreground">
            {selectedUserIds.length} user(s) selected
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={selectedUserIds.length === 0 || isSubmitting}>
            {isSubmitting ? 'Adding...' : `Add ${selectedUserIds.length} User(s)`}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
