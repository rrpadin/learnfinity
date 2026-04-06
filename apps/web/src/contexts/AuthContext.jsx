
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import pb from '@/lib/pocketbaseClient';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [initialLoading, setInitialLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (pb.authStore.isValid && pb.authStore.model) {
      setCurrentUser(pb.authStore.model);
    }
    setInitialLoading(false);

    const unsubscribe = pb.authStore.onChange((token, model) => {
      setCurrentUser(model);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const login = async (email, password) => {
    try {
      const authData = await pb.collection('users').authWithPassword(email, password, { $autoCancel: false });
      setCurrentUser(authData.record);
      return { success: true, user: authData.record };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: error.message || 'Login failed. Please check your credentials.' };
    }
  };

  const signup = async (email, name, password, passwordConfirm) => {
    try {
      const user = await pb.collection('users').create({
        email,
        name,
        password,
        passwordConfirm,
        emailVisibility: true,
        role: 'user',
        is_admin: false
      }, { $autoCancel: false });

      const authData = await pb.collection('users').authWithPassword(email, password, { $autoCancel: false });
      setCurrentUser(authData.record);
      
      return { success: true, user: authData.record };
    } catch (error) {
      console.error('Signup error:', error);
      return { success: false, error: error.message || 'Signup failed. Please try again.' };
    }
  };

  const logout = () => {
    pb.authStore.clear();
    setCurrentUser(null);
    navigate('/login');
  };

  const checkAdminStatus = () => {
    return currentUser?.is_admin === true || currentUser?.role === 'admin';
  };

  const value = {
    currentUser,
    isAuthenticated: !!currentUser,
    isAdmin: checkAdminStatus(),
    initialLoading,
    login,
    signup,
    logout,
    checkAdminStatus
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export function useAdmin() {
  const { isAdmin, checkAdminStatus } = useAuth();
  return { isAdmin, checkAdminStatus };
}
