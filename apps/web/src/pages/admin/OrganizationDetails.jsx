
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Skeleton } from '@/components/ui/skeleton';
import { OrganizationService } from '@/lib/OrganizationService.js';
import { OrganizationHeader } from '@/components/admin/OrganizationHeader.jsx';
import { OrganizationOverviewTab } from '@/components/admin/OrganizationOverviewTab.jsx';
import { OrganizationUsersTab } from '@/components/admin/OrganizationUsersTab.jsx';
import { EditOrganizationModal } from '@/components/admin/EditOrganizationModal.jsx';
import { DeleteOrganizationDialog } from '@/components/admin/DeleteOrganizationDialog.jsx';
import { GoalsTab } from '@/components/admin/goals/GoalsTab.jsx';
import { ProgramsTab } from '@/components/admin/programs/ProgramsTab.jsx';
import { AIManagementTab } from '@/components/admin/AIManagementTab.jsx';
import { OrganizationIntegrationsTab } from '@/components/admin/integrations/OrganizationIntegrationsTab.jsx';
import { OrganizationWorkflowsTab } from '@/components/admin/workflows/OrganizationWorkflowsTab.jsx';

export default function OrganizationDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [organization, setOrganization] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Modals
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const fetchOrganization = async () => {
    setLoading(true);
    try {
      const data = await OrganizationService.getOrganizationWithUsers(id);
      setOrganization(data);
      setError(null);
    } catch (err) {
      console.error("Failed to fetch organization", err);
      setError("Organization not found or you don't have permission to view it.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchOrganization();
    }
  }, [id]);

  const handleDeleteSuccess = () => {
    navigate('/admin/organizations');
  };

  if (loading) {
    return (
      <div className="space-y-8">
        <div className="flex items-center gap-2">
          <Skeleton className="h-8 w-8 rounded-md" />
          <Skeleton className="h-6 w-32" />
        </div>
        <Skeleton className="h-40 w-full rounded-2xl" />
        <Skeleton className="h-10 w-full max-w-4xl rounded-md" />
        <Skeleton className="h-64 w-full rounded-xl" />
      </div>
    );
  }

  if (error || !organization) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <h2 className="text-2xl font-bold text-foreground mb-2">Organization Not Found</h2>
        <p className="text-muted-foreground mb-6">{error}</p>
        <Button asChild>
          <Link to="/admin/organizations">Back to Organizations</Link>
        </Button>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{`${organization.name} - Admin | Learnfinity`}</title>
      </Helmet>

      <div className="space-y-6">
        {/* Breadcrumb / Back */}
        <div className="flex items-center gap-2 text-sm text-[hsl(var(--admin-muted))]">
          <Link to="/admin/organizations" className="hover:text-primary transition-colors flex items-center gap-1">
            <ArrowLeft className="w-4 h-4" /> Organizations
          </Link>
          <span>/</span>
          <span className="text-[hsl(var(--admin-text))] font-medium">{organization.name}</span>
        </div>

        <OrganizationHeader organization={organization} />

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="mb-6 bg-[hsl(var(--admin-card))] border flex-wrap h-auto">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="programs">Programs</TabsTrigger>
            <TabsTrigger value="goals">Goals</TabsTrigger>
            <TabsTrigger value="integrations">Integrations</TabsTrigger>
            <TabsTrigger value="workflows">Workflows</TabsTrigger>
            <TabsTrigger value="ai">AI Management</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="mt-0">
            <OrganizationOverviewTab 
              organization={organization} 
              onEdit={() => setIsEditModalOpen(true)}
              onDelete={() => setIsDeleteDialogOpen(true)}
            />
          </TabsContent>
          
          <TabsContent value="users" className="mt-0">
            <OrganizationUsersTab orgId={organization.id} />
          </TabsContent>

          <TabsContent value="programs" className="mt-0">
            <ProgramsTab orgId={organization.id} />
          </TabsContent>

          <TabsContent value="goals" className="mt-0">
            <GoalsTab orgId={organization.id} />
          </TabsContent>

          <TabsContent value="integrations" className="mt-0">
            <OrganizationIntegrationsTab orgId={organization.id} />
          </TabsContent>

          <TabsContent value="workflows" className="mt-0">
            <OrganizationWorkflowsTab orgId={organization.id} />
          </TabsContent>

          <TabsContent value="ai" className="mt-0">
            <AIManagementTab orgId={organization.id} />
          </TabsContent>
        </Tabs>
      </div>

      <EditOrganizationModal 
        isOpen={isEditModalOpen} 
        organization={organization}
        onClose={() => setIsEditModalOpen(false)} 
        onSuccess={fetchOrganization}
      />

      <DeleteOrganizationDialog 
        isOpen={isDeleteDialogOpen} 
        organization={organization}
        onClose={() => setIsDeleteDialogOpen(false)} 
        onSuccess={handleDeleteSuccess}
      />
    </>
  );
}
