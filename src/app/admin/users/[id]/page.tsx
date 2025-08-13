"use client";

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { AdminAuthProvider, useAdminAuth } from '@/app/contexts/AdminAuthContext';
import { adminService, AdminUserDetailResponse } from '@/app/services/adminService';
import AdminNavbar from '../../components/AdminNavbar';
import { User, CreditCard, Calendar, Mail, Phone, ArrowLeft, CheckCircle, XCircle, Clock } from 'lucide-react';
import styled from 'styled-components';

const Page = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
`;

const BackButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 0.75rem;
  color: white;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: translateX(-2px);
  }
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 800;
  color: white;
  margin: 0;
  text-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  
  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled.div`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 1rem;
  padding: 2rem;
  box-shadow: 0 8px 32px rgba(0,0,0,0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
`;

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid #f3f4f6;
`;

const CardIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 0.75rem;
  background: linear-gradient(135deg, #667eea, #764ba2);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
`;

const CardTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 700;
  color: #111827;
  margin: 0;
`;

const InfoGrid = styled.div`
  display: grid;
  gap: 1.5rem;
`;

const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background: #f8fafc;
  border-radius: 0.75rem;
  border-left: 4px solid #667eea;
`;

const InfoLabel = styled.span`
  font-size: 0.9rem;
  font-weight: 600;
  color: #6b7280;
`;

const InfoValue = styled.span`
  font-size: 1rem;
  font-weight: 600;
  color: #111827;
`;

const StatusBadge = styled.span<{ status: string }>`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 9999px;
  font-size: 0.875rem;
  font-weight: 600;
  
  ${props => {
    switch (props.status) {
      case 'active':
        return `
          background: #dcfce7;
          color: #166534;
        `;
      case 'expired':
        return `
          background: #fef2f2;
          color: #991b1b;
        `;
      case 'inactive':
        return `
          background: #f3f4f6;
          color: #6b7280;
        `;
      default:
        return `
          background: #fef3c7;
          color: #92400e;
        `;
    }
  }}
`;

const PaymentsList = styled.div`
  max-height: 400px;
  overflow-y: auto;
`;

const PaymentItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border-bottom: 1px solid #e5e7eb;
  
  &:last-child {
    border-bottom: none;
  }
  
  &:hover {
    background: #f8fafc;
  }
`;

const PaymentAmount = styled.div`
  font-size: 1.1rem;
  font-weight: 700;
  color: #111827;
`;

const PaymentStatus = styled.span<{ status: string }>`
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 600;
  
  ${props => {
    switch (props.status) {
      case 'completed':
      case 'success':
        return 'background: #dcfce7; color: #166534;';
      case 'failed':
        return 'background: #fef2f2; color: #991b1b;';
      case 'pending':
        return 'background: #fef3c7; color: #92400e;';
      default:
        return 'background: #f3f4f6; color: #6b7280;';
    }
  }}
`;

const PaymentDate = styled.div`
  font-size: 0.875rem;
  color: #6b7280;
`;

const ErrorMessage = styled.div`
  background: #fef2f2;
  border: 1px solid #fecaca;
  color: #991b1b;
  padding: 1rem;
  border-radius: 0.75rem;
  margin-bottom: 2rem;
  text-align: center;
`;

const LoadingSpinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 200px;
  
  &::after {
    content: '';
    width: 40px;
    height: 40px;
    border: 4px solid #f3f4f6;
    border-top: 4px solid #667eea;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'active':
      return <CheckCircle size={16} />;
    case 'expired':
      return <XCircle size={16} />;
    case 'inactive':
      return <XCircle size={16} />;
    default:
      return <Clock size={16} />;
  }
};

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0
  }).format(amount);
};

const UserDetailInner: React.FC = () => {
  const router = useRouter();
  const params = useParams();
  const { isAuthenticated, isLoading } = useAdminAuth();
  const [data, setData] = useState<AdminUserDetailResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const id = (params?.id as string) || '';

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace('/admin/login');
    }
  }, [isLoading, isAuthenticated, router]);

  useEffect(() => {
    const loadUserData = async () => {
      if (!isAuthenticated || !id) return;
      
      setLoading(true);
      setError('');
      try {
        const response = await adminService.getUser(id);
        setData(response);
      } catch (e: any) {
        setError(e.response?.data?.message || 'Failed to load user details');
      } finally {
        setLoading(false);
      }
    };

    loadUserData();
  }, [isAuthenticated, id]);

  if (isLoading || !isAuthenticated) return null;

  if (loading) {
    return (
      <>
        <AdminNavbar />
        <Page>
          <Container>
            <LoadingSpinner />
          </Container>
        </Page>
      </>
    );
  }

  return (
    <>
      <AdminNavbar />
      <Page>
        <Container>
          <Header>
            <BackButton onClick={() => router.push('/admin/users')}>
              <ArrowLeft size={16} />
              Back to Users
            </BackButton>
            <Title>User Details</Title>
          </Header>

          {error && <ErrorMessage>{error}</ErrorMessage>}

          {data && (
            <Grid>
              {/* User Information */}
              <Card>
                <CardHeader>
                  <CardIcon>
                    <User size={20} />
                  </CardIcon>
                  <CardTitle>User Information</CardTitle>
                </CardHeader>

                <InfoGrid>
                  <InfoRow>
                    <InfoLabel>Full Name</InfoLabel>
                    <InfoValue>{data.user.fullName}</InfoValue>
                  </InfoRow>
                  
                  <InfoRow>
                    <InfoLabel>Email Address</InfoLabel>
                    <InfoValue>{data.user.email}</InfoValue>
                  </InfoRow>
                  
                  <InfoRow>
                    <InfoLabel>Mobile Number</InfoLabel>
                    <InfoValue>{data.user.mobile || 'Not provided'}</InfoValue>
                  </InfoRow>
                  
                  <InfoRow>
                    <InfoLabel>Customer ID</InfoLabel>
                    <InfoValue>{data.user.customerId}</InfoValue>
                  </InfoRow>

                  {data.user.additionalMembers && data.user.additionalMembers.length > 0 && (
                    <div>
                      <InfoLabel style={{ display: 'block', marginBottom: '0.5rem' }}>
                        Additional Members ({data.user.additionalMembers.length})
                      </InfoLabel>
                      {data.user.additionalMembers.map((member, index) => (
                        <InfoRow key={index} style={{ marginBottom: '0.5rem' }}>
                          <InfoLabel>{member.name}</InfoLabel>
                          <InfoValue>{member.email}</InfoValue>
                        </InfoRow>
                      ))}
                    </div>
                  )}
                </InfoGrid>
              </Card>

              {/* Subscription Information */}
              <Card>
                <CardHeader>
                  <CardIcon>
                    <CreditCard size={20} />
                  </CardIcon>
                  <CardTitle>Subscription Details</CardTitle>
                </CardHeader>

                {data.user.subscription ? (
                  <InfoGrid>
                    <InfoRow>
                      <InfoLabel>Plan Name</InfoLabel>
                      <InfoValue>{data.user.subscription.planName}</InfoValue>
                    </InfoRow>
                    
                    <InfoRow>
                      <InfoLabel>Status</InfoLabel>
                      <StatusBadge status={data.user.subscription.status}>
                        {getStatusIcon(data.user.subscription.status)}
                        {data.user.subscription.status.charAt(0).toUpperCase() + data.user.subscription.status.slice(1)}
                      </StatusBadge>
                    </InfoRow>
                    
                    <InfoRow>
                      <InfoLabel>Amount</InfoLabel>
                      <InfoValue>{formatCurrency(data.user.subscription.amount)}</InfoValue>
                    </InfoRow>
                    
                    <InfoRow>
                      <InfoLabel>Start Date</InfoLabel>
                      <InfoValue>{formatDate(data.user.subscription.startDate)}</InfoValue>
                    </InfoRow>
                    
                    <InfoRow>
                      <InfoLabel>End Date</InfoLabel>
                      <InfoValue>{formatDate(data.user.subscription.endDate)}</InfoValue>
                    </InfoRow>
                  </InfoGrid>
                ) : (
                  <div style={{ textAlign: 'center', padding: '2rem', color: '#6b7280' }}>
                    <CreditCard size={48} style={{ margin: '0 auto 1rem', opacity: 0.5 }} />
                    <p>No active subscription found</p>
                  </div>
                )}
              </Card>

              {/* Payment History */}
              <Card style={{ gridColumn: '1 / -1' }}>
                <CardHeader>
                  <CardIcon>
                    <Calendar size={20} />
                  </CardIcon>
                  <CardTitle>Payment History ({data.payments.length})</CardTitle>
                </CardHeader>

                {data.payments.length > 0 ? (
                  <PaymentsList>
                    {data.payments.map((payment) => (
                      <PaymentItem key={payment._id}>
                        <div>
                          <PaymentAmount>{formatCurrency(payment.amount)}</PaymentAmount>
                          <div style={{ fontSize: '0.875rem', color: '#6b7280', marginTop: '0.25rem' }}>
                            {payment.subscriptionId?.planName || 'Unknown Plan'}
                          </div>
                        </div>
                        
                        <div style={{ textAlign: 'right' }}>
                          <PaymentStatus status={payment.status}>
                            {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                          </PaymentStatus>
                          <PaymentDate style={{ marginTop: '0.25rem' }}>
                            {formatDate(payment.createdAt)}
                          </PaymentDate>
                        </div>
                      </PaymentItem>
                    ))}
                  </PaymentsList>
                ) : (
                  <div style={{ textAlign: 'center', padding: '2rem', color: '#6b7280' }}>
                    <Calendar size={48} style={{ margin: '0 auto 1rem', opacity: 0.5 }} />
                    <p>No payment history found</p>
                  </div>
                )}
              </Card>
            </Grid>
          )}
        </Container>
      </Page>
    </>
  );
};

const UserDetailPage: React.FC = () => (
  <AdminAuthProvider>
    <UserDetailInner />
  </AdminAuthProvider>
);

export default UserDetailPage;