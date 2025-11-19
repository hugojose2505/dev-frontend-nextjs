import { create } from "zustand";
import { jwtDecode } from "jwt-decode";

type JwtPayload = {
  exp?: number;
  name?: string;
  email?: string;
  avatarUrl?: string;
  sub?: string;
};

type User = {
  name: string;
  email: string;
  avatarUrl?: string;
};

type AuthState = {
  token: string | null;
  user: User | null;
  expiresAt: number | null;
  setToken: (token: string) => void;
  clearAuth: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  user: null,
  expiresAt: null,

  setToken: (token: string) => {
    let decoded: JwtPayload | null = null;

    try {
      decoded = jwtDecode<JwtPayload>(token);
    } catch (e) {
      console.error("Erro ao decodificar JWT:", e);
    }

    const expiresAt = decoded?.exp ? decoded.exp * 1000 : null;

    const user: User | null = decoded
      ? {
          name: decoded.name || "Usuário",
          email: decoded.email || "",
          avatarUrl: decoded.avatarUrl,
        }
      : null;

    set({
      token,
      user,
      expiresAt,
    });
  },

  clearAuth: () =>
    set({
      token: null,
      user: null,
      expiresAt: null,
    }),
}));
