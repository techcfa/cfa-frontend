"use client";

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../contexts/AuthContext';
import { motion } from 'framer-motion';
import { User, Shield, CreditCard, FileText } from 'lucide-react';
import * as S from './DashboardStyles';

const DashboardPage = () => {
  const router = useRouter();
  const { user, isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/auth/signin');
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading) {
    return (
      <S.PageContainer>
        <S.Container>
          <S.Card>
            <p>Loading...</p>
          </S.Card>
        </S.Container>
      </S.PageContainer>
    );
  }

  if (!isAuthenticated) {
    return null; // Will redirect to sign in
  }

  return (
    <S.PageContainer>
      <S.Container>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <S.HeaderWrapper>
            <S.Title>Welcome, {user?.fullName}!</S.Title>
            <S.Subtitle>Your Cyber Fraud Protection Dashboard</S.Subtitle>
          </S.HeaderWrapper>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <S.Card>
            <S.SectionHeader>
              <S.IconBadge>
                <User size={24} />
              </S.IconBadge>
              <div>
                <S.SectionTitle>Account Information</S.SectionTitle>
                <S.SectionSub>Your profile details</S.SectionSub>
              </div>
            </S.SectionHeader>

            <S.InfoGrid>
              <S.InfoBlock>
                <S.InfoLabel>Full Name</S.InfoLabel>
                <S.InfoValue>{user?.fullName}</S.InfoValue>
              </S.InfoBlock>
              <S.InfoBlock>
                <S.InfoLabel>Customer ID</S.InfoLabel>
                <S.InfoValue>{user?.customerId}</S.InfoValue>
              </S.InfoBlock>
              <S.InfoBlock>
                <S.InfoLabel>Email Address</S.InfoLabel>
                <S.InfoValue>{user?.email}</S.InfoValue>
              </S.InfoBlock>
              <S.InfoBlock>
                <S.InfoLabel>Mobile Number</S.InfoLabel>
                <S.InfoValue>{user?.mobileNumber || '-'}</S.InfoValue>
              </S.InfoBlock>
            </S.InfoGrid>
          </S.Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <S.QuickGrid>
            <S.QuickCard>
              <S.QuickHeader>
                <S.IconBadge color="#dcfce7">
                  <Shield className="text-green-600" size={24} />
                </S.IconBadge>
                <S.QuickTitle>Protection Status</S.QuickTitle>
              </S.QuickHeader>
              <S.QuickText>Check your current protection status and coverage details.</S.QuickText>
              <S.LinkButton>View Details →</S.LinkButton>
            </S.QuickCard>

            <S.QuickCard>
              <S.QuickHeader>
                <S.IconBadge color="#e9d5ff">
                  <CreditCard className="text-purple-600" size={24} />
                </S.IconBadge>
                <S.QuickTitle>Subscription</S.QuickTitle>
              </S.QuickHeader>
              <S.QuickText>Manage your subscription plans and payment information.</S.QuickText>
              <S.LinkButton>Manage Plan →</S.LinkButton>
            </S.QuickCard>

            <S.QuickCard>
              <S.QuickHeader>
                <S.IconBadge color="#ffedd5">
                  <FileText className="text-orange-600" size={24} />
                </S.IconBadge>
                <S.QuickTitle>Reports</S.QuickTitle>
              </S.QuickHeader>
              <S.QuickText>View your security reports and incident history.</S.QuickText>
              <S.LinkButton>View Reports →</S.LinkButton>
            </S.QuickCard>
          </S.QuickGrid>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <S.Card>
            <S.RecentHeader>Recent Activity</S.RecentHeader>
            <S.RecentList>
              <S.RecentItem>
                <S.RecentIcon>
                  <Shield size={16} />
                </S.RecentIcon>
                <S.RecentBody>
                  <S.RecentTitle>Account Created</S.RecentTitle>
                  <S.RecentSub>Welcome to Cyber Fraud Protection</S.RecentSub>
                </S.RecentBody>
                <S.RecentTime>Just now</S.RecentTime>
              </S.RecentItem>

              <S.RecentItem>
                <S.RecentIcon>
                  <User size={16} />
                </S.RecentIcon>
                <S.RecentBody>
                  <S.RecentTitle>Profile Updated</S.RecentTitle>
                  <S.RecentSub>Your account information has been verified</S.RecentSub>
                </S.RecentBody>
                <S.RecentTime>Just now</S.RecentTime>
              </S.RecentItem>
            </S.RecentList>
          </S.Card>
        </motion.div>
      </S.Container>
    </S.PageContainer>
  );
};

export default DashboardPage; 