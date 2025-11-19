import axios from "axios";

export async function deleteUser(id: number) {
  try {
    const response = await axios.delete(
      `${process.env.NEXT_PUBLIC_API_URL}/users/${id}`
    );
    return response.data;
  } catch (error) {
    console.error("Erro ao deletar usuário:", error);
    throw error;
  }
}
