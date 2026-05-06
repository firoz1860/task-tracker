import { apiClient } from './client';
import type { ApiResponse, AuthPayload } from '../types';

export interface LoginInput { email: string; password: string; }
export interface SignupInput { name: string; email: string; password: string; }

export const authApi = {
  async login(input: LoginInput): Promise<AuthPayload> {
    const { data } = await apiClient.post<ApiResponse<AuthPayload>>('/auth/login', input);
    return data.data;
  },
  async signup(input: SignupInput): Promise<AuthPayload> {
    const { data } = await apiClient.post<ApiResponse<AuthPayload>>('/auth/signup', input);
    return data.data;
  }
};
