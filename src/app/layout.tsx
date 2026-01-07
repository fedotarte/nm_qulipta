import type { Metadata } from 'next';

import { Fira_Sans_Extra_Condensed } from 'next/font/google';
import { Header, Footer } from '@/components';

import './globals.css';

const firaSansExtraCondensed = Fira_Sans_Extra_Condensed({
  variable: '--font-fira',
  weight: '400',
  subsets: ['cyrillic' , 'latin'],
  display: 'swap'
});

export const metadata: Metadata = {
  title: 'КЬЮЛИПТА (Атогепант) — Профилактика мигрени',
  description:
    'Современный препарат нового поколения для профилактики мигрени. Информация для медицинских специалистов.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className={`${firaSansExtraCondensed.className} ${firaSansExtraCondensed.variable}`}>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
