import type { Metadata } from "next";
import { } from "next/font/google";
import "./globals.css";

export const metadata: Metadata = {
  title: "UniOdonto",
  description: "Gerenciamentode pacientes para clíncias odontológicas",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body className={`antialiased`} suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
