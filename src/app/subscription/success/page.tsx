"use client";

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { subscriptionService, ActiveSubscriptionResponse } from '@/app/services/subscriptionService';

const Page = styled.div`min-height:100vh;background:#f8fafc;`;
const Container = styled.div`max-width:900px;margin:0 auto;padding:2rem 1rem;`;
const Card = styled.div`background:#fff;border-radius:1rem;padding:1.25rem;box-shadow:0 8px 20px rgba(0,0,0,0.08);margin-bottom:1rem;`;

const SuccessPage: React.FC = () => {
  const [data, setData] = useState<ActiveSubscriptionResponse | null>(null);
  const [error, setError] = useState('');
  useEffect(() => {
    (async () => {
      try { const res = await subscriptionService.mySubscription(); setData(res); }
      catch (e: any) { setError(e.response?.data?.message || 'Failed to load subscription'); }
    })();
  }, []);

  return (
    <Page>
      <Container>
        <Card>
          <h2>Subscription Success</h2>
          <p>Thank you! Your subscription is now active.</p>
        </Card>
        {error && <Card style={{color:'#b91c1c'}}>{error}</Card>}
        {data && (
          <Card>
            <div><strong>Plan:</strong> {data.subscription.planName}</div>
            <div><strong>Status:</strong> {data.subscription.status}</div>
            <div><strong>Start:</strong> {new Date(data.subscription.startDate).toLocaleDateString()}</div>
            <div><strong>End:</strong> {new Date(data.subscription.endDate).toLocaleDateString()}</div>
            <div><strong>Amount:</strong> ₹{data.subscription.amount}</div>
          </Card>
        )}
      </Container>
    </Page>
  );
};

export default SuccessPage;

