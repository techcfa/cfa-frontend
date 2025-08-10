"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { adminService } from '@/app/services/adminService';
import { AdminAuthProvider, useAdminAuth } from '@/app/contexts/AdminAuthContext';
import * as S from './AdminLoginStyles';

const LoginInner: React.FC = () => {
  const router = useRouter();
  const { login } = useAdminAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      setLoading(true);
      const resp = await adminService.login({ email, password });
      login(resp.admin, resp.token);
      router.push('/admin');
    } catch (e: any) {
      setError(e.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <S.Page>
      <S.Card>
        <S.Title>Admin Login</S.Title>
        <S.Sub>Sign in to manage users, subscriptions and media</S.Sub>
        {error && <S.Error>{error}</S.Error>}
        <form onSubmit={handleSubmit}>
          <S.Field>
            <S.Label>Email</S.Label>
            <S.InputWrap>
              <S.Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="admin@admin.com" />
            </S.InputWrap>
          </S.Field>
          <S.Field>
            <S.Label>Password</S.Label>
            <S.InputWrap>
              <S.Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" />
            </S.InputWrap>
          </S.Field>
          <S.Button type="submit" disabled={loading}>{loading ? 'Signing in…' : 'Sign In'}</S.Button>
        </form>
      </S.Card>
    </S.Page>
  );
};

const AdminLoginPage: React.FC = () => (
  <AdminAuthProvider>
    <LoginInner />
  </AdminAuthProvider>
);

export default AdminLoginPage;

