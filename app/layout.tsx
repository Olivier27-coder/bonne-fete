import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Script from 'next/script';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Bonne Année 2026 - Meilleurs Vœux',
  description: 'Souhaitez la bonne année avec élégance. Partagez vos meilleurs vœux de succès, santé et prospérité.',
  keywords: ['bonne année', 'vœux', 'nouvel an', '2026', 'meilleurs vœux', 'félicitations'],
  authors: [{ name: 'Vœux 2025' }],
  manifest: '/manifest.json',
  themeColor: '#f59e0b',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'Vœux 2026',
  },
  openGraph: {
    title: 'Bonne Année 2026 - Meilleurs Vœux',
    description: 'Souhaitez la bonne année avec élégance',
    type: 'website',
    locale: 'fr_FR',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bonne Année 2026 - Meilleurs Vœux',
    description: 'Souhaitez la bonne année avec élégance',
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
    userScalable: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        <link rel="icon" type="image/png" sizes="192x192" href="/icon-192.png" />
        <link rel="icon" type="image/png" sizes="512x512" href="/icon-512.png" />
        <link rel="apple-touch-icon" href="/icon-192.png" />
      </head>
      <body className={inter.className}>
        {children}
        <Script id="register-sw" strategy="afterInteractive">
          {`
            if ('serviceWorker' in navigator) {
              window.addEventListener('load', function() {
                navigator.serviceWorker.register('/sw.js').then(
                  function(registration) {
                    console.log('ServiceWorker registration successful');
                  },
                  function(err) {
                    console.log('ServiceWorker registration failed: ', err);
                  }
                );
              });
            }
          `}
        </Script>
      </body>
    </html>
  );
}
