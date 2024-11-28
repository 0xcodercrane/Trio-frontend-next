import './globals.css';
import Header from '@/components/Header';
import { Metadata } from 'next';
import { DEFAULT_METADATA } from '@/lib/constants';
import Providers from './providers';
import { getServerSession } from 'next-auth';
import localFont from 'next/font/local';

import Footer from '@/components/Footer';
import { authOptions } from '@/lib/auth';
import { Toaster } from 'sonner';
import MenuPanes from '@/components/MenuPanes';

const satoshiVariable = localFont({
  src: [
    {
      path: '../../public/fonts/Satoshi-Variable.ttf'
    },
    {
      path: '../../public/fonts/Satoshi-VariableItalic.ttf',
      style: 'italic'
    }
  ],
  variable: '--font-satoshi-variable'
});

export const metadata: Metadata = DEFAULT_METADATA;

export default async function RootLayout({
  children
}: Readonly<{
  children: NonNullable<React.ReactNode>;
}>) {
  const session = await getServerSession(authOptions);

  return (
    <html lang='en' suppressHydrationWarning>
      <body className={`${satoshiVariable.variable} bg-ob-purple-darkest font-sans`}>
        <Providers session={session}>
          <Header />
          {children}
          <Footer />
          <MenuPanes />
          <Toaster richColors />
        </Providers>
      </body>
    </html>
  );
}
