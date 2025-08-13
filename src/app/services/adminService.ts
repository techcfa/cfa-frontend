import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://api.cyberfraudprotection.com';
// Separate axios instance for admin with its own token storage
const adminApi = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

adminApi.interceptors.request.use((config) => {
  const token = localStorage.getItem('cfa_admin_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

adminApi.interceptors.response.use(
  (resp) => resp,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('cfa_admin_token');
      localStorage.removeItem('cfa_admin');
      if (typeof window !== 'undefined') {
        // Only redirect to admin login if we're on an admin page
        const currentPath = window.location.pathname;
        if (currentPath.startsWith('/admin/')) {
          window.location.href = '/admin/login';
        }
      }
    }
    return Promise.reject(error);
  }
);

export interface AdminAuthResponse {
  message: string;
  token: string;
  admin: {
    id: string;
    username: string;
    email: string;
    role: string;
  };
}

export interface AdminLoginRequest { email: string; password: string }

export interface AdminProfile {
  _id: string;
  username: string;
  email: string;
  role: string;
  isActive: boolean;
  lastLogin: string;
  createdAt: string;
  updatedAt: string;
}

export interface AdminDashboard {
  stats: {
    totalUsers: number;
    activeSubscriptions: number;
    totalPayments: number;
    totalRevenue: number;
  };
  recentUsers: Array<{ fullName: string; email: string; customerId: string; createdAt: string }>;
  recentPayments: Array<{ amount: number; status: string; userId: { fullName: string; email: string }; subscriptionId: { planName: string }; createdAt: string }>;
  mediaStats: Array<{ _id: string; count: number }>;
}

export interface AdminUserListResponse {
  users: Array<{
    _id: string;
    fullName: string;
    email: string;
    mobile: string;
    customerId: string;
    subscription?: { status: string; planId: string; planName: string; amount: number };
    createdAt: string;
  }>;
  totalPages: number;
  currentPage: number;
  total: number;
}

export interface AdminUserDetailResponse {
  user: {
    _id: string;
    fullName: string;
    email: string;
    mobile: string;
    customerId: string;
    subscription?: {
      planId: string; planName: string; status: string; startDate: string; endDate: string; amount: number;
    };
    additionalMembers?: Array<{ name: string; email: string }>;
  };
  payments: Array<{ _id: string; razorpayOrderId: string; amount: number; status: string; createdAt: string; subscriptionId: { planName: string } }>;
}

export interface UpdateSubscriptionRequest { status?: string; planId?: string; amount?: number }



export interface MediaItem {
  _id: string;
  title: string;
  description: string;
  type: 'image' | 'video';
  mediaUrl: string;
  thumbnailUrl?: string;
  fileSize: number;
  mimeType: string;
  viewCount: number;
  isActive: boolean;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface MediaUploadRequest {
  title: string;
  description: string;
}

export interface UpdateMediaRequest {
  title?: string;
  description?: string;
}

export const adminService = {
  login: async (data: AdminLoginRequest) => {
    const response = await adminApi.post('/api/admin/login', data);
    return response.data as AdminAuthResponse;
  },

  profile: async () => {
    const response = await adminApi.get('/api/admin/profile');
    return response.data as AdminProfile;
  },

  dashboard: async () => {
    const response = await adminApi.get('/api/admin/dashboard');
    return response.data as AdminDashboard;
  },

  listUsers: async (params?: { page?: number; limit?: number; search?: string; status?: 'active'|'inactive'|'expired' }) => {
    const response = await adminApi.get('/api/admin/users', { params });
    return response.data as AdminUserListResponse;
  },

  getUser: async (id: string) => {
    const response = await adminApi.get(`/api/admin/users/${id}`);
    return response.data as AdminUserDetailResponse;
  },

  updateUserSubscription: async (id: string, body: UpdateSubscriptionRequest) => {
    const response = await adminApi.put(`/api/admin/users/${id}/subscription`, body);
    return response.data as { message: string; subscription: any };
  },



  uploadMedia: async (file: File, title: string, description: string) => {
    const form = new FormData();
    form.append('media', file);
    form.append('title', title);
    form.append('description', description);
    const response = await adminApi.post('/api/media/upload', form, { headers: { 'Content-Type': 'multipart/form-data' } });
    return response.data as { message: string; media: MediaItem };
  },

  updateMedia: async (id: string, body: UpdateMediaRequest) => {
    const response = await adminApi.put(`/api/media/${id}`, body);
    return response.data as { message: string; media: MediaItem };
  },

  deleteMedia: async (id: string) => {
    const response = await adminApi.delete(`/api/media/${id}`);
    return response.data as { message: string };
  },

  listAllMedia: async (params?: { type?: 'image' | 'video'; page?: number; limit?: number }) => {
    const response = await adminApi.get('/api/media/admin/all', { params });
    return response.data as { media: MediaItem[]; totalPages: number; currentPage: number; total: number };
  },
};

export default adminService;

