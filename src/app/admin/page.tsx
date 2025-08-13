"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { AdminAuthProvider, useAdminAuth } from '@/app/contexts/AdminAuthContext';
import { adminService, AdminDashboard } from '@/app/services/adminService';
import AdminNavbar from './components/AdminNavbar';
import { Users, FileText, ArrowRight } from 'lucide-react';
import styled from 'styled-components';

const Page = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
`;

const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem 1rem;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 3rem;
`;

const Heading = styled.h1`
  font-size: 2.5rem;
  font-weight: 800;
  color: white;
  margin: 0 0 1rem 0;
  text-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

const Subtitle = styled.p`
  font-size: 1.1rem;
  color: rgba(255, 255, 255, 0.8);
  margin: 0;
`;

const QuickActions = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-bottom: 3rem;
`;

const ActionCard = styled(Link)`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 1rem;
  padding: 2rem;
  text-decoration: none;
  transition: all 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.2);
  display: flex;
  align-items: center;
  gap: 1rem;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 32px rgba(0,0,0,0.15);
    background: white;
  }
`;

const ActionIcon = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 1rem;
  background: linear-gradient(135deg, #667eea, #764ba2);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  flex-shrink: 0;
`;

const ActionContent = styled.div`
  flex: 1;
`;

const ActionTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 700;
  color: #111827;
  margin: 0 0 0.5rem 0;
`;

const ActionDescription = styled.p`
  color: #6b7280;
  margin: 0;
  font-size: 0.95rem;
`;

const ActionArrow = styled.div`
  color: #6b7280;
  transition: all 0.3s ease;
  
  ${ActionCard}:hover & {
    color: #667eea;
    transform: translateX(4px);
  }
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
`;

const Card = styled.div`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 1rem;
  padding: 1.5rem;
  box-shadow: 0 8px 32px rgba(0,0,0,0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
`;

const CardTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: 700;
  color: #111827;
  margin: 0 0 1rem 0;
`;

const Stat = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0.75rem 0;
  padding: 0.5rem 0;
  border-bottom: 1px solid #f3f4f6;
  
  &:last-child {
    border-bottom: none;
  }
`;

const StatLabel = styled.span`
  color: #6b7280;
  font-size: 0.9rem;
`;

const StatValue = styled.strong`
  color: #111827;
  font-size: 1rem;
`;

const ListItem = styled.div`
  margin: 0.75rem 0;
  padding: 0.75rem 0;
  border-bottom: 1px solid #f3f4f6;
  
  &:last-child {
    border-bottom: none;
  }
`;

const ListItemTitle = styled.div`
  font-weight: 600;
  color: #111827;
  font-size: 0.95rem;
`;

const ListItemSubtitle = styled.div`
  color: #6b7280;
  font-size: 0.85rem;
  margin-top: 0.25rem;
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
    <>
      <AdminNavbar />
      <Page>
        <Container>
          <Header>
            <Heading>Admin Dashboard</Heading>
            <Subtitle>Manage users and media content</Subtitle>
          </Header>

          <QuickActions>
            <ActionCard href="/admin/users">
              <ActionIcon>
                <Users size={24} />
              </ActionIcon>
              <ActionContent>
                <ActionTitle>Manage Users</ActionTitle>
                <ActionDescription>View, edit, and manage user accounts and subscriptions</ActionDescription>
              </ActionContent>
              <ActionArrow>
                <ArrowRight size={20} />
              </ActionArrow>
            </ActionCard>



            <ActionCard href="/admin/media">
              <ActionIcon>
                <FileText size={24} />
              </ActionIcon>
              <ActionContent>
                <ActionTitle>Media Management</ActionTitle>
                <ActionDescription>Upload images and videos directly to AWS S3</ActionDescription>
              </ActionContent>
              <ActionArrow>
                <ArrowRight size={20} />
              </ActionArrow>
            </ActionCard>
          </QuickActions>

          {error && (
            <Card style={{ background: '#fef2f2', border: '1px solid #fecaca', color: '#991b1b', marginBottom: '2rem' }}>
              {error}
            </Card>
          )}

          {data && (
            <StatsGrid>
              <Card>
                <CardTitle>System Statistics</CardTitle>
                <Stat>
                  <StatLabel>Total Users</StatLabel>
                  <StatValue>{data.stats.totalUsers}</StatValue>
                </Stat>
                <Stat>
                  <StatLabel>Active Subscriptions</StatLabel>
                  <StatValue>{data.stats.activeSubscriptions}</StatValue>
                </Stat>
                <Stat>
                  <StatLabel>Total Payments</StatLabel>
                  <StatValue>{data.stats.totalPayments}</StatValue>
                </Stat>
                <Stat>
                  <StatLabel>Total Revenue</StatLabel>
                  <StatValue>₹{data.stats.totalRevenue}</StatValue>
                </Stat>
              </Card>

              <Card>
                <CardTitle>Recent Users</CardTitle>
                {data.recentUsers && data.recentUsers.length > 0 ? (
                  data.recentUsers.map((u, i) => (
                    <ListItem key={i}>
                      <ListItemTitle>{u.fullName || 'Unknown User'}</ListItemTitle>
                      <ListItemSubtitle>{u.email || 'No email'} • {u.customerId || 'No ID'}</ListItemSubtitle>
                    </ListItem>
                  ))
                ) : (
                  <ListItem>
                    <ListItemTitle>No recent users</ListItemTitle>
                  </ListItem>
                )}
              </Card>

              <Card>
                <CardTitle>Recent Payments</CardTitle>
                {data.recentPayments && data.recentPayments.length > 0 ? (
                  data.recentPayments.map((p, i) => (
                    <ListItem key={i}>
                      <ListItemTitle>₹{p.amount || 0} — {p.status || 'Unknown'}</ListItemTitle>
                      <ListItemSubtitle>
                        {p.userId?.fullName || 'Unknown User'} • {p.subscriptionId?.planName || 'Unknown Plan'}
                      </ListItemSubtitle>
                    </ListItem>
                  ))
                ) : (
                  <ListItem>
                    <ListItemTitle>No recent payments</ListItemTitle>
                  </ListItem>
                )}
              </Card>

              <Card>
                <CardTitle>Media Statistics</CardTitle>
                {data.mediaStats && data.mediaStats.length > 0 ? (
                  data.mediaStats.map((m, i) => (
                    <Stat key={i}>
                      <StatLabel>{m._id || 'Unknown Type'}</StatLabel>
                      <StatValue>{m.count || 0}</StatValue>
                    </Stat>
                  ))
                ) : (
                  <Stat>
                    <StatLabel>No media data</StatLabel>
                    <StatValue>0</StatValue>
                  </Stat>
                )}
              </Card>
            </StatsGrid>
          )}
        </Container>
      </Page>
    </>
  );
};

const AdminPage: React.FC = () => (
  <AdminAuthProvider>
    <DashboardInner />
  </AdminAuthProvider>
);

export default AdminPage;

