import axios from "axios";
import { useAuthStore } from "@/store/useAuthStore";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

api.interceptors.request.use(
  (config) => {
    const { token, expiresAt, clearAuth } = useAuthStore.getState();

    if (token) {
      const now = Date.now();

      if (expiresAt && expiresAt <= now) {
        clearAuth();
      }
    }

    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const { clearAuth } = useAuthStore.getState();

    if (error?.response?.status === 401) {
      clearAuth();
    }

    return Promise.reject(error);
  }
);
