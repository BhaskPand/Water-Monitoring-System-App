import { create } from 'zustand';

type User = {
  id: string;
  name: string;
  role: 'home' | 'office' | 'admin';
  locations: string[];
};

type AuthState = {
  token: string | null;
  user: User | null;
  isAuthenticated: boolean;
  login: (payload: { token: string; user: User }) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  user: null,
  isAuthenticated: false,
  login: ({ token, user }) => set({ token, user, isAuthenticated: true }),
  logout: () => set({ token: null, user: null, isAuthenticated: false }),
}));

