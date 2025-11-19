import type { Metadata } from "next";
import "./globals.css";
import { AppLayout } from "@/layout";

export const metadata: Metadata = {
  title: "Produtos - MaxUp",
  description: "Desafio técnico Frontend Next.js - MaxUp",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>
        <AppLayout>{children}</AppLayout>
      </body>
    </html>
  );
}
