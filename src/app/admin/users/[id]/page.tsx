"use client";

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { AdminAuthProvider, useAdminAuth } from '@/app/contexts/AdminAuthContext';
import { adminService, AdminUserDetailResponse, UpdateSubscriptionRequest } from '@/app/services/adminService';
import styled from 'styled-components';

const Page = styled.div`min-height:100vh;background:#f8fafc;`;
const Container = styled.div`max-width:900px;margin:0 auto;padding:2rem 1rem;`;
const Title = styled.h1`font-size:1.5rem;font-weight:800;color:#111827;margin:0 0 1rem 0;`;
const Card = styled.div`background:#fff;border-radius:1rem;padding:1.25rem;box-shadow:0 8px 20px rgba(0,0,0,0.08);margin-bottom:1rem;`;
const Row = styled.div`display:grid;grid-template-columns:1fr 1fr;gap:1rem;`; 
const Label = styled.label`display:block;font-size:.875rem;color:#6b7280;margin-bottom:.25rem;`;
const Input = styled.input`width:100%;border:1px solid #e5e7eb;border-radius:.5rem;padding:.5rem .75rem;`;
const Select = styled.select`width:100%;border:1px solid #e5e7eb;border-radius:.5rem;padding:.5rem .75rem;`;
const Button = styled.button`border:none;border-radius:.5rem;background:#2563eb;color:#fff;font-weight:700;padding:.6rem 1rem;`;

const UserInner: React.FC = () => {
  const router = useRouter();
  const params = useParams();
  const { isAuthenticated, isLoading } = useAdminAuth();
  const [data, setData] = useState<AdminUserDetailResponse | null>(null);
  const [status, setStatus] = useState('');
  const [planId, setPlanId] = useState('');
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const id = (params?.id as string) || '';

  useEffect(() => {
    const run = async () => {
      try {
        const res = await adminService.getUser(id);
        setData(res);
      } catch (e: any) {
        setError(e.response?.data?.message || 'Failed to load');
      }
    };
    if (isAuthenticated) run();
  }, [isAuthenticated, id]);

  const updateSub = async () => {
    const body: UpdateSubscriptionRequest = {};
    if (status) body.status = status;
    if (planId) body.planId = planId;
    if (amount) body.amount = Number(amount);
    setLoading(true); setError('');
    try {
      await adminService.updateUserSubscription(id, body);
      const res = await adminService.getUser(id);
      setData(res);
    } catch (e: any) {
      setError(e.response?.data?.message || 'Update failed');
    } finally { setLoading(false); }
  };

  if (isLoading || !isAuthenticated) return null;

  return (
    <Page>
      <Container>
        <Title>User Detail</Title>
        {error && <Card style={{color:'#b91c1c'}}>{error}</Card>}
        {data && (
          <>
            <Card>
              <Row>
                <div>
                  <Label>Full Name</Label>
                  <div>{data.user.fullName}</div>
                </div>
                <div>
                  <Label>Email</Label>
                  <div>{data.user.email}</div>
                </div>
                <div>
                  <Label>Customer ID</Label>
                  <div>{data.user.customerId}</div>
                </div>
              </Row>
            </Card>
            <Card>
              <h3>Subscription</h3>
              <Row>
                <div>
                  <Label>Status</Label>
                  <Select value={status} onChange={(e)=>setStatus(e.target.value)}>
                    <option value="">Unchanged</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    <option value="expired">Expired</option>
                  </Select>
                </div>
                <div>
                  <Label>Plan ID</Label>
                  <Input value={planId} onChange={(e)=>setPlanId(e.target.value)} placeholder="66fcb4..." />
                </div>
                <div>
                  <Label>Amount</Label>
                  <Input value={amount} onChange={(e)=>setAmount(e.target.value)} placeholder="999" />
                </div>
              </Row>
              <div style={{marginTop:'1rem'}}>
                <Button onClick={updateSub} disabled={loading}>{loading? 'Saving...' : 'Save Changes'}</Button>
              </div>
            </Card>
            <Card>
              <h3>Payments</h3>
              {data.payments.map((p)=> (
                <div key={p._id} style={{display:'flex',justifyContent:'space-between',borderTop:'1px solid #e5e7eb',padding:'.5rem 0'}}>
                  <div>₹{p.amount} — {p.status}</div>
                  <div>{new Date(p.createdAt).toLocaleString()}</div>
                </div>
              ))}
            </Card>
          </>
        )}
      </Container>
    </Page>
  );
};

const UserPage: React.FC = () => (
  <AdminAuthProvider>
    <UserInner />
  </AdminAuthProvider>
);

export default UserPage;

