import axios from "axios";
import { TProduct } from "@/types/TProduct";

export type CreateProductPayload = {
  title: string;
  price: number;
  description: string;
  image: string;
  category: string;
};

export async function createProduct(
  payload: CreateProductPayload
): Promise<TProduct> {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/products`,
      payload
    );
    return response.data;
  } catch (error) {
    console.error("Erro ao criar produto:", error);
    throw error;
  }
}
