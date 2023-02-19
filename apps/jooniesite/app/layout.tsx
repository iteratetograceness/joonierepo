'use client';

import { Navigation } from '~/components/common/navigation';
import { libreFranklin } from '~/utils/fonts';
import { MotionConfig } from 'framer-motion';
import './globals.css';
import { Footer } from '~/components/common/footer';
import { AnalyticsWrapper } from '~/components/common/analytics';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <head />
      <body className={libreFranklin.className}>
        <MotionConfig reducedMotion='user'>
          <Navigation />
          {children}
          <Footer />
        </MotionConfig>
        <AnalyticsWrapper />
      </body>
    </html>
  );
}
