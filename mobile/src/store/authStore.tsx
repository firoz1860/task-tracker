import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import type { User } from '../types';
import { storage } from '../utils/storage';

interface AuthContextValue {
  user: User | null;
  token: string | null;
  isBootstrapping: boolean;
  signIn: (user: User, token: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }): React.JSX.Element => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setTokenState] = useState<string | null>(null);
  const [isBootstrapping, setIsBootstrapping] = useState(true);

  useEffect(() => {
    const loadSession = async (): Promise<void> => {
      const storedToken = await storage.getToken();
      const storedUser = await storage.getJson<User>(storage.userKey);
      setTokenState(storedToken);
      setUser(storedUser);
      setIsBootstrapping(false);
    };
    void loadSession();
  }, []);

  const signIn = useCallback(async (nextUser: User, nextToken: string): Promise<void> => {
    await storage.setToken(nextToken);
    await storage.setJson(storage.userKey, nextUser);
    setUser(nextUser);
    setTokenState(nextToken);
  }, []);

  const signOut = useCallback(async (): Promise<void> => {
    await storage.clearToken();
    await storage.clear(storage.userKey);
    setUser(null);
    setTokenState(null);
  }, []);

  const value = useMemo(() => ({ user, token, isBootstrapping, signIn, signOut }), [user, token, isBootstrapping, signIn, signOut]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextValue => {
  const context = useContext(AuthContext);
  if (!context) { throw new Error('useAuth must be used inside AuthProvider'); }
  return context;
};
