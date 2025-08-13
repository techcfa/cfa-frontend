"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../contexts/AuthContext';
import { motion } from 'framer-motion';
import { 
  User, 
  Play, 
  FileText, 
  Shield, 
  LogOut, 
  Calendar,
  CreditCard,
  Clock,
  CheckCircle,
  Star,
  Download,
  Video,
  Image as ImageIcon,
  X
} from 'lucide-react';
import subscriptionService, { SubscriptionPlan } from '../services/subscriptionService';
import mediaService, { Media } from '../services/mediaService';
import styled from 'styled-components';

const Page = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding-top: 5rem;
  padding-bottom: 2rem;
  
  @media (max-width: 576px) {
    padding-top: 4.5rem;
  }
`;

const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem 1rem;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 3rem;
  color: white;
`;

const WelcomeTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: 800;
  margin: 0 0 0.5rem 0;
  text-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

const WelcomeSubtitle = styled.p`
  font-size: 1.2rem;
  opacity: 0.9;
  margin: 0;
`;

const TabContainer = styled.div`
  display: flex;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 1rem;
  padding: 0.5rem;
  margin-bottom: 2rem;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 0.5rem;
  }
`;

const Tab = styled.button<{ active: boolean }>`
  flex: 1;
  padding: 1rem 1.5rem;
  border: none;
  border-radius: 0.75rem;
  font-weight: 600;
  font-size: 0.95rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  
  ${props => props.active 
    ? `
      background: white;
      color: #667eea;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    `
    : `
      background: transparent;
      color: rgba(255, 255, 255, 0.8);
      &:hover {
        background: rgba(255, 255, 255, 0.1);
        color: white;
      }
    `
  }
`;

const Card = styled.div`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 1rem;
  padding: 2rem;
  box-shadow: 0 8px 32px rgba(0,0,0,0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  margin-bottom: 2rem;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin-bottom: 2rem;
  
  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

const ProfileCard = styled(Card)`
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, #667eea, #764ba2);
  }
`;

const ProfileHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

const Avatar = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea, #764ba2);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 2rem;
  font-weight: 700;
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
`;

const ProfileInfo = styled.div`
  flex: 1;
`;

const ProfileName = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  color: #111827;
  margin: 0 0 0.5rem 0;
`;

const ProfileEmail = styled.p`
  color: #6b7280;
  margin: 0;
  font-size: 0.95rem;
`;

const InfoGrid = styled.div`
  display: grid;
  gap: 1rem;
`;

const InfoItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background: #f8fafc;
  border-radius: 0.75rem;
  border-left: 4px solid #667eea;
`;

const InfoLabel = styled.span`
  font-weight: 600;
  color: #374151;
  font-size: 0.9rem;
`;

const InfoValue = styled.span`
  color: #111827;
  font-weight: 600;
`;

const SubscriptionCard = styled(Card)`
  position: relative;
`;

const SubscriptionStatus = styled.div<{ status: string }>`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border-radius: 9999px;
  font-weight: 600;
  font-size: 0.9rem;
  margin-bottom: 1.5rem;
  
  ${props => {
    switch (props.status) {
      case 'active':
        return `
          background: #dcfce7;
          color: #166534;
          border: 1px solid #bbf7d0;
        `;
      case 'expired':
        return `
          background: #fef2f2;
          color: #991b1b;
          border: 1px solid #fecaca;
        `;
      default:
        return `
          background: #f3f4f6;
          color: #6b7280;
          border: 1px solid #d1d5db;
        `;
    }
  }}
`;

const PlanFeatures = styled.ul`
  list-style: none;
  padding: 0;
  margin: 1rem 0;
`;

const PlanFeature = styled.li`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.5rem 0;
  color: #374151;
  font-size: 0.9rem;
`;

const MediaGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
`;

const MediaCard = styled.div`
  background: white;
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  transition: all 0.3s ease;
  cursor: pointer;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(0,0,0,0.15);
  }
`;

const MediaPreview = styled.div`
  height: 160px;
  background: #f3f4f6;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #9ca3af;
  position: relative;
  overflow: hidden;
`;

const MediaImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const MediaVideo = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const MediaPlaceholder = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  color: #6b7280;
`;

const Modal = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1rem;
`;

const ModalContent = styled(motion.div)`
  background: white;
  border-radius: 1.5rem;
  max-width: 90vw;
  max-height: 90vh;
  overflow: hidden;
  position: relative;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.25);
`;

const ModalHeader = styled.div`
  padding: 1.5rem 2rem;
  border-bottom: 1px solid #e5e7eb;
  display: flex;
  justify-content: between;
  align-items: flex-start;
  gap: 1rem;
`;

const ModalBody = styled.div`
  padding: 2rem;
  max-height: 70vh;
  overflow-y: auto;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  border: none;
  background: rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  color: #6b7280;
  
  &:hover {
    background: rgba(0, 0, 0, 0.2);
    color: #374151;
  }
`;

const ModalTitle = styled.h2`
  margin: 0 0 0.5rem 0;
  font-size: 1.5rem;
  font-weight: 700;
  color: #111827;
  line-height: 1.3;
`;

const ModalDescription = styled.p`
  margin: 0;
  color: #6b7280;
  font-size: 0.95rem;
  line-height: 1.5;
`;

const ModalMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin: 1.5rem 0;
  padding: 1rem;
  background: #f9fafb;
  border-radius: 0.75rem;
`;

const ModalContent2 = styled.div`
  color: #374151;
  line-height: 1.7;
  font-size: 0.95rem;
  
  p {
    margin: 0 0 1rem 0;
  }
  
  &:last-child p:last-child {
    margin-bottom: 0;
  }
`;

const MediaViewer = styled.div`
  width: 100%;
  min-height: 300px;
  background: #f3f4f6;
  border-radius: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
  overflow: hidden;
`;

const ViewerImage = styled.img`
  width: 100%;
  height: auto;
  max-height: 500px;
  object-fit: contain;
`;

const ViewerVideo = styled.video`
  width: 100%;
  height: auto;
  max-height: 500px;
`;

const ViewerPlaceholder = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  color: #6b7280;
  padding: 3rem;
`;

const MediaContent = styled.div`
  padding: 1.25rem;
`;

const MediaTitle = styled.h3`
  font-size: 1rem;
  font-weight: 700;
  color: #111827;
  margin: 0 0 0.5rem 0;
  line-height: 1.3;
`;

const MediaDescription = styled.p`
  color: #6b7280;
  font-size: 0.85rem;
  margin: 0 0 1rem 0;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const MediaMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.8rem;
  color: #9ca3af;
`;

const Badge = styled.span<{ variant?: 'primary' | 'success' | 'warning' }>`
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 600;
  
  ${props => {
    switch (props.variant) {
      case 'success':
        return 'background: #dcfce7; color: #166534;';
      case 'warning':
        return 'background: #fef3c7; color: #92400e;';
      default:
        return 'background: #dbeafe; color: #1e40af;';
    }
  }}
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 3rem 2rem;
  color: #6b7280;
`;

const EmptyIcon = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: #f3f4f6;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1rem;
  color: #9ca3af;
`;

const LoadingSpinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 300px;
  
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

const DashboardPage = () => {
  const router = useRouter();
  const { user, isAuthenticated, isLoading, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [plans, setPlans] = useState<SubscriptionPlan[]>([]);
  const [media, setMedia] = useState<Media[]>([]);
  const [subscription, setSubscription] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedMedia, setSelectedMedia] = useState<Media | null>(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/auth/signin');
    }
  }, [isAuthenticated, isLoading, router]);

  useEffect(() => {
    if (isAuthenticated) {
      loadData();
    }
  }, [isAuthenticated]);

  const loadData = async () => {
    try {
      const [plansData, mediaData] = await Promise.all([
        subscriptionService.getPlans(),
        mediaService.getMedia({ limit: 12 })
      ]);
      
      setPlans(plansData);
      setMedia(mediaData.media);

      // Try to get user's subscription
      try {
        const subData = await subscriptionService.mySubscription();
        setSubscription(subData.subscription);
      } catch (error) {
        setSubscription(null);
      }
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubscribe = async (planId: string) => {
    try {
      const orderData = await subscriptionService.createOrder({ planId });
      
      // For demo purposes, auto-verify payment
      const paymentData = {
        orderId: orderData.orderId,
        paymentId: 'pay_demo_' + Date.now(),
        signature: 'sig_demo_' + Date.now(),
      };
      
      await subscriptionService.verifyPayment(paymentData);
      
      // Reload subscription data
      const subData = await subscriptionService.mySubscription();
      setSubscription(subData.subscription);
      
      alert('Subscription activated successfully!');
    } catch (error) {
      console.error('Subscription error:', error);
      alert('Subscription failed. Please try again.');
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const renderMediaPreview = (item: Media) => {
    // Check if this item has mediaUrl (from admin media structure)
    const mediaWithUrl = item as any;
    if (mediaWithUrl.mediaUrl) {
      if (mediaWithUrl.type === 'video') {
        return (
          <ViewerVideo 
            src={mediaWithUrl.mediaUrl} 
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            controls
            muted
            playsInline
          />
        );
      } else if (mediaWithUrl.type === 'image') {
        return (
          <ViewerImage 
            src={mediaWithUrl.mediaUrl} 
            alt={item.title}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        );
      }
    }

    // Fallback to content-based media detection
    if (item.content && item.content.trim()) {
      // For video content - show actual video
      if (item.type === 'video') {
        const videoMatch = item.content.match(/<video[^>]*src="([^"]*)"[^>]*>/i) || 
                          item.content.match(/src="([^"]*\.(mp4|webm|ogg))"/i);
        if (videoMatch) {
          return (
            <ViewerVideo 
              src={videoMatch[1]} 
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              controls
              muted
              playsInline
            />
          );
        }
      }
      
      // For banner/image content - show actual image
      if (item.type === 'banner') {
        const imageMatch = item.content.match(/<img[^>]*src="([^"]*)"[^>]*>/i) || 
                          item.content.match(/src="([^"]*\.(jpg|jpeg|png|gif|webp))"/i);
        if (imageMatch) {
          return (
            <ViewerImage 
              src={imageMatch[1]} 
              alt={item.title}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          );
        }
      }
      
      // For article content - show content preview
      if (item.type === 'article' || item.type === 'update') {
        return (
          <div style={{ 
            width: '100%', 
            height: '100%', 
            padding: '1rem',
            background: '#f8fafc',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center'
          }}>
            <FileText size={40} style={{ color: '#6b7280', marginBottom: '0.5rem' }} />
            <div style={{ fontSize: '0.8rem', fontWeight: '500', color: '#374151' }}>
              {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
            </div>
            <div style={{ 
              fontSize: '0.7rem', 
              color: '#6b7280', 
              marginTop: '0.5rem',
              maxWidth: '100%',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap'
            }}>
              {item.content.replace(/<[^>]*>/g, '').substring(0, 50)}...
            </div>
          </div>
        );
      }
    }
    
    // Final fallback for content without media URLs
    return (
      <MediaPlaceholder>
        {item.type === 'video' ? <Video size={40} /> : 
         item.type === 'image' ? <ImageIcon size={40} /> :
         item.type === 'banner' ? <ImageIcon size={40} /> : 
         <FileText size={40} />}
        <span style={{ fontSize: '0.8rem', fontWeight: '500' }}>
          {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
        </span>
        {item.content && item.content.trim() && (
          <span style={{ fontSize: '0.7rem', color: '#9ca3af', textAlign: 'center' }}>
            Content Available
          </span>
        )}
      </MediaPlaceholder>
    );
  };

  const openMediaModal = (item: Media) => {
    setSelectedMedia(item);
    setShowModal(true);
  };

  const closeMediaModal = () => {
    setShowModal(false);
    setTimeout(() => setSelectedMedia(null), 200); // Delay to allow animation
  };

  const renderMediaViewer = (item: Media) => {
    // Check if this item has mediaUrl (from admin media structure)
    const mediaWithUrl = item as any;
    if (mediaWithUrl.mediaUrl) {
      if (mediaWithUrl.type === 'video') {
        return (
          <MediaViewer>
            <ViewerVideo controls>
              <source src={mediaWithUrl.mediaUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </ViewerVideo>
          </MediaViewer>
        );
      } else if (mediaWithUrl.type === 'image') {
        return (
          <MediaViewer>
            <ViewerImage src={mediaWithUrl.mediaUrl} alt={item.title} />
          </MediaViewer>
        );
      }
    }

    // Check if content exists and is not just whitespace
    if (item.content && item.content.trim()) {
      // For HTML content (articles, updates)
      if (item.type === 'article' || item.type === 'update') {
        return (
          <ModalContent2>
            <div dangerouslySetInnerHTML={{ __html: item.content }} />
          </ModalContent2>
        );
      }
      
      // For video content - check if it contains video URLs
      if (item.type === 'video') {
        const videoMatch = item.content.match(/<video[^>]*src="([^"]*)"[^>]*>/i) || 
                          item.content.match(/src="([^"]*\.(mp4|webm|ogg))"/i);
        if (videoMatch) {
          return (
            <MediaViewer>
              <ViewerVideo controls>
                <source src={videoMatch[1]} type="video/mp4" />
                Your browser does not support the video tag.
              </ViewerVideo>
            </MediaViewer>
          );
        }
      }
      
      // For banner content - check if it contains image URLs
      if (item.type === 'banner') {
        const imageMatch = item.content.match(/<img[^>]*src="([^"]*)"[^>]*>/i) || 
                          item.content.match(/src="([^"]*\.(jpg|jpeg|png|gif|webp))"/i);
        if (imageMatch) {
          return (
            <MediaViewer>
              <ViewerImage src={imageMatch[1]} alt={item.title} />
            </MediaViewer>
          );
        }
      }
      
      // If content exists but no media found, show the content
      return (
        <ModalContent2>
          <div dangerouslySetInnerHTML={{ __html: item.content }} />
        </ModalContent2>
      );
    }
    
    // Enhanced fallback for different content types
    return (
      <MediaViewer>
        <ViewerPlaceholder>
          {item.type === 'video' ? <Video size={60} /> : 
           item.type === 'image' ? <ImageIcon size={60} /> :
           item.type === 'banner' ? <ImageIcon size={60} /> : 
           <FileText size={60} />}
          <div style={{ textAlign: 'center' }}>
            <p style={{ margin: '0 0 0.5rem 0', fontWeight: '600', color: '#374151' }}>
              {item.type.charAt(0).toUpperCase() + item.type.slice(1)} Content
            </p>
            <p style={{ margin: '0', fontSize: '0.9rem', color: '#6b7280' }}>
              {item.type === 'video' ? 'Video content will be displayed here' :
               item.type === 'image' ? 'Image content will be displayed here' :
               item.type === 'banner' ? 'Image content will be displayed here' :
               'Article content will be displayed here'}
            </p>
            {item.description && (
              <p style={{ 
                margin: '1rem 0 0 0', 
                fontSize: '0.85rem', 
                color: '#9ca3af',
                maxWidth: '300px',
                lineHeight: '1.4'
              }}>
                "{item.description}"
              </p>
            )}
          </div>
        </ViewerPlaceholder>
      </MediaViewer>
    );
  };

  if (isLoading || loading) {
    return (
      <Page>
        <Container>
          <LoadingSpinner />
        </Container>
      </Page>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <Page>
      <Container>
        <Header>
          <WelcomeTitle>Welcome back, {user?.fullName?.split(' ')[0]}!</WelcomeTitle>
          <WelcomeSubtitle>Manage your profile, subscriptions, and access exclusive content</WelcomeSubtitle>
        </Header>

        <TabContainer>
          <Tab active={activeTab === 'profile'} onClick={() => setActiveTab('profile')}>
            <User size={18} />
            Profile
          </Tab>
          <Tab active={activeTab === 'subscription'} onClick={() => setActiveTab('subscription')}>
            <Shield size={18} />
            My Plan
          </Tab>
          <Tab active={activeTab === 'media'} onClick={() => setActiveTab('media')}>
            <FileText size={18} />
            Media Library
          </Tab>
        </TabContainer>

        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Grid>
              <ProfileCard>
                <ProfileHeader>
                  <Avatar>
                    {getInitials(user?.fullName || 'User')}
                  </Avatar>
                  <ProfileInfo>
                    <ProfileName>{user?.fullName}</ProfileName>
                    <ProfileEmail>{user?.email}</ProfileEmail>
                  </ProfileInfo>
                </ProfileHeader>

                <InfoGrid>
                  <InfoItem>
                    <InfoLabel>Customer ID</InfoLabel>
                    <InfoValue>{user?.customerId}</InfoValue>
                  </InfoItem>
                  <InfoItem>
                    <InfoLabel>Mobile Number</InfoLabel>
                    <InfoValue>{user?.mobile || 'Not provided'}</InfoValue>
                  </InfoItem>
                  <InfoItem>
                    <InfoLabel>Account Status</InfoLabel>
                    <Badge variant="success">
                      <CheckCircle size={12} />
                      Active
                    </Badge>
                  </InfoItem>
                  <InfoItem>
                    <InfoLabel>Member Since</InfoLabel>
                    <InfoValue>{formatDate(new Date().toISOString())}</InfoValue>
                  </InfoItem>
                </InfoGrid>
              </ProfileCard>

              <Card>
                <h3 style={{ marginBottom: '1.5rem', fontSize: '1.25rem', fontWeight: '700', color: '#111827' }}>
                  Account Overview
                </h3>
                <InfoGrid>
                  <InfoItem>
                    <InfoLabel>Subscription Status</InfoLabel>
                    <InfoValue>
                      {subscription ? (
                        <Badge variant="success">
                          <Shield size={12} />
                          {subscription.planName}
                        </Badge>
                      ) : (
                        <Badge variant="warning">No Active Plan</Badge>
                      )}
                    </InfoValue>
                  </InfoItem>
                  {subscription && (
                    <InfoItem>
                      <InfoLabel>Amount Paid</InfoLabel>
                      <InfoValue>₹{subscription.amount || 0}</InfoValue>
                    </InfoItem>
                  )}
                  <InfoItem>
                    <InfoLabel>Media Access</InfoLabel>
                    <InfoValue>
                      <Badge variant={subscription ? 'success' : 'warning'}>
                        {subscription ? 'Premium Content' : 'Basic Content'}
                      </Badge>
                    </InfoValue>
                  </InfoItem>
                </InfoGrid>
              </Card>
            </Grid>
          </motion.div>
        )}

        {/* Subscription Tab */}
        {activeTab === 'subscription' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {subscription ? (
              <SubscriptionCard>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
                  <div>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#111827', margin: '0 0 0.5rem 0' }}>
                      {subscription.planName}
                    </h2>
                    <SubscriptionStatus status="active">
                      <CheckCircle size={16} />
                      Active until {formatDate(subscription.endDate)}
                    </SubscriptionStatus>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '2rem', fontWeight: '700', color: '#667eea' }}>
                      ₹{subscription.amount || 0}
                    </div>
                  </div>
                </div>

                <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '0.75rem', marginBottom: '1.5rem' }}>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: '600', color: '#111827', margin: '0 0 1rem 0' }}>
                    Your Plan Benefits
                  </h3>
                  <PlanFeatures>
                    <PlanFeature>
                      <CheckCircle size={16} style={{ color: '#10b981' }} />
                      Comprehensive cyber fraud protection
                    </PlanFeature>
                    <PlanFeature>
                      <CheckCircle size={16} style={{ color: '#10b981' }} />
                      24/7 security monitoring
                    </PlanFeature>
                    <PlanFeature>
                      <CheckCircle size={16} style={{ color: '#10b981' }} />
                      Exclusive security content and tips
                    </PlanFeature>
                    <PlanFeature>
                      <CheckCircle size={16} style={{ color: '#10b981' }} />
                      Priority customer support
                    </PlanFeature>
                  </PlanFeatures>
                </div>

                <div style={{ padding: '1rem', background: '#ecfdf5', border: '1px solid #bbf7d0', borderRadius: '0.75rem' }}>
                  <p style={{ color: '#166534', margin: '0', fontWeight: '600', fontSize: '0.9rem' }}>
                    🎉 Congratulations! Your cyber fraud protection is active and working to keep you safe online.
                  </p>
                </div>
              </SubscriptionCard>
            ) : (
              <Card>
                <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#111827', marginBottom: '1.5rem' }}>
                  Choose Your Protection Plan
                </h2>
                <MediaGrid>
                  {plans.map((plan) => (
                    <div key={plan._id} style={{ 
                      border: '2px solid #e5e7eb', 
                      borderRadius: '1rem', 
                      padding: '1.5rem',
                      transition: 'all 0.3s ease'
                    }}>
                      <h3 style={{ fontSize: '1.25rem', fontWeight: '700', color: '#111827', marginBottom: '0.5rem' }}>
                        {plan.planName}
                      </h3>
                      <p style={{ color: '#6b7280', marginBottom: '1rem', fontSize: '0.9rem' }}>
                        {plan.description}
                      </p>
                      
                      <div style={{ marginBottom: '1.5rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <span style={{ fontSize: '2rem', fontWeight: '700', color: '#dc2626', textDecoration: 'line-through' }}>
                            ₹{plan.price}
                          </span>
                          <span style={{ fontSize: '2.5rem', fontWeight: '700', color: '#10b981' }}>
                            ₹0
                          </span>
                        </div>
                        <p style={{ fontSize: '0.8rem', color: '#6b7280', margin: '0.5rem 0 0 0' }}>
                          Special offer - Free for {plan.duration} months!
                        </p>
                      </div>

                      <PlanFeatures>
                        {plan.features.map((feature, index) => (
                          <PlanFeature key={index}>
                            <Shield size={14} style={{ color: '#10b981' }} />
                            {feature}
                          </PlanFeature>
                        ))}
                      </PlanFeatures>

                      <button
                        onClick={() => handleSubscribe(plan._id)}
                        style={{
                          width: '100%',
                          background: '#667eea',
                          color: 'white',
                          border: 'none',
                          borderRadius: '0.75rem',
                          padding: '0.875rem 1rem',
                          fontWeight: '600',
                          cursor: 'pointer',
                          transition: 'all 0.3s ease'
                        }}
                        onMouseOver={(e) => e.currentTarget.style.background = '#5a67d8'}
                        onMouseOut={(e) => e.currentTarget.style.background = '#667eea'}
                      >
                        Get Protected Now
                      </button>
                    </div>
                  ))}
                </MediaGrid>
              </Card>
            )}
          </motion.div>
        )}

        {/* Media Tab */}
        {activeTab === 'media' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <div>
                  <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#111827', margin: '0 0 0.5rem 0' }}>
                    Security Content Library
                  </h2>
                  <p style={{ color: '#6b7280', margin: '0', fontSize: '0.95rem' }}>
                    Access exclusive cybersecurity content and educational materials
                  </p>
                </div>
                <Badge variant="primary">
                  <FileText size={12} />
                  {media.length} Items
                </Badge>
              </div>
              
              {media.length === 0 ? (
                <EmptyState>
                  <EmptyIcon>
                    <FileText size={32} />
                  </EmptyIcon>
                  <h3 style={{ margin: '0 0 0.5rem 0', color: '#374151' }}>No Content Available</h3>
                  <p style={{ margin: '0', fontSize: '0.9rem' }}>
                    Security content will appear here once available. Check back soon!
                  </p>
                </EmptyState>
              ) : (
                <MediaGrid>
                  {media.map((item) => (
                    <MediaCard key={item._id} onClick={() => openMediaModal(item)}>
                      <MediaPreview>
                        {renderMediaPreview(item)}
                      </MediaPreview>
                      
                      <MediaContent>
                        <MediaTitle>{item.title}</MediaTitle>
                        <MediaDescription>{item.description}</MediaDescription>
                        
                        {/* Show content preview if available */}
                        {item.content && item.content.trim() && (
                          <div style={{ 
                            marginTop: '0.75rem',
                            padding: '0.75rem',
                            background: '#f8fafc',
                            borderRadius: '0.5rem',
                            border: '1px solid #e5e7eb'
                          }}>
                            <div style={{ 
                              fontSize: '0.8rem',
                              color: '#6b7280',
                              fontWeight: '500',
                              marginBottom: '0.5rem'
                            }}>
                              Content Preview:
                            </div>
                            <div style={{
                              fontSize: '0.75rem',
                              color: '#374151',
                              lineHeight: '1.4',
                              maxHeight: '60px',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              display: '-webkit-box',
                              WebkitLineClamp: 3,
                              WebkitBoxOrient: 'vertical'
                            }}>
                              {item.content.replace(/<[^>]*>/g, '').substring(0, 150)}
                              {item.content.length > 150 ? '...' : ''}
                            </div>
                          </div>
                        )}
                        
                        <MediaMeta>
                          <Badge variant={
                            item.type === 'video' ? 'primary' : 
                            item.type === 'image' ? 'warning' : 
                            item.type === 'banner' ? 'warning' : 
                            'success'
                          }>
                            {item.type === 'video' ? <Play size={10} /> : 
                             item.type === 'image' ? <ImageIcon size={10} /> :
                             item.type === 'banner' ? <ImageIcon size={10} /> :
                             <FileText size={10} />}
                            {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                          </Badge>
                        </MediaMeta>
                      </MediaContent>
                    </MediaCard>
                  ))}
                </MediaGrid>
              )}
            </Card>
          </motion.div>
        )}
      </Container>

      {/* Media Modal */}
      {showModal && selectedMedia && (
        <Modal
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeMediaModal}
        >
          <ModalContent
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", duration: 0.3 }}
            onClick={(e) => e.stopPropagation()}
          >
            <CloseButton onClick={closeMediaModal}>
              <X size={16} />
            </CloseButton>
            
            <ModalHeader>
              <div style={{ flex: 1, paddingRight: '2rem' }}>
                <ModalTitle>{selectedMedia.title}</ModalTitle>
                <ModalDescription>{selectedMedia.description}</ModalDescription>
              </div>
            </ModalHeader>
            
            <ModalBody>
              {renderMediaViewer(selectedMedia)}
              
              <ModalMeta>
                <Badge variant={
                  selectedMedia.type === 'video' ? 'primary' : 
                  selectedMedia.type === 'image' ? 'warning' : 
                  selectedMedia.type === 'banner' ? 'warning' : 
                  'success'
                }>
                  {selectedMedia.type === 'video' ? <Play size={12} /> : 
                   selectedMedia.type === 'image' ? <ImageIcon size={12} /> :
                   selectedMedia.type === 'banner' ? <ImageIcon size={12} /> :
                   <FileText size={12} />}
                  {selectedMedia.type.charAt(0).toUpperCase() + selectedMedia.type.slice(1)}
                </Badge>
                <span style={{ fontSize: '0.9rem', color: '#6b7280' }}>
                  {new Date(selectedMedia.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </span>
              </ModalMeta>
              
              {selectedMedia.tags && selectedMedia.tags.length > 0 && (
                <div style={{ marginTop: '1rem' }}>
                  <p style={{ margin: '0 0 0.5rem 0', fontSize: '0.9rem', fontWeight: '600', color: '#374151' }}>
                    Tags:
                  </p>
                  <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                    {selectedMedia.tags.map((tag, index) => (
                      <span
                        key={index}
                        style={{
                          padding: '0.25rem 0.75rem',
                          background: '#e5e7eb',
                          color: '#374151',
                          borderRadius: '1rem',
                          fontSize: '0.8rem',
                          fontWeight: '500'
                        }}
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </ModalBody>
          </ModalContent>
        </Modal>
      )}
    </Page>
  );
};

export default DashboardPage;