import { useAuthStore } from "@/store/useAuthStore";
import axios from "axios";

export async function loginRequest(username: string, password: string) {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
      { username, password }
    );
    const token = response.data?.token;

    useAuthStore.getState().setToken(token);

    return response.data;
  } catch (error) {
    console.error("Erro ao fazer login:", error);
    throw error;
  }
}
