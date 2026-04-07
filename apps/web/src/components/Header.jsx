
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext.jsx';
import { Button } from '@/components/ui/button';
import { LogOut, Sparkles, ShieldAlert } from 'lucide-react';

function Header() {
  const { isAuthenticated, currentUser, isAdmin, logout } = useAuth();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  // Don't show standard header on admin routes
  if (
    location.pathname.startsWith('/admin') ||
    location.pathname === '/' ||
    location.pathname === '/programs'
  ) {
    return null;
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 font-bold text-xl">
            <Sparkles className="w-6 h-6 text-primary" />
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Learnfinity
            </span>
          </Link>

          {/* Navigation */}
          {isAuthenticated && (
            <nav className="hidden md:flex items-center gap-6">
              <Link
                to="/"
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  isActive('/') ? 'text-primary' : 'text-foreground/80'
                }`}
              >
                Dashboard
              </Link>
              <Link
                to="/programs"
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  isActive('/programs') ? 'text-primary' : 'text-foreground/80'
                }`}
              >
                Programs
              </Link>
              <Link
                to="/mission"
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  isActive('/mission') ? 'text-primary' : 'text-foreground/80'
                }`}
              >
                Today's Mission
              </Link>
              {isAdmin && (
                <Link
                  to="/admin"
                  className="text-sm font-medium text-destructive hover:text-destructive/80 flex items-center gap-1"
                >
                  <ShieldAlert className="w-4 h-4" />
                  Admin Panel
                </Link>
              )}
            </nav>
          )}

          {/* User Actions */}
          <div className="flex items-center gap-4">
            {isAuthenticated ? (
              <>
                <span className="hidden sm:inline text-sm text-muted-foreground">
                  {currentUser?.name || currentUser?.email}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={logout}
                  className="gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="hidden sm:inline">Logout</span>
                </Button>
              </>
            ) : (
              <Link to="/login">
                <Button variant="default" size="sm">
                  Login
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
