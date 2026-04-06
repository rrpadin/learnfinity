
import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext.jsx';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { 
  LayoutDashboard, 
  BookOpen, 
  Users, 
  Building2,
  LogOut, 
  ArrowLeft, 
  Menu,
  Sparkles,
  PlayCircle
} from 'lucide-react';
import DemoSelectionModal from '@/components/DemoSelectionModal.jsx';

function AdminLayout({ children }) {
  const { currentUser, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);

  const navItems = [
    { name: 'Dashboard', path: '/admin', icon: LayoutDashboard },
    { name: 'Programs', path: '/admin/programs', icon: BookOpen },
    { name: 'Organizations', path: '/admin/organizations', icon: Building2 },
    { name: 'Users', path: '/admin/users', icon: Users },
  ];

  const isActive = (path) => {
    if (path === '/admin') return location.pathname === '/admin';
    return location.pathname.startsWith(path);
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-[hsl(var(--admin-sidebar))] text-[hsl(var(--admin-sidebar-text))]">
      <div className="p-6 border-b border-white/10">
        <div className="flex items-center gap-2 mb-6">
          <Sparkles className="w-6 h-6 text-primary" />
          <span className="font-bold text-xl tracking-tight">Admin Panel</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center text-primary font-bold">
            {currentUser?.name?.charAt(0) || 'A'}
          </div>
          <div className="overflow-hidden">
            <p className="text-sm font-medium truncate">{currentUser?.name || 'Admin'}</p>
            <p className="text-xs text-white/60 truncate">{currentUser?.email}</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path);
          return (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setIsMobileOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                active 
                  ? 'bg-primary text-primary-foreground font-medium' 
                  : 'text-white/70 hover:bg-[hsl(var(--admin-sidebar-hover))] hover:text-white'
              }`}
            >
              <Icon className="w-5 h-5" />
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-white/10 space-y-2">
        <Button 
          variant="ghost" 
          className="w-full justify-start text-white/70 hover:text-white hover:bg-[hsl(var(--admin-sidebar-hover))]"
          onClick={() => navigate('/')}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Platform
        </Button>
        <Button 
          variant="ghost" 
          className="w-full justify-start text-red-400 hover:text-red-300 hover:bg-red-400/10"
          onClick={logout}
        >
          <LogOut className="w-4 h-4 mr-2" />
          Logout
        </Button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[hsl(var(--admin-bg))] flex">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-64 flex-col fixed inset-y-0 z-50">
        <SidebarContent />
      </aside>

      {/* Mobile Header & Sidebar */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-[hsl(var(--admin-sidebar))] border-b border-white/10 flex items-center justify-between px-4 z-50">
        <div className="flex items-center gap-2 text-white">
          <Sparkles className="w-5 h-5 text-primary" />
          <span className="font-bold">Admin Panel</span>
        </div>
        <Sheet open={isMobileOpen} onOpenChange={setIsMobileOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
              <Menu className="w-6 h-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 w-72 border-r-0">
            <SidebarContent />
          </SheetContent>
        </Sheet>
      </div>

      {/* Main Content */}
      <main className="flex-1 md:ml-64 pt-16 md:pt-0 min-h-screen flex flex-col">
        {/* Top Header Area for Demo Button */}
        <div className="h-16 border-b border-border bg-card flex items-center justify-end px-6 md:px-8">
          <Button 
            onClick={() => setIsDemoModalOpen(true)}
            className="bg-[hsl(var(--demo-primary))] hover:bg-[hsl(var(--demo-primary))]/90 text-white"
          >
            <PlayCircle className="w-4 h-4 mr-2" />
            Launch Demo
          </Button>
        </div>
        
        <div className="p-6 md:p-8 max-w-7xl mx-auto w-full flex-1">
          {children}
        </div>
      </main>

      <DemoSelectionModal 
        isOpen={isDemoModalOpen} 
        onOpenChange={setIsDemoModalOpen} 
      />
    </div>
  );
}

export default AdminLayout;
