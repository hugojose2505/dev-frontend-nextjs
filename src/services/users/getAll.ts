import axios from "axios";
import type { TUser } from "@/types/TUser";

export async function getAllUsers(): Promise<TUser[]> {
    try{
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users`);
        return response.data;
    } catch (error) {
        console.error("Failed to fetch users:", error);
        return [];
    }
}
