import axios from 'axios';

const API_BASE_URL = 'http://localhost:5004';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('cfa_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('cfa_token');
      localStorage.removeItem('cfa_user');
      window.location.href = '/auth/signin';
    }
    return Promise.reject(error);
  }
);

export interface SendOTPRequest {
  mobileNumber: string;
}

export interface VerifyOTPRequest {
  mobileNumber: string;
  otp: string;
  fullName: string;
  email: string;
  password: string;
}

export interface LoginRequest {
  mobileNumber?: string;
  email?: string;
  password: string;
}

export interface ForgotPasswordRequest {
  mobileNumber: string;
}

export interface ResetPasswordRequest {
  mobileNumber: string;
  otp: string;
  newPassword: string;
}

export interface AuthResponse {
  message: string;
  token: string;
  user: {
    id: string;
    fullName: string;
    mobileNumber: string;
    email: string;
    customerId: string;
    isVerified?: boolean;
  };
}

export const authService = {
  // Send OTP for registration
  sendOTP: async (data: SendOTPRequest) => {
    const response = await api.post('/api/auth/send-otp', data);
    return response.data;
  },

  // Verify OTP and register user
  verifyOTP: async (data: VerifyOTPRequest) => {
    const response = await api.post('/api/auth/verify-otp', data);
    return response.data as AuthResponse;
  },

  // Login user
  login: async (data: LoginRequest) => {
    const response = await api.post('/api/auth/login', data);
    return response.data as AuthResponse;
  },

  // Send OTP for password reset
  forgotPassword: async (data: ForgotPasswordRequest) => {
    const response = await api.post('/api/auth/forgot-password', data);
    return response.data;
  },

  // Reset password
  resetPassword: async (data: ResetPasswordRequest) => {
    const response = await api.post('/api/auth/reset-password', data);
    return response.data;
  },

  // Get user profile (protected route)
  getProfile: async () => {
    const response = await api.get('/api/auth/profile');
    return response.data;
  },
};

export default authService; 