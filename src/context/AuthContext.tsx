import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { profileUser } from '../api/profile/profileUser';

interface AuthContextValue {
  userId: string | null;
  setUserId: (id: string) => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;
    (async () => {
      try {
        const profile = await profileUser();
        setUserId(profile.id);
      } catch {
        setUserId(null);
      }
    })();
  }, []);

  return (
    <AuthContext.Provider value={{ userId, setUserId }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextValue => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return ctx;
};

