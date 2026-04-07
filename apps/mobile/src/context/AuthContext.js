import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { login as loginRequest, logout as logoutRequest, signup as signupRequest } from '../lib/auth';
import { bootstrapAuth, pb } from '../lib/pocketbase';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    let active = true;

    async function init() {
      await bootstrapAuth();

      if (!active) {
        return;
      }

      setCurrentUser(pb.authStore.model);
      setInitializing(false);
    }

    init();

    const unsubscribe = pb.authStore.onChange((_token, model) => {
      if (active) {
        setCurrentUser(model);
      }
    });

    return () => {
      active = false;
      unsubscribe();
    };
  }, []);

  const value = useMemo(
    () => ({
      currentUser,
      initializing,
      isAuthenticated: Boolean(currentUser),
      isAdmin: currentUser?.is_admin === true || currentUser?.role === 'admin',
      login: loginRequest,
      signup: signupRequest,
      logout: logoutRequest,
    }),
    [currentUser, initializing]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }

  return context;
}
