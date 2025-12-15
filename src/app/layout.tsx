'use client';

import { Nunito } from 'next/font/google';
import '../styles/globals.css';
import Providers from '@/providers/provider';
import clsx from 'clsx';

const nunito = Nunito({
  variable: '--font-nunito',
  subsets: ['latin'],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={clsx(nunito.variable, `antialiased`)}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
