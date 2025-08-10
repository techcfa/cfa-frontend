"use client";

import React, { useEffect, useState } from 'react';
import { AdminAuthProvider, useAdminAuth } from '@/app/contexts/AdminAuthContext';
import { adminService, SubscriptionPlan, CreateSubscriptionRequest } from '@/app/services/adminService';
import styled from 'styled-components';

const Page = styled.div`min-height:100vh;background:#f8fafc;`;
const Container = styled.div`max-width:1100px;margin:0 auto;padding:2rem 1rem;`;
const Title = styled.h1`font-size:1.5rem;font-weight:800;color:#111827;margin:0 0 1rem 0;`;
const Grid = styled.div`display:grid;grid-template-columns:2fr 1fr;gap:1rem;@media(max-width:900px){grid-template-columns:1fr;}`;
const Card = styled.div`background:#fff;border-radius:1rem;padding:1.25rem;box-shadow:0 8px 20px rgba(0,0,0,0.08);`;
const Table = styled.table`width:100%;`;
const Th = styled.th`text-align:left;padding:.5rem;border-bottom:1px solid #e5e7eb;color:#374151;`;
const Td = styled.td`padding:.5rem;border-top:1px solid #e5e7eb;`;
const Label = styled.label`display:block;font-size:.875rem;color:#6b7280;margin:.25rem 0;`;
const Input = styled.input`width:100%;border:1px solid #e5e7eb;border-radius:.5rem;padding:.5rem .75rem;`;
const Textarea = styled.textarea`width:100%;border:1px solid #e5e7eb;border-radius:.5rem;padding:.5rem .75rem;`;
const Button = styled.button`border:none;border-radius:.5rem;background:#2563eb;color:#fff;font-weight:700;padding:.6rem 1rem;margin-top:.5rem;`;

const SubscriptionsInner: React.FC = () => {
  const { isAuthenticated, isLoading } = useAdminAuth();
  const [plans, setPlans] = useState<SubscriptionPlan[]>([]);
  const [error, setError] = useState('');
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState<CreateSubscriptionRequest>({
    planId: '', planName: '', description: '', price: 0, duration: 12, maxMembers: 1, features: [], isSpecialOffer: false, specialPrice: undefined,
  });

  const load = async () => {
    try { setError(''); const res = await adminService.listSubscriptions(); setPlans(res); }
    catch (e: any) { setError(e.response?.data?.message || 'Failed to load plans'); }
  };

  useEffect(()=>{ if (isAuthenticated) load(); }, [isAuthenticated]);

  const createPlan = async () => {
    setCreating(true); setError('');
    try {
      await adminService.createSubscription(form);
      setForm({ planId: '', planName: '', description: '', price: 0, duration: 12, maxMembers: 1, features: [], isSpecialOffer: false, specialPrice: undefined });
      await load();
    } catch (e: any) { setError(e.response?.data?.message || 'Failed to create plan'); }
    finally { setCreating(false); }
  };

  if (isLoading || !isAuthenticated) return null;

  return (
    <Page>
      <Container>
        <Title>Subscription Plans</Title>
        {error && <Card style={{color:'#b91c1c'}}>{error}</Card>}
        <Grid>
          <Card>
            <Table>
              <thead>
                <tr>
                  <Th>Plan</Th><Th>Price</Th><Th>Duration</Th><Th>Members</Th><Th>Special</Th>
                </tr>
              </thead>
              <tbody>
                {plans.map((p)=> (
                  <tr key={p._id}>
                    <Td>{p.planName}</Td>
                    <Td>₹{p.price}</Td>
                    <Td>{p.duration} mo</Td>
                    <Td>{p.maxMembers}</Td>
                    <Td>{p.isSpecialOffer ? `₹${p.specialPrice}` : '-'}</Td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card>
          <Card>
            <h3>Create Plan</h3>
            <Label>Plan ID</Label>
            <Input value={form.planId} onChange={(e)=>setForm({...form, planId: e.target.value})} />
            <Label>Plan Name</Label>
            <Input value={form.planName} onChange={(e)=>setForm({...form, planName: e.target.value})} />
            <Label>Description</Label>
            <Textarea rows={3} value={form.description} onChange={(e)=>setForm({...form, description: e.target.value})} />
            <Label>Price</Label>
            <Input type="number" value={form.price} onChange={(e)=>setForm({...form, price: Number(e.target.value)})} />
            <Label>Duration (months)</Label>
            <Input type="number" value={form.duration} onChange={(e)=>setForm({...form, duration: Number(e.target.value)})} />
            <Label>Max Members</Label>
            <Input type="number" value={form.maxMembers} onChange={(e)=>setForm({...form, maxMembers: Number(e.target.value)})} />
            <Label>Features (comma separated)</Label>
            <Input value={form.features.join(', ')} onChange={(e)=>setForm({...form, features: e.target.value.split(',').map(f=>f.trim()).filter(Boolean)})} />
            <Label>Special Offer Price (optional)</Label>
            <Input type="number" value={form.specialPrice ?? ''} onChange={(e)=>setForm({...form, specialPrice: e.target.value? Number(e.target.value) : undefined})} />
            <Button onClick={createPlan} disabled={creating}>{creating? 'Creating...' : 'Create Plan'}</Button>
          </Card>
        </Grid>
      </Container>
    </Page>
  );
};

const SubscriptionsPage: React.FC = () => (
  <AdminAuthProvider>
    <SubscriptionsInner />
  </AdminAuthProvider>
);

export default SubscriptionsPage;

