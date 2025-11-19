import type { Metadata } from "next";
import "./globals.css";
import { AppLayout } from "@/layout";

export const metadata: Metadata = {
  title: "Marketplace de Cosméticos",
  description: "Desafio de marketplace Fortnite style",
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
