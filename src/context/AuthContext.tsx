/**
 * Auth Context - Context para gestionar autenticación global
 */

'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, login as loginService, register as registerService, logout as logoutService, getCurrentUser, LoginCredentials, RegisterData } from '@/services/authService';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Cargar usuario al iniciar
    const currentUser = getCurrentUser();
    setUser(currentUser);
    setIsLoading(false);
  }, []);

  const login = async (credentials: LoginCredentials) => {
    const { user } = await loginService(credentials);
    setUser(user);
  };

  const register = async (data: RegisterData) => {
    const { user } = await registerService(data);
    setUser(user);
  };

  const logout = () => {
    logoutService();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
