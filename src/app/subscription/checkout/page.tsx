"use client";

import React, { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import styled from 'styled-components';
import { subscriptionService, SubscriptionPlan } from '@/app/services/subscriptionService';
import { useAuth } from '@/app/contexts/AuthContext';

declare global { interface Window { Razorpay: any } }

const Page = styled.div`min-height:100vh;background:#f8fafc;`;
const Container = styled.div`max-width:900px;margin:0 auto;padding:2rem 1rem;`;
const Card = styled.div`background:#fff;border-radius:1rem;padding:1.25rem;box-shadow:0 8px 20px rgba(0,0,0,0.08);margin-bottom:1rem;`;
const Row = styled.div`display:grid;grid-template-columns:1fr 1fr;gap:1rem;@media(max-width:900px){grid-template-columns:1fr;}`;
const Label = styled.label`display:block;font-size:.875rem;color:#6b7280;margin-bottom:.25rem;`;
const Input = styled.input`width:100%;border:1px solid #e5e7eb;border-radius:.5rem;padding:.5rem .75rem;`;
const Button = styled.button`border:none;border-radius:.5rem;background:#2563eb;color:#fff;font-weight:700;padding:.6rem 1rem;`;

const CheckoutPage: React.FC = () => {
  const router = useRouter();
  const { user, isAuthenticated } = useAuth();
  const [plan, setPlan] = useState<SubscriptionPlan | null>(null);
  const [members, setMembers] = useState<Array<{name: string; email: string}>>([]);
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!isAuthenticated) { router.replace('/auth/signin'); return; }
    const raw = localStorage.getItem('cfa_selected_plan');
    if (!raw) { router.replace('/plans'); return; }
    try { setPlan(JSON.parse(raw)); } catch { router.replace('/plans'); }
  }, [isAuthenticated, router]);

  useEffect(() => {
    if (plan && plan.maxMembers > 1) {
      setMembers(Array(Math.max(0, plan.maxMembers - 1)).fill(0).map(()=>({name:'', email:''})));
    } else { setMembers([]); }
  }, [plan]);

  const onMemberChange = (idx: number, key: 'name'|'email', val: string) => {
    setMembers((prev) => prev.map((m, i) => i===idx ? { ...m, [key]: val } : m));
  };

  const handleCheckout = async () => {
    if (!plan) return;
    setCreating(true); setError('');
    try {
      const order = await subscriptionService.createOrder({ planId: plan._id, additionalMembers: members.filter(m=>m.name && m.email) });
      if (order.amount <= 0) {
        // Zero-amount: still call verify with placeholders as per backend agreement
        await subscriptionService.verifyPayment({ orderId: order.orderId, paymentId: 'FREE', signature: 'FREE', additionalMembers: members.filter(m=>m.name && m.email) });
        router.push('/subscription/success');
        return;
      }

      if (!window.Razorpay) {
        setError('Razorpay SDK not loaded');
        return;
      }

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: order.amount * 100,
        currency: order.currency,
        name: 'CFA Subscription',
        order_id: order.orderId,
        prefill: { name: user?.fullName, email: user?.email },
        handler: async (resp: any) => {
          await subscriptionService.verifyPayment({
            orderId: resp.razorpay_order_id,
            paymentId: resp.razorpay_payment_id,
            signature: resp.razorpay_signature,
            additionalMembers: members.filter(m=>m.name && m.email),
          });
          router.push('/subscription/success');
        },
      };
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (e: any) {
      setError(e.response?.data?.message || 'Checkout failed');
    } finally { setCreating(false); }
  };

  if (!plan) return null;

  return (
    <Page>
      <Container>
        <Card>
          <h2>Checkout — {plan.planName}</h2>
          <div style={{color:'#6b7280'}}>{plan.description}</div>
          <div style={{marginTop:'.5rem'}}>Amount: <strong>₹{plan.specialPrice ?? plan.price}</strong></div>
        </Card>
        {error && <Card style={{color:'#b91c1c'}}>{error}</Card>}
        {plan.maxMembers > 1 && (
          <Card>
            <h3>Additional Members (optional)</h3>
            {members.map((m, i) => (
              <Row key={i}>
                <div>
                  <Label>Name</Label>
                  <Input value={m.name} onChange={(e)=>onMemberChange(i, 'name', e.target.value)} />
                </div>
                <div>
                  <Label>Email</Label>
                  <Input value={m.email} onChange={(e)=>onMemberChange(i, 'email', e.target.value)} />
                </div>
              </Row>
            ))}
          </Card>
        )}

        <Button onClick={handleCheckout} disabled={creating}>{creating? 'Processing...' : 'Proceed to Pay'}</Button>
        <script src="https://checkout.razorpay.com/v1/checkout.js" async></script>
      </Container>
    </Page>
  );
};

export default CheckoutPage;

