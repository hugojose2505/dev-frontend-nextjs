import axios from "axios";
export async function getAllProducts() {
  try {
    const data = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/products`);
    return data;
  } catch (error) {
    console.error("Erro ao buscar produtos:", error);
    return null;
  }
}
