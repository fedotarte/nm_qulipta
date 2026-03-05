import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Glau showcase",
  description: "Лэндинг препарата Glau",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}
