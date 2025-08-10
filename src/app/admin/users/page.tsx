"use client";

import React, { useEffect, useState } from 'react';
import { AdminAuthProvider, useAdminAuth } from '@/app/contexts/AdminAuthContext';
import { adminService, AdminUserListResponse } from '@/app/services/adminService';
import styled from 'styled-components';

const Page = styled.div`min-height:100vh;background:#f8fafc;`;
const Container = styled.div`max-width:1100px;margin:0 auto;padding:2rem 1rem;`;
const Title = styled.h1`font-size:1.5rem;font-weight:800;color:#111827;margin:0 0 1rem 0;`;
const Controls = styled.div`display:flex;gap:0.5rem;margin-bottom:1rem;`;
const Input = styled.input`border:1px solid #e5e7eb;border-radius:0.5rem;padding:0.5rem 0.75rem;flex:1;`;
const Select = styled.select`border:1px solid #e5e7eb;border-radius:0.5rem;padding:0.5rem 0.75rem;`;
const Button = styled.button`border:none;border-radius:0.5rem;padding:0.5rem 0.9rem;background:#2563eb;color:#fff;font-weight:700;`;
const Table = styled.table`width:100%;background:#fff;border-radius:0.75rem;overflow:hidden;box-shadow:0 8px 20px rgba(0,0,0,0.08);`;
const Th = styled.th`text-align:left;padding:0.75rem 1rem;background:#f3f4f6;color:#374151;font-weight:700;`;
const Td = styled.td`padding:0.75rem 1rem;border-top:1px solid #e5e7eb;`;
const Pagination = styled.div`display:flex;justify-content:space-between;align-items:center;margin-top:1rem;`;

const UsersInner: React.FC = () => {
  const { isAuthenticated, isLoading } = useAdminAuth();
  const [data, setData] = useState<AdminUserListResponse | null>(null);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState<'active'|'inactive'|'expired'|''>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const load = async () => {
    setLoading(true); setError('');
    try {
      const res = await adminService.listUsers({ page, limit: 20, search: search || undefined, status: (status || undefined) as any });
      setData(res);
    } catch (e: any) {
      setError(e.response?.data?.message || 'Failed to load users');
    } finally { setLoading(false); }
  };

  useEffect(() => { if (isAuthenticated) load(); }, [isAuthenticated, page, status]);

  if (isLoading || !isAuthenticated) return null;

  return (
    <Page>
      <Container>
        <Title>Users</Title>
        <Controls>
          <Input placeholder="Search name/email" value={search} onChange={(e)=>setSearch(e.target.value)} />
          <Select value={status} onChange={(e)=>setStatus(e.target.value as any)}>
            <option value="">All</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="expired">Expired</option>
          </Select>
          <Button onClick={()=>{ setPage(1); load(); }} disabled={loading}>Search</Button>
        </Controls>
        {error && <div style={{marginBottom:'1rem',color:'#b91c1c'}}>{error}</div>}
        <Table>
          <thead>
            <tr>
              <Th>Name</Th>
              <Th>Email</Th>
              <Th>Customer ID</Th>
              <Th>Subscription</Th>
              <Th>Created</Th>
              <Th>Action</Th>
            </tr>
          </thead>
          <tbody>
            {data?.users.map((u)=> (
              <tr key={u._id}>
                <Td>{u.fullName}</Td>
                <Td>{u.email}</Td>
                <Td>{u.customerId}</Td>
                <Td>{u.subscription?.status || '-'}</Td>
                <Td>{new Date(u.createdAt).toLocaleDateString()}</Td>
                <Td><a href={`/admin/users/${u._id}`} style={{color:'#2563eb',fontWeight:700}}>View</a></Td>
              </tr>
            ))}
            {(!data || data.users.length===0) && (
              <tr><Td colSpan={6}>No users found</Td></tr>
            )}
          </tbody>
        </Table>
        <Pagination>
          <Button disabled={page<=1 || loading} onClick={()=>setPage((p)=>p-1)}>Prev</Button>
          <div>Page {data?.currentPage || page} of {data?.totalPages || 1}</div>
          <Button disabled={(data && page>=data.totalPages) || loading} onClick={()=>setPage((p)=>p+1)}>Next</Button>
        </Pagination>
      </Container>
    </Page>
  );
};

const UsersPage: React.FC = () => (
  <AdminAuthProvider>
    <UsersInner />
  </AdminAuthProvider>
);

export default UsersPage;

