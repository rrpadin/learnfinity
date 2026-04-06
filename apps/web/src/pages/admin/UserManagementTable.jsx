
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import pb from '@/lib/pocketbaseClient';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { 
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow 
} from '@/components/ui/table';
import { 
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter
} from '@/components/ui/dialog';
import { Search, ShieldAlert, Trash2, RefreshCw } from 'lucide-react';
import { toast } from 'sonner';

function UserManagementTable() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const records = await pb.collection('users').getFullList({
        sort: '-created',
        $autoCancel: false
      });
      setUsers(records);
    } catch (error) {
      console.error("Error fetching users:", error);
      toast.error("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  const handleMakeAdmin = async (user) => {
    if (!window.confirm(`Make ${user.name || user.email} an admin?`)) return;
    try {
      await pb.collection('users').update(user.id, { role: 'admin', is_admin: true }, { $autoCancel: false });
      toast.success("User promoted to admin");
      fetchUsers();
      setIsModalOpen(false);
    } catch (error) {
      toast.error("Failed to update user");
    }
  };

  const handleDeleteUser = async (user) => {
    if (!window.confirm(`Delete ${user.email}? This cannot be undone.`)) return;
    try {
      await pb.collection('users').delete(user.id, { $autoCancel: false });
      toast.success("User deleted");
      setUsers(users.filter(u => u.id !== user.id));
      setIsModalOpen(false);
    } catch (error) {
      toast.error("Failed to delete user");
    }
  };

  const filteredUsers = users.filter(u => 
    (u.name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
    u.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <Helmet>
        <title>User Management - Admin</title>
      </Helmet>

      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-[hsl(var(--admin-text))] tracking-tight">Users</h1>
          <p className="text-[hsl(var(--admin-muted))] mt-1">Manage platform users and permissions.</p>
        </div>

        <div className="bg-[hsl(var(--admin-card))] border border-[hsl(var(--admin-border))] rounded-xl shadow-sm overflow-hidden">
          <div className="p-4 border-b border-[hsl(var(--admin-border))] flex items-center gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[hsl(var(--admin-muted))]" />
              <Input 
                placeholder="Search users by name or email..." 
                className="pl-9 bg-[hsl(var(--admin-bg))] border-[hsl(var(--admin-border))]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-[hsl(var(--admin-bg))]">
                <TableRow className="border-[hsl(var(--admin-border))] hover:bg-transparent">
                  <TableHead className="text-[hsl(var(--admin-muted))]">User</TableHead>
                  <TableHead className="text-[hsl(var(--admin-muted))]">Role</TableHead>
                  <TableHead className="text-[hsl(var(--admin-muted))]">Streak</TableHead>
                  <TableHead className="text-[hsl(var(--admin-muted))]">Joined</TableHead>
                  <TableHead className="text-right text-[hsl(var(--admin-muted))]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  Array(5).fill(0).map((_, i) => (
                    <TableRow key={i} className="border-[hsl(var(--admin-border))]">
                      <TableCell><Skeleton className="h-10 w-48" /></TableCell>
                      <TableCell><Skeleton className="h-5 w-16" /></TableCell>
                      <TableCell><Skeleton className="h-5 w-12" /></TableCell>
                      <TableCell><Skeleton className="h-5 w-24" /></TableCell>
                      <TableCell><Skeleton className="h-8 w-20 ml-auto" /></TableCell>
                    </TableRow>
                  ))
                ) : filteredUsers.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-12 text-[hsl(var(--admin-muted))]">
                      No users found.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredUsers.map((user) => (
                    <TableRow key={user.id} className="border-[hsl(var(--admin-border))] hover:bg-[hsl(var(--admin-hover))]">
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary text-xs font-bold">
                            {user.name?.charAt(0) || user.email.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <p className="font-medium text-[hsl(var(--admin-text))]">{user.name || 'Unknown'}</p>
                            <p className="text-xs text-[hsl(var(--admin-muted))]">{user.email}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={user.is_admin ? "default" : "secondary"} className="capitalize">
                          {user.role || 'user'}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-[hsl(var(--admin-muted))]">{user.streak_count || 0} days</TableCell>
                      <TableCell className="text-[hsl(var(--admin-muted))]">{new Date(user.created).toLocaleDateString()}</TableCell>
                      <TableCell className="text-right">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => { setSelectedUser(user); setIsModalOpen(true); }}
                        >
                          View Details
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="bg-[hsl(var(--admin-card))] border-[hsl(var(--admin-border))] text-[hsl(var(--admin-text))]">
          <DialogHeader>
            <DialogTitle>User Details</DialogTitle>
          </DialogHeader>
          {selectedUser && (
            <div className="space-y-4 py-4">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center text-primary text-2xl font-bold">
                  {selectedUser.name?.charAt(0) || selectedUser.email.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h3 className="text-xl font-bold">{selectedUser.name || 'Unknown'}</h3>
                  <p className="text-[hsl(var(--admin-muted))]">{selectedUser.email}</p>
                  <Badge variant={selectedUser.is_admin ? "default" : "secondary"} className="mt-1 capitalize">
                    {selectedUser.role || 'user'}
                  </Badge>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-[hsl(var(--admin-bg))] rounded-lg border border-[hsl(var(--admin-border))]">
                  <p className="text-xs text-[hsl(var(--admin-muted))]">Current Streak</p>
                  <p className="text-lg font-bold">{selectedUser.streak_count || 0} Days</p>
                </div>
                <div className="p-3 bg-[hsl(var(--admin-bg))] rounded-lg border border-[hsl(var(--admin-border))]">
                  <p className="text-xs text-[hsl(var(--admin-muted))]">Joined</p>
                  <p className="text-lg font-bold">{new Date(selectedUser.created).toLocaleDateString()}</p>
                </div>
              </div>

              <DialogFooter className="mt-6 flex-col sm:flex-row gap-2">
                {!selectedUser.is_admin && (
                  <Button variant="outline" onClick={() => handleMakeAdmin(selectedUser)} className="w-full sm:w-auto gap-2">
                    <ShieldAlert className="w-4 h-4" /> Make Admin
                  </Button>
                )}
                <Button variant="destructive" onClick={() => handleDeleteUser(selectedUser)} className="w-full sm:w-auto gap-2">
                  <Trash2 className="w-4 h-4" /> Delete User
                </Button>
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}

export default UserManagementTable;
