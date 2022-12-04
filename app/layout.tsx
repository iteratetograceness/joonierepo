import Nav from '../components/home/nav';
import { Inter } from '@next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <head />
      <body className={inter.className}>
        <Nav />
        {children}
      </body>
    </html>
  );
}
