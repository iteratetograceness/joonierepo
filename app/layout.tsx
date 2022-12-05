import Nav from '../components/home/nav';
import './globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <head />
      <body>
        <Nav />
        {children}
      </body>
    </html>
  );
}
