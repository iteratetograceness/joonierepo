import Nav from '../components/common/nav';
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
