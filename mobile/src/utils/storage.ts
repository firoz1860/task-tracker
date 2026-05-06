import * as SecureStore from 'expo-secure-store';

const TOKEN_KEY = 'task_tracker_token';
const USER_KEY = 'task_tracker_user';

export const storage = {
  async getToken(): Promise<string | null> { return SecureStore.getItemAsync(TOKEN_KEY); },
  async setToken(token: string): Promise<void> { await SecureStore.setItemAsync(TOKEN_KEY, token); },
  async clearToken(): Promise<void> { await SecureStore.deleteItemAsync(TOKEN_KEY); },
  async getJson<T>(key: string): Promise<T | null> {
    const value = await SecureStore.getItemAsync(key);
    return value ? (JSON.parse(value) as T) : null;
  },
  async setJson<T>(key: string, value: T): Promise<void> { await SecureStore.setItemAsync(key, JSON.stringify(value)); },
  async clear(key: string): Promise<void> { await SecureStore.deleteItemAsync(key); },
  userKey: USER_KEY
};
