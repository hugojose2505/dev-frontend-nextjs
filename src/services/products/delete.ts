import axios from "axios";

export async function deleteProduct(id: number) {
  try {
    const response = await axios.delete(
      `${process.env.NEXT_PUBLIC_API_URL}/products/${id}`
    );
    return response.data;
  } catch (error) {
    console.error("Erro ao deletar produto:", error);
    throw error;
  }
}
