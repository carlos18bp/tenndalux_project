/**
 * User-related TypeScript types.
 * 
 * Defines interfaces for user data, authentication payloads,
 * and API responses.
 */

export interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  full_name: string;
  phone: string;
  avatar: string | null;
  is_active: boolean;
  date_joined: string;
  last_login: string | null;
}

export interface AuthTokens {
  access: string;
  refresh: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  email: string;
  password: string;
  password_confirm: string;
  first_name?: string;
  last_name?: string;
  phone?: string;
}

export interface UpdateProfilePayload {
  first_name?: string;
  last_name?: string;
  phone?: string;
  avatar?: File;
}

// API Response types
export interface ApiResponse<T> {
  message?: string;
  error?: string;
  details?: any;
  data?: T;
}

export interface LoginResponse {
  message: string;
  user: User;
  tokens: AuthTokens;
}

export interface RegisterResponse {
  message: string;
  user: User;
  tokens: AuthTokens;
}

export interface ProfileResponse {
  user: User;
}

export interface ProfileUpdateResponse {
  message: string;
  user: User;
}
