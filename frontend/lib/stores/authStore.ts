/**
 * Authentication store using Zustand.
 * 
 * Manages user authentication state and provides actions for:
 * - User registration
 * - User login/logout
 * - Profile fetching and updating
 * - Token management
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import * as http from '@/lib/services/http';
import type {
  User,
  LoginPayload,
  RegisterPayload,
  UpdateProfilePayload,
  LoginResponse,
  RegisterResponse,
  ProfileResponse,
  ProfileUpdateResponse,
} from '@/types/user';

interface AuthState {
  // State
  user: User | null;
  isLoading: boolean;
  isUpdating: boolean;
  error: string | null;
  
  // Getters
  isAuthenticated: boolean;
  
  // Actions
  register: (payload: RegisterPayload) => Promise<{ success: boolean; error?: string }>;
  login: (payload: LoginPayload) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  fetchProfile: () => Promise<{ success: boolean; error?: string }>;
  updateProfile: (payload: UpdateProfilePayload) => Promise<{ success: boolean; error?: string }>;
  clearError: () => void;
  initializeAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      // Initial State
      user: null,
      isLoading: false,
      isUpdating: false,
      error: null,
      
      // Computed
      get isAuthenticated() {
        return !!get().user && http.isAuthenticated();
      },
      
      // Actions
      register: async (payload) => {
        set({ isLoading: true, error: null });
        
        try {
          const response = await http.post<RegisterResponse>('/auth/register/', payload);
          const { user, tokens } = response.data;
          
          http.setTokens(tokens.access, tokens.refresh);
          set({ user, isLoading: false });
          
          return { success: true };
        } catch (error: any) {
          const errorMessage = error.response?.data?.details?.email?.[0] || 
                               error.response?.data?.error || 
                               'Registration failed';
          set({ error: errorMessage, isLoading: false });
          return { success: false, error: errorMessage };
        }
      },
      
      login: async (payload) => {
        set({ isLoading: true, error: null });
        
        try {
          const response = await http.post<LoginResponse>('/auth/login/', payload);
          const { user, tokens } = response.data;
          
          http.setTokens(tokens.access, tokens.refresh);
          set({ user, isLoading: false });
          
          return { success: true };
        } catch (error: any) {
          const errorMessage = error.response?.data?.details?.non_field_errors?.[0] || 
                               error.response?.data?.error || 
                               'Login failed';
          set({ error: errorMessage, isLoading: false });
          return { success: false, error: errorMessage };
        }
      },
      
      logout: () => {
        http.clearTokens();
        set({ user: null, error: null });
      },
      
      fetchProfile: async () => {
        if (!http.isAuthenticated()) {
          return { success: false, error: 'Not authenticated' };
        }
        
        set({ isLoading: true, error: null });
        
        try {
          const response = await http.get<ProfileResponse>('/auth/profile/');
          const { user } = response.data;
          
          set({ user, isLoading: false });
          return { success: true };
        } catch (error: any) {
          const errorMessage = error.response?.data?.error || 'Failed to fetch profile';
          set({ error: errorMessage, isLoading: false, user: null });
          return { success: false, error: errorMessage };
        }
      },
      
      updateProfile: async (payload) => {
        set({ isUpdating: true, error: null });
        
        try {
          // Handle file upload with FormData
          const formData = new FormData();
          Object.entries(payload).forEach(([key, value]) => {
            if (value !== undefined && value !== null) {
              formData.append(key, value);
            }
          });
          
          const response = await http.patch<ProfileUpdateResponse>(
            '/auth/profile/update/',
            formData,
            {
              headers: {
                'Content-Type': 'multipart/form-data',
              },
            }
          );
          
          const { user } = response.data;
          set({ user, isUpdating: false });
          
          return { success: true };
        } catch (error: any) {
          const errorMessage = error.response?.data?.error || 'Failed to update profile';
          set({ error: errorMessage, isUpdating: false });
          return { success: false, error: errorMessage };
        }
      },
      
      clearError: () => {
        set({ error: null });
      },
      
      initializeAuth: async () => {
        if (http.isAuthenticated() && !get().user) {
          await get().fetchProfile();
        }
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ user: state.user }), // Only persist user
    }
  )
);
