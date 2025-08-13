"use client";

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useRouter } from 'next/navigation';

interface Admin {
  id: string;
  username: string;
  email: string;
  role: string;
}

interface AdminAuthContextType {
  admin: Admin | null;
  token: string | null;
  isLoading: boolean;
  login: (admin: Admin, token: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

export const useAdminAuth = () => {
  const ctx = useContext(AdminAuthContext);
  if (!ctx) throw new Error('useAdminAuth must be used within AdminAuthProvider');
  return ctx;
};

export const AdminAuthProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const [admin, setAdmin] = useState<Admin | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const t = localStorage.getItem('cfa_admin_token');
    const a = localStorage.getItem('cfa_admin');
    if (t && a) {
      try {
        setToken(t);
        setAdmin(JSON.parse(a));
      } catch {
        localStorage.removeItem('cfa_admin_token');
        localStorage.removeItem('cfa_admin');
      }
    }
    setIsLoading(false);
  }, []);

  const login = (adm: Admin, t: string) => {
    setAdmin(adm);
    setToken(t);
    localStorage.setItem('cfa_admin_token', t);
    localStorage.setItem('cfa_admin', JSON.stringify(adm));
  };

  const logout = () => {
    setAdmin(null);
    setToken(null);
    localStorage.removeItem('cfa_admin_token');
    localStorage.removeItem('cfa_admin');
    router.push('/admin/login');
  };

  return (
    <AdminAuthContext.Provider value={{ admin, token, isLoading, login, logout, isAuthenticated: !!admin && !!token }}>
      {children}
    </AdminAuthContext.Provider>
  );
};

