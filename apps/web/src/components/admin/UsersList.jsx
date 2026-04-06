
import React from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { Trash2, Users as UsersIcon } from 'lucide-react';
import { UserRoleSelector } from './UserRoleSelector.jsx';

export function UsersList({ 
  orgId,
  users, 
  loading, 
  onRemove,
  onRefresh
}) {
  
  if (loading) {
    return (
      <div className="border rounded-lg overflow-hidden bg-[hsl(var(--admin-card))]">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Joined</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {[1, 2, 3].map((i) => (
              <TableRow key={i}>
                <TableCell><Skeleton className="h-10 w-48" /></TableCell>
                <TableCell><Skeleton className="h-8 w-24" /></TableCell>
                <TableCell><Skeleton className="h-6 w-16 rounded-full" /></TableCell>
                <TableCell><Skeleton className="h-5 w-24" /></TableCell>
                <TableCell className="text-right"><Skeleton className="h-8 w-8 ml-auto" /></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  }

  if (!users || users.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4 border rounded-lg bg-[hsl(var(--admin-card))] text-center">
        <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
          <UsersIcon className="w-8 h-8 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-semibold text-[hsl(var(--admin-text))]">No users found</h3>
        <p className="text-[hsl(var(--admin-muted))] mt-1 max-w-sm">
          There are no users matching your filters, or the organization has no users yet.
        </p>
      </div>
    );
  }

  return (
    <div className="border rounded-lg overflow-hidden bg-[hsl(var(--admin-card))]">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead className="font-semibold">User</TableHead>
            <TableHead className="font-semibold">Role</TableHead>
            <TableHead className="font-semibold">Status</TableHead>
            <TableHead className="font-semibold">Joined</TableHead>
            <TableHead className="text-right font-semibold">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((orgUser) => {
            const user = orgUser.expand?.user_id || {};
            return (
              <TableRow key={orgUser.id} className="hover:bg-[hsl(var(--admin-hover))] transition-colors">
                <TableCell>
                  <div className="flex flex-col">
                    <span className="font-medium text-[hsl(var(--admin-text))]">{user.name || 'Unknown User'}</span>
                    <span className="text-xs text-[hsl(var(--admin-muted))]">{user.email}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <UserRoleSelector 
                    orgId={orgId}
                    orgUserId={orgUser.id}
                    currentRole={orgUser.role}
                    onRoleChange={onRefresh}
                  />
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className={
                    orgUser.status === 'active' 
                      ? 'bg-emerald-500/15 text-emerald-700 border-emerald-200 dark:text-emerald-400 dark:border-emerald-800' 
                      : 'bg-slate-500/15 text-slate-700 border-slate-200 dark:text-slate-400 dark:border-slate-800'
                  }>
                    {orgUser.status || 'active'}
                  </Badge>
                </TableCell>
                <TableCell className="text-sm text-[hsl(var(--admin-muted))]">
                  {new Date(orgUser.created).toLocaleDateString()}
                </TableCell>
                <TableCell className="text-right">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => onRemove(orgUser)}
                    className="h-8 w-8 text-[hsl(var(--admin-muted))] hover:text-destructive hover:bg-destructive/10"
                  >
                    <Trash2 className="h-4 w-4" />
                    <span className="sr-only">Remove</span>
                  </Button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
