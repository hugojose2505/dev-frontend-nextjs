import axios from "axios";
import { TUser } from "@/types/TUser";

export type CreateUserPayload = {
  username: string;
  email: string;
  password: string;
};

export async function createUser(
  payload: CreateUserPayload
): Promise<TUser> {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/users`,
      payload
    );
    return response.data;
  } catch (error) {
    console.error("Erro ao criar produto:", error);
    throw error;
  }
}
