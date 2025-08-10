"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { AdminAuthProvider, useAdminAuth } from '@/app/contexts/AdminAuthContext';
import { adminService, AdminDashboard } from '@/app/services/adminService';
import styled from 'styled-components';

const Page = styled.div`
  min-height: 100vh;
  background: #f8fafc;
`;
const Container = styled.div`
  max-width: 1100px; margin: 0 auto; padding: 2rem 1rem;
`;
const Heading = styled.h1`
  font-size: 1.75rem; font-weight: 800; color: #111827; margin: 0 0 1rem 0;
`;
const Grid = styled.div`
  display: grid; grid-template-columns: repeat(2, minmax(0,1fr)); gap: 1rem;
  @media (max-width: 768px) { grid-template-columns: 1fr; }
`;
const Card = styled.div`
  background: #fff; border-radius: 1rem; padding: 1.25rem; box-shadow: 0 8px 20px rgba(0,0,0,0.08);
`;
const Stat = styled.div`
  display: flex; justify-content: space-between; margin: 0.5rem 0; color: #374151;
`;

const DashboardInner: React.FC = () => {
  const router = useRouter();
  const { isAuthenticated, isLoading, admin } = useAdminAuth();
  const [data, setData] = useState<AdminDashboard | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!isLoading && !isAuthenticated) router.replace('/admin/login');
  }, [isLoading, isAuthenticated, router]);

  useEffect(() => {
    const run = async () => {
      try {
        const d = await adminService.dashboard();
        setData(d);
      } catch (e: any) {
        setError(e.response?.data?.message || 'Failed to load');
      }
    };
    if (isAuthenticated) run();
  }, [isAuthenticated]);

  if (isLoading || !isAuthenticated) return null;

  return (
    <Page>
      <Container>
        <Heading>Admin Dashboard</Heading>
        {error && <Card>{error}</Card>}
        {data && (
          <Grid>
            <Card>
              <h3>Stats</h3>
              <Stat><span>Total Users</span><strong>{data.stats.totalUsers}</strong></Stat>
              <Stat><span>Active Subscriptions</span><strong>{data.stats.activeSubscriptions}</strong></Stat>
              <Stat><span>Total Payments</span><strong>{data.stats.totalPayments}</strong></Stat>
              <Stat><span>Total Revenue</span><strong>₹{data.stats.totalRevenue}</strong></Stat>
            </Card>
            <Card>
              <h3>Recent Users</h3>
              {data.recentUsers.map((u, i) => (
                <div key={i} style={{margin: '0.5rem 0'}}>
                  <div style={{fontWeight:700}}>{u.fullName}</div>
                  <div style={{color:'#6b7280'}}>{u.email}</div>
                </div>
              ))}
            </Card>
            <Card>
              <h3>Recent Payments</h3>
              {data.recentPayments.map((p, i) => (
                <div key={i} style={{margin: '0.5rem 0'}}>
                  <div style={{fontWeight:700}}>₹{p.amount} — {p.status}</div>
                  <div style={{color:'#6b7280'}}>{p.userId.fullName} • {p.subscriptionId.planName}</div>
                </div>
              ))}
            </Card>
            <Card>
              <h3>Media Stats</h3>
              {data.mediaStats.map((m, i) => (
                <div key={i} style={{display:'flex', justifyContent:'space-between', margin:'0.5rem 0'}}>
                  <span>{m._id}</span>
                  <strong>{m.count}</strong>
                </div>
              ))}
            </Card>
          </Grid>
        )}
      </Container>
    </Page>
  );
};

const AdminPage: React.FC = () => (
  <AdminAuthProvider>
    <DashboardInner />
  </AdminAuthProvider>
);

export default AdminPage;

