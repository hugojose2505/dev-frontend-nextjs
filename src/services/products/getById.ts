import axios from "axios";

export async function getProductById(id: string) {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/products/${id}`
    );
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar produto por ID:", error);
    throw error;
  }
}
