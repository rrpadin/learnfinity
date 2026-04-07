
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginWithPassword, logoutUser, signupUser } from '@learnfinity/core';
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
      const user = await loginWithPassword(pb, email, password);
      setCurrentUser(user);
      return { success: true, user };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: error.message || 'Login failed. Please check your credentials.' };
    }
  };

  const signup = async (email, name, password, passwordConfirm) => {
    try {
      const user = await signupUser(pb, {
        email,
        name,
        password,
        passwordConfirm,
      });
      setCurrentUser(user);
      
      return { success: true, user };
    } catch (error) {
      console.error('Signup error:', error);
      return { success: false, error: error.message || 'Signup failed. Please try again.' };
    }
  };

  const logout = () => {
    logoutUser(pb);
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
