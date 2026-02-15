import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Toaster } from '@/components/ui/toaster';
import { FloatingCallButton } from '@/components/layout/FloatingCallButton';

const inter = Inter({ subsets: ['latin'], variable: '--font-body' });

export const metadata: Metadata = {
  title: 'James Bond Cleaners | Trusted Bond Cleaning on the Gold Coast',
  description:
    'Professional end-of-lease cleaning on the Gold Coast that helps you secure your full bond refund. Reliable, detail-oriented, and real estate-approved.',
  keywords: [
    'Bond Cleaning Gold Coast',
    'End of Lease Cleaning Gold Coast',
    'Exit Cleaning Gold Coast',
    'Carpet Cleaning Gold Coast',
    'Deep Cleaning Gold Coast',
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased',
          inter.variable
        )}
      >
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
        <FloatingCallButton />
        <Toaster />
      </body>
    </html>
  );
}
