'use client';

import Footer from '../components/common/footer';
import Nav from '../components/common/nav';
import './globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <head />{' '}
      <body key='body'>
        <Nav />
        {children}
        <Footer />
      </body>
    </html>
  );
}
