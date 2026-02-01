/**
 * Fashion AI - Auth Context
 * 
 * Context quản lý authentication state
 */

'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useProfile } from '@/hooks/use-user';
import type { User } from '@/types/api';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isReady, setIsReady] = useState(false);
  const queryClient = useQueryClient();

  // Check if we have a token
  useEffect(() => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;
    setIsReady(true);
    
    // If no token, don't try to fetch profile
    if (!token) {
      queryClient.setQueryData(['user'], null);
    }
  }, [queryClient]);

  // Fetch user profile if token exists
  const { data: user, isLoading: profileLoading, error } = useProfile();

  // Handle auth error - clear tokens
  useEffect(() => {
    if (error) {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      queryClient.setQueryData(['user'], null);
    }
  }, [error, queryClient]);

  const hasToken = typeof window !== 'undefined' && !!localStorage.getItem('accessToken');
  const isLoading = !isReady || (hasToken && profileLoading);
  const isAuthenticated = !!user && !error;
  const isAdmin = user?.role === 'ADMIN';

  return (
    <AuthContext.Provider 
      value={{ 
        user: user ?? null, 
        isLoading, 
        isAuthenticated,
        isAdmin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
