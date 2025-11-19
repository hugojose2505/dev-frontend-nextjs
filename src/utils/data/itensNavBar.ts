import { GiClothes } from "react-icons/gi";
import { FaUsers } from "react-icons/fa";
import maxUp from "@/assets/icone.jpg";

export const data = {
  teams: [
    {
      name: "MaxUp",
      logo: maxUp,
      plan: "Sistema listagem de produtos",
      logoType: "image",
      path: "/",
    },
  ],
  navMain: [
    {
      title: "Produtos",
      to: "/",
      icon: GiClothes,
    },
    {
      title: "Usuários",
      to: "/users",
      icon: FaUsers,
    },
  ],
};
