import axios, { type AxiosError, type InternalAxiosRequestConfig } from 'axios';
import Constants from 'expo-constants';
import { storage } from '../utils/storage';

interface ExtraConfig {
  apiUrl?: string;
}

type UnauthorizedHandler = () => void;
let unauthorizedHandler: UnauthorizedHandler | null = null;

export const setUnauthorizedHandler = (handler: UnauthorizedHandler | null): void => {
  unauthorizedHandler = handler;
};

const extra = Constants.expoConfig?.extra as ExtraConfig | undefined;
const baseURL: string = extra?.apiUrl ?? 'http://localhost:5000';

export const apiClient = axios.create({ baseURL, timeout: 12000 });

apiClient.interceptors.request.use(async (config: InternalAxiosRequestConfig) => {
  const token = await storage.getToken();
  if (token) {
    config.headers.set('Authorization', `Bearer ${token}`);
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    if (error.response?.status === 401) {
      await storage.clearToken();
      unauthorizedHandler?.();
    }
    return Promise.reject(error);
  },
);
