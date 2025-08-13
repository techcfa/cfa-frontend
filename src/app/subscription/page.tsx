"use client";

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { subscriptionService, ActiveSubscriptionResponse, PaymentItem } from '@/app/services/subscriptionService';
import Link from 'next/link';

const Page = styled.div`min-height:100vh;background:#f8fafc;`;
const Container = styled.div`max-width:1000px;margin:0 auto;padding:2rem 1rem;`;
const Grid = styled.div`display:grid;grid-template-columns:2fr 1fr;gap:1rem;@media(max-width:1000px){grid-template-columns:1fr;}`;
const Card = styled.div`background:#fff;border-radius:1rem;padding:1.25rem;box-shadow:0 8px 20px rgba(0,0,0,0.08);`;
const Button = styled.button`border:none;border-radius:.5rem;background:#2563eb;color:#fff;font-weight:700;padding:.6rem 1rem;`;

const SubscriptionPage: React.FC = () => {
  const [sub, setSub] = useState<ActiveSubscriptionResponse | null>(null);
  const [payments, setPayments] = useState<PaymentItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const load = async () => {
    try {
      setLoading(true); setError('');
      const [s, p] = await Promise.all([
        subscriptionService.mySubscription(),
        subscriptionService.payments(),
      ]);
      setSub(s);
      setPayments(p);
    } catch (e: any) {
      setError(e.response?.data?.message || 'Failed to load');
    } finally { setLoading(false); }
  };

  useEffect(()=>{ load(); }, []);

  const cancel = async () => {
    try { await subscriptionService.cancel(); await load(); }
    catch (e: any) { setError(e.response?.data?.message || 'Cancel failed'); }
  };

  return (
    <Page>
      <Container>
        {error && <Card style={{color:'#b91c1c', marginBottom:'1rem'}}>{error}</Card>}
        <Grid>
          <Card>
            <h2>My Subscription</h2>
            {loading && <div>Loading...</div>}
            {!sub && !loading && (
              <div>
                No active subscription. <Link href="/plans">Choose a plan →</Link>
              </div>
            )}
            {sub && (
              <div style={{marginTop:'.5rem'}}>
                <div><strong>Plan:</strong> {sub.subscription.planName}</div>
                <div><strong>Status:</strong> {sub.subscription.status}</div>
                <div><strong>Period:</strong> {new Date(sub.subscription.startDate).toLocaleDateString()} — {new Date(sub.subscription.endDate).toLocaleDateString()}</div>
                <div><strong>Amount:</strong> ₹{sub.subscription.amount}</div>
                <div style={{marginTop:'.75rem'}}>
                  <Button onClick={cancel}>Cancel Subscription</Button>
                </div>
              </div>
            )}
          </Card>
          <Card>
            <h3>Payments</h3>
            {payments.map((p)=> (
              <div key={p._id} style={{display:'flex',justifyContent:'space-between',borderTop:'1px solid #e5e7eb',padding:'.5rem 0'}}>
                <div>₹{p.amount} — {p.status}</div>
                <div>{new Date(p.createdAt).toLocaleString()}</div>
              </div>
            ))}
            {payments.length===0 && <div>No payments</div>}
          </Card>
        </Grid>
      </Container>
    </Page>
  );
};

export default SubscriptionPage;

