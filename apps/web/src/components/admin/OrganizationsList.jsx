
import React from 'react';
import { Link } from 'react-router-dom';
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
import { Edit2, Trash2, Building } from 'lucide-react';
import { OrganizationStatusBadge } from './OrganizationStatusBadge.jsx';

export function OrganizationsList({ 
  organizations, 
  loading, 
  onEdit, 
  onDelete 
}) {
  
  if (loading) {
    return (
      <div className="border rounded-lg overflow-hidden bg-[hsl(var(--admin-card))]">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Organization</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Users</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {[1, 2, 3, 4, 5].map((i) => (
              <TableRow key={i}>
                <TableCell><Skeleton className="h-5 w-32" /></TableCell>
                <TableCell><Skeleton className="h-5 w-40" /></TableCell>
                <TableCell><Skeleton className="h-5 w-16" /></TableCell>
                <TableCell><Skeleton className="h-6 w-20 rounded-full" /></TableCell>
                <TableCell className="text-right"><Skeleton className="h-8 w-16 ml-auto" /></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  }

  if (!organizations || organizations.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4 border rounded-lg bg-[hsl(var(--admin-card))] text-center">
        <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
          <Building className="w-8 h-8 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-semibold text-[hsl(var(--admin-text))]">No organizations found</h3>
        <p className="text-[hsl(var(--admin-muted))] mt-1 max-w-sm">
          We couldn't find any organizations matching your current filters. Try adjusting your search or create a new one.
        </p>
      </div>
    );
  }

  return (
    <div className="border rounded-lg overflow-hidden bg-[hsl(var(--admin-card))]">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead className="font-semibold">Organization Name</TableHead>
            <TableHead className="font-semibold">Primary Contact</TableHead>
            <TableHead className="font-semibold">Users</TableHead>
            <TableHead className="font-semibold">Status</TableHead>
            <TableHead className="font-semibold">Created</TableHead>
            <TableHead className="text-right font-semibold">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {organizations.map((org) => (
            <TableRow key={org.id} className="hover:bg-[hsl(var(--admin-hover))] transition-colors">
              <TableCell className="font-medium">
                <Link to={`/admin/organizations/${org.id}`} className="text-primary hover:underline">
                  {org.name}
                </Link>
              </TableCell>
              <TableCell>
                <div className="flex flex-col">
                  <span className="text-sm text-[hsl(var(--admin-text))]">{org.primary_contact_name}</span>
                  <span className="text-xs text-[hsl(var(--admin-muted))]">{org.primary_contact_email}</span>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">{org.current_user_count || 0}</span>
                  <span className="text-xs text-[hsl(var(--admin-muted))]">/ {org.user_limit}</span>
                </div>
              </TableCell>
              <TableCell>
                <OrganizationStatusBadge status={org.status} />
              </TableCell>
              <TableCell className="text-sm text-[hsl(var(--admin-muted))]">
                {new Date(org.created).toLocaleDateString()}
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => onEdit(org)}
                    className="h-8 w-8 text-[hsl(var(--admin-muted))] hover:text-primary hover:bg-primary/10"
                  >
                    <Edit2 className="h-4 w-4" />
                    <span className="sr-only">Edit</span>
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => onDelete(org)}
                    className="h-8 w-8 text-[hsl(var(--admin-muted))] hover:text-destructive hover:bg-destructive/10"
                  >
                    <Trash2 className="h-4 w-4" />
                    <span className="sr-only">Delete</span>
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
