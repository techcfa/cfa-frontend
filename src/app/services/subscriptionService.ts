import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://api.cyberfraudprotection.com';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use((config) => {
  const token = typeof window !== 'undefined' ? localStorage.getItem('cfa_token') : null;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export interface SubscriptionPlan {
  _id: string;
  planId: string;
  planName: string;
  description: string;
  price: number;
  specialPrice?: number | null;
  duration: number;
  maxMembers: number;
  features: string[];
  isActive?: boolean;
}

export interface CreateOrderRequest {
  planId: string; // DB id
  additionalMembers?: Array<{ name: string; email: string }>;
}

export interface CreateOrderResponse {
  orderId: string;
  amount: number;
  currency: string;
  isFreeUser: boolean;
  plan: { id: string; name: string; description?: string; duration: number; maxMembers: number };
}

export interface VerifyPaymentRequest {
  orderId: string;
  paymentId: string;
  signature: string;
  additionalMembers?: Array<{ name: string; email: string }>;
}

export interface ActiveSubscriptionResponse {
  subscription: {
    planId: string;
    planName: string;
    status: 'active' | 'inactive' | 'expired';
    startDate: string;
    endDate: string;
    paymentId: string;
    amount: number;
  };
  additionalMembers?: Array<{ name: string; email: string }>;
}

export interface PaymentItem {
  _id: string;
  userId: string;
  subscriptionId: string;
  razorpayOrderId: string;
  razorpayPaymentId: string;
  amount: number;
  status: string;
  createdAt: string;
}

export const subscriptionService = {
  getPlans: async () => {
    const res = await api.get('/api/subscription/plans');
    return res.data as SubscriptionPlan[];
  },

  createOrder: async (body: CreateOrderRequest) => {
    const res = await api.post('/api/subscription/create-order', body);
    return res.data as CreateOrderResponse;
  },

  verifyPayment: async (body: VerifyPaymentRequest) => {
    const res = await api.post('/api/subscription/verify-payment', body);
    return res.data as ActiveSubscriptionResponse & { message: string };
  },

  mySubscription: async () => {
    const res = await api.get('/api/subscription/my-subscription');
    return res.data as ActiveSubscriptionResponse;
  },

  cancel: async () => {
    const res = await api.post('/api/subscription/cancel');
    return res.data as { message: string };
  },

  payments: async () => {
    const res = await api.get('/api/subscription/payments');
    return res.data as PaymentItem[];
  },
};

export default subscriptionService;

