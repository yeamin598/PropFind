"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { useSession, signIn, signOut } from 'next-auth/react';

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const { data: session, status } = useSession();
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    setIsLoading(status === 'loading');
  }, [status]);

  const login = async (email: string, password: string) => {
      try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        throw new Error(result.error);
        }
      } catch (error) {
      console.error('Login failed:', error);
      throw error;
      }
  };

  const logout = async () => {
    try {
      await signOut({ redirect: false });
      router.push('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const user = session?.user ? {
    id: session.user.id,
    name: session.user.name || '',
    email: session.user.email || '',
  } : null;

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
} 