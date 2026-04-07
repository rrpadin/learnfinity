
import React from 'react';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from '@/contexts/AuthContext.jsx';
import { DemoProvider } from '@/contexts/DemoContext.jsx';
import { Toaster } from '@/components/ui/sonner';
import ScrollToTop from '@/components/ScrollToTop.jsx';
import ProtectedRoute from '@/components/ProtectedRoute.jsx';
import AdminRoute from '@/components/AdminRoute.jsx';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import AdminLayout from '@/components/AdminLayout.jsx';
import DemoModeIndicator from '@/components/DemoModeIndicator.jsx';

// Public & User Pages
import DashboardPage from '@/pages/DashboardPage.jsx';
import LoginPage from '@/pages/LoginPage.jsx';
import SignupPage from '@/pages/SignupPage.jsx';
import MissionWorkspacePage from '@/pages/MissionWorkspacePage.jsx';
import ProgressTrackerPage from '@/pages/ProgressTrackerPage.jsx';
import ProgramLibraryPage from '@/pages/ProgramLibraryPage.jsx';
import ProgramDetailsPage from '@/pages/ProgramDetailsPage.jsx';

// Admin Pages
import AdminDashboard from '@/pages/admin/AdminDashboard.jsx';
import ProgramList from '@/pages/admin/ProgramList.jsx';
import ProgramEditor from '@/pages/admin/ProgramEditor.jsx';
import MissionEditor from '@/pages/admin/MissionEditor.jsx';
import UserManagementTable from '@/pages/admin/UserManagementTable.jsx';
import AdminSettings from '@/pages/admin/AdminSettings.jsx';
import OrganizationManagement from '@/pages/admin/OrganizationManagement.jsx';
import OrganizationDetails from '@/pages/admin/OrganizationDetails.jsx';
import IntegrationsHub from '@/pages/admin/integrations/IntegrationsHub.jsx';
import IntegrationDetailPage from '@/pages/admin/integrations/IntegrationDetailPage.jsx';
import WorkflowBuilder from '@/pages/admin/workflows/WorkflowBuilder.jsx';
import CreateEditWorkflowPage from '@/pages/admin/workflows/CreateEditWorkflowPage.jsx';

// Demo Flows
import AdminDemoFlow from '@/components/AdminDemoFlow.jsx';
import EndUserDemoFlow from '@/components/EndUserDemoFlow.jsx';

function App() {
  return (
    <Router>
      <AuthProvider>
        <DemoProvider>
          <div className="min-h-screen flex flex-col">
            <ScrollToTop />
            <DemoModeIndicator />
            <Header />
            <main className="flex-1">
              <Routes>
                {/* Public Routes */}
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/programs" element={<ProgramLibraryPage />} />
                <Route path="/programs/:id" element={<ProgramDetailsPage />} />

                {/* Demo Routes */}
                <Route path="/admin-demo" element={<AdminDemoFlow />} />
                <Route path="/end-user-demo" element={<EndUserDemoFlow />} />

                {/* Protected User Routes */}
                <Route
                  path="/"
                  element={
                    <ProtectedRoute>
                      <DashboardPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/mission"
                  element={
                    <ProtectedRoute>
                      <MissionWorkspacePage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/progress"
                  element={
                    <ProtectedRoute>
                      <ProgressTrackerPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/settings"
                  element={
                    <ProtectedRoute>
                      <div className="container mx-auto px-4 py-12">
                        <h1 className="text-3xl font-bold mb-4">Settings</h1>
                        <p className="text-muted-foreground">Settings page coming soon...</p>
                      </div>
                    </ProtectedRoute>
                  }
                />

                {/* Admin Routes */}
                <Route path="/admin/*" element={
                  <AdminRoute>
                    <AdminLayout>
                      <Routes>
                        <Route path="/" element={<AdminDashboard />} />
                        <Route path="/programs" element={<ProgramList />} />
                        <Route path="/programs/new" element={<ProgramEditor />} />
                        <Route path="/programs/:id/edit" element={<ProgramEditor />} />
                        <Route path="/missions/new" element={<MissionEditor />} />
                        <Route path="/missions/:id/edit" element={<MissionEditor />} />
                        <Route path="/organizations" element={<OrganizationManagement />} />
                        <Route path="/organizations/:id" element={<OrganizationDetails />} />
                        <Route path="/users" element={<UserManagementTable />} />
                        <Route path="/settings" element={<AdminSettings />} />
                        <Route path="/integrations" element={<IntegrationsHub />} />
                        <Route path="/integrations/:id" element={<IntegrationDetailPage />} />
                        <Route path="/workflows" element={<WorkflowBuilder />} />
                        <Route path="/workflows/create" element={<CreateEditWorkflowPage />} />
                        <Route path="/workflows/:id/edit" element={<CreateEditWorkflowPage />} />
                      </Routes>
                    </AdminLayout>
                  </AdminRoute>
                } />

                {/* 404 Route */}
                <Route
                  path="*"
                  element={
                    <div className="min-h-screen flex items-center justify-center">
                      <div className="text-center">
                        <h1 className="text-6xl font-bold text-foreground mb-4">404</h1>
                        <p className="text-muted-foreground mb-6">Page not found</p>
                        <a href="/" className="text-primary hover:underline">
                          Back to home
                        </a>
                      </div>
                    </div>
                  }
                />
              </Routes>
            </main>
            <Routes>
              <Route path="/admin/*" element={null} />
              <Route path="/admin-demo" element={null} />
              <Route path="/" element={null} />
              <Route path="*" element={<Footer />} />
            </Routes>
            <Toaster />
          </div>
        </DemoProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
