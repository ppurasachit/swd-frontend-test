// src/app/layout.tsx
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import LayoutClient from './layoutClient';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'SWD Frontend Test',
  description: 'Frontend test application with React, TypeScript, and Ant Design',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <LayoutClient>
          {children}
        </LayoutClient>
      </body>
    </html>
  );
}