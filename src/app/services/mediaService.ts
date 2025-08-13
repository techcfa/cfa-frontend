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

export interface Media {
  _id: string;
  title: string;
  description: string;
  type: 'article' | 'video' | 'banner' | 'update' | 'image';
  content?: string;
  mediaUrl?: string;
  tags?: string[];
  isPublished?: boolean;
  isBroadcast?: boolean;
  viewCount: number;
  createdAt: string;
  fileSize?: number;
  mimeType?: string;
  isActive?: boolean;
  createdBy?: {
    _id: string;
    username: string;
  };
  updatedAt?: string;
}

export interface MediaResponse {
  media: Media[];
  totalPages: number;
  currentPage: number;
  total: number;
}

export const mediaService = {
  getMedia: async (filters?: { type?: string; page?: number; limit?: number }): Promise<MediaResponse> => {
    const params = new URLSearchParams();
    if (filters?.type) params.append('type', filters.type);
    if (filters?.page) params.append('page', filters.page.toString());
    if (filters?.limit) params.append('limit', filters.limit.toString());

    const response = await api.get(`/api/media?${params.toString()}`);
    return response.data;
  },

  getMediaById: async (id: string): Promise<Media> => {
    const response = await api.get(`/api/media/${id}`);
    return response.data;
  },

  getBroadcastUpdates: async (): Promise<Media[]> => {
    const response = await api.get('/api/media/broadcast/updates');
    return response.data;
  },
};

export default mediaService;