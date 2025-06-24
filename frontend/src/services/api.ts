import axios from 'axios';
import { LoginCredentials, RegisterData, UserFilters, ApiResponse, User } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para adicionar token de autenticação
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Interceptor para tratar respostas de erro
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const authApi = {
  login: (credentials: LoginCredentials): Promise<{ data: { success: boolean; message: string; data: { user: User; token: string } } }> =>
    api.post('/auth/login', credentials),
  
  register: (userData: RegisterData): Promise<ApiResponse<{ message: string }>> =>
    api.post('/auth/register', userData),
  
  getCurrentUser: (): Promise<ApiResponse<User>> =>
    api.get('/auth/me'),
};

export const userApi = {
  getUsers: (filters: UserFilters): Promise<ApiResponse<User[]>> => {
    const params = new URLSearchParams();
    if (filters.role) params.append('role', filters.role);
    if (filters.sortBy) params.append('sortBy', filters.sortBy);
    if (filters.order) params.append('order', filters.order);
    
    return api.get(`/users?${params.toString()}`);
  },
  
  updateUser: (id: string, userData: Partial<User>): Promise<ApiResponse<User>> =>
    api.patch(`/users/${id}`, userData),
  
  adminEditUser: (id: string, userData: { name?: string; email?: string; password?: string; role?: 'admin' | 'user' }): Promise<ApiResponse<User>> =>
    api.put(`/users/admin/edit/${id}`, userData),
  
  deleteUser: (id: string): Promise<ApiResponse<void>> =>
    api.delete(`/users/${id}`),
  
  getInactiveUsers: (): Promise<ApiResponse<User[]>> =>
    api.get('/users/inactive'),
};

export default api;

