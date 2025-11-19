import { TUser } from "@/types/TUser";
import axios from "axios";

export async function updateUser(id: number, data: Partial<TUser>) {
  try {
    const response = await axios.put(
      `${process.env.NEXT_PUBLIC_API_URL}/users/${id}`,
      data
    );
    return response.data;
  } catch (error) {
    console.error("Erro ao atualizar usuário:", error);
    throw error;
  }
}
