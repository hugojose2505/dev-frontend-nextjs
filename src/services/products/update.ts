import { TProduct } from "@/types/TProduct";
import axios from "axios";

export async function updateProduct(id: number, data: Partial<TProduct>) {
  try {
    const response = await axios.put(
      `${process.env.NEXT_PUBLIC_API_URL}/products/${id}`,
      data
    );
    return response.data;
  } catch (error) {
    console.error("Erro ao atualizar produto:", error);
    throw error;
  }
}
