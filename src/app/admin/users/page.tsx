"use client";

import React, { useEffect, useState } from 'react';
import { AdminAuthProvider, useAdminAuth } from '@/app/contexts/AdminAuthContext';
import { adminService, AdminUserListResponse } from '@/app/services/adminService';
import AdminNavbar from '../components/AdminNavbar';
import styled from 'styled-components';

const Page = styled.div`min-height:100vh;background:linear-gradient(135deg, #667eea 0%, #764ba2 100%);`;
const Container = styled.div`max-width:1100px;margin:0 auto;padding:2rem 1rem;`;
const Title = styled.h1`font-size:2.5rem;font-weight:800;color:white;margin:0 0 2rem 0;text-shadow:0 2px 4px rgba(0,0,0,0.1);text-align:center;`;
const Controls = styled.div`display:flex;align-items:center;margin-bottom:1.5rem;`;
const Select = styled.select`border:2px solid #e5e7eb;border-radius:0.75rem;padding:0.75rem 1rem;font-size:0.9rem;background:white;transition:all 0.3s ease;&:focus{outline:none;border-color:#667eea;box-shadow:0 0 0 3px rgba(102, 126, 234, 0.1);}`;
const Button = styled.button`border:none;border-radius:0.75rem;padding:0.75rem 1rem;background:#667eea;color:white;font-weight:600;cursor:pointer;transition:all 0.3s ease;&:hover{background:#5a67d8;}&:disabled{background:#a5b4fc;cursor:not-allowed;}`;
const Table = styled.table`width:100%;background:#fff;border-radius:0.75rem;overflow:hidden;box-shadow:0 8px 20px rgba(0,0,0,0.08);`;
const Th = styled.th`text-align:left;padding:0.75rem 1rem;background:#f3f4f6;color:#374151;font-weight:700;`;
const Td = styled.td`padding:0.75rem 1rem;border-top:1px solid #e5e7eb;`;
const Pagination = styled.div`display:flex;justify-content:space-between;align-items:center;margin-top:1rem;`;

const UsersInner: React.FC = () => {
  const { isAuthenticated, isLoading } = useAdminAuth();
  const [data, setData] = useState<AdminUserListResponse | null>(null);
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState<'active'|'inactive'|'expired'|''>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const load = async () => {
    setLoading(true); setError('');
    try {
      const res = await adminService.listUsers({ page, limit: 20, status: (status || undefined) as any });
      setData(res);
    } catch (e: any) {
      setError(e.response?.data?.message || 'Failed to load users');
    } finally { setLoading(false); }
  };

  useEffect(() => { if (isAuthenticated) load(); }, [isAuthenticated, page, status]);

  if (isLoading || !isAuthenticated) return null;

  return (
    <>
      <AdminNavbar />
      <Page>
        <Container>
        <Title>Users</Title>
        <Controls>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ fontSize: '0.9rem', fontWeight: '600', color: '#374151' }}>Filter by Status:</span>
            <Select value={status} onChange={(e)=>setStatus(e.target.value as any)}>
              <option value="">All Users</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="expired">Expired</option>
            </Select>
          </div>
        </Controls>
        {error && <div style={{marginBottom:'1rem',color:'#b91c1c'}}>{error}</div>}
        <Table>
          <thead>
            <tr>
              <Th>Name</Th>
              <Th>Email</Th>
              <Th>Mobile</Th>
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
                <Td>{u.mobile || '-'}</Td>
                <Td>{u.customerId}</Td>
                <Td>{u.subscription?.status || '-'}</Td>
                <Td>{new Date(u.createdAt).toLocaleDateString()}</Td>
                <Td><a href={`/admin/users/${u._id}`} style={{color:'#2563eb',fontWeight:700}}>View</a></Td>
              </tr>
            ))}
            {(!data || data.users.length===0) && (
              <tr><Td colSpan={7}>No users found</Td></tr>
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
    </>
  );
};

const UsersPage: React.FC = () => (
  <AdminAuthProvider>
    <UsersInner />
  </AdminAuthProvider>
);

export default UsersPage;

