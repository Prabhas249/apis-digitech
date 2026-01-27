import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import CookieConsent from '@/components/CookieConsent';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://apisdigitech.com'),
  title: {
    default: 'Apis Digitech | Dominate Search in the Age of AI',
    template: '%s | Apis Digitech',
  },
  description: 'Traditional SEO meets the future. We optimize your visibility across Google, ChatGPT, Perplexity, and every AI platform that matters. Expert SEO, AEO, and GEO services.',
  keywords: ['SEO services', 'search engine optimization', 'AI optimization', 'GEO', 'AEO', 'digital marketing', 'link building', 'content marketing', 'Texas SEO'],
  authors: [{ name: 'Apis Digitech Team' }],
  creator: 'Apis Digitech',
  publisher: 'Apis Digitech',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://apisdigitech.com',
    siteName: 'Apis Digitech',
    title: 'Apis Digitech | Dominate Search in the Age of AI',
    description: 'Traditional SEO meets the future. We optimize your visibility across Google, ChatGPT, Perplexity, and every AI platform that matters.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Apis Digitech - SEO & AI Optimization Services',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Apis Digitech | Dominate Search in the Age of AI',
    description: 'Traditional SEO meets the future. Expert SEO, AEO, and GEO services.',
    images: ['/og-image.png'],
    creator: '@apisdigitech',
  },
  verification: {
    google: 'your-google-verification-code',
  },
  alternates: {
    canonical: 'https://apisdigitech.com',
  },
  category: 'Digital Marketing',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${jetbrainsMono.variable}`}>
        {children}
        <CookieConsent />
      </body>
    </html>
  );
}
