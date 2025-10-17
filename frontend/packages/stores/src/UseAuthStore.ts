import { create } from 'zustand';
import type { User, AuthTokens } from '@hike-tracker/shared-types';

type AuthState = {
  user: User | null;
  tokens: AuthTokens | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  setUser: (user: User | null) => void;
  setTokens: (tokens: AuthTokens | null) => void;
  setAuth: (user: User | null, tokens: AuthTokens | null) => void;
  setLoading: (loading: boolean) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  tokens: null,
  isAuthenticated: false,
  isLoading: true,

  setUser: (user) =>
    set({
      user,
      isAuthenticated: !!user,
    }),

  setTokens: (tokens) =>
    set({
      tokens,
    }),

  setAuth: (user, tokens) =>
    set({
      user,
      tokens,
      isAuthenticated: !!user && !!tokens,
      isLoading: false,
    }),

  setLoading: (loading) =>
    set({
      isLoading: loading,
    }),

  logout: () =>
    set({
      user: null,
      tokens: null,
      isAuthenticated: false,
      isLoading: false,
    }),
}));