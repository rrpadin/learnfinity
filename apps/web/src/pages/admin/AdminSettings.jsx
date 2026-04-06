
import React from 'react';
import { Helmet } from 'react-helmet';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import GeneralSettingsTab from './settings/GeneralSettingsTab.jsx';
import AIProviderConfigTab from './settings/AIProviderConfigTab.jsx';
import EmailConfigTab from './settings/EmailConfigTab.jsx';
import FeatureFlagsTab from './settings/FeatureFlagsTab.jsx';
import SecuritySettingsTab from './settings/SecuritySettingsTab.jsx';
import { Settings, Cpu, Mail, ToggleLeft, Shield } from 'lucide-react';

export default function AdminSettings() {
  return (
    <>
      <Helmet>
        <title>Platform Settings - Admin</title>
      </Helmet>

      <div className="space-y-6 max-w-5xl mx-auto pb-20">
        <div>
          <h1 className="text-3xl font-bold text-[hsl(var(--admin-text))] tracking-tight">Platform Settings</h1>
          <p className="text-[hsl(var(--admin-muted))] mt-1">Configure global platform behavior, integrations, and security.</p>
        </div>

        <Tabs defaultValue="general" className="w-full">
          <TabsList className="w-full justify-start bg-[hsl(var(--admin-card))] border border-[hsl(var(--admin-border))] p-1 h-auto flex-wrap gap-1">
            <TabsTrigger value="general" className="gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Settings className="w-4 h-4" /> General
            </TabsTrigger>
            <TabsTrigger value="ai" className="gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Cpu className="w-4 h-4" /> AI Provider
            </TabsTrigger>
            <TabsTrigger value="email" className="gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Mail className="w-4 h-4" /> Email
            </TabsTrigger>
            <TabsTrigger value="features" className="gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <ToggleLeft className="w-4 h-4" /> Feature Flags
            </TabsTrigger>
            <TabsTrigger value="security" className="gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Shield className="w-4 h-4" /> Security
            </TabsTrigger>
          </TabsList>

          <div className="mt-6">
            <TabsContent value="general" className="m-0">
              <GeneralSettingsTab />
            </TabsContent>
            <TabsContent value="ai" className="m-0">
              <AIProviderConfigTab />
            </TabsContent>
            <TabsContent value="email" className="m-0">
              <EmailConfigTab />
            </TabsContent>
            <TabsContent value="features" className="m-0">
              <FeatureFlagsTab />
            </TabsContent>
            <TabsContent value="security" className="m-0">
              <SecuritySettingsTab />
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </>
  );
}
