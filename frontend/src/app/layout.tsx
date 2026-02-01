/**
 * Fashion AI - Root Layout
 * 
 * Layout chính cho toàn bộ ứng dụng
 * Bao gồm: Fonts, Providers, Meta tags
 */

import type { Metadata, Viewport } from 'next';
import { QueryProvider } from '@/providers/query-provider';
import './globals.css';

// SEO Metadata
export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'),
  title: {
    default: 'Fashion AI - Thời trang tương lai',
    template: '%s | Fashion AI',
  },
  description: 'Trải nghiệm mua sắm đẳng cấp với công nghệ AI. Thử đồ ảo, gợi ý phong cách cá nhân hóa.',
  keywords: ['thời trang', 'AI', 'thử đồ ảo', 'virtual try-on', 'fashion', 'quần áo'],
  authors: [{ name: 'Fashion AI Team' }],
  creator: 'Fashion AI',
  openGraph: {
    type: 'website',
    locale: 'vi_VN',
    siteName: 'Fashion AI',
    title: 'Fashion AI - Thời trang tương lai',
    description: 'Trải nghiệm mua sắm đẳng cấp với công nghệ AI',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Fashion AI - Thời trang tương lai',
    description: 'Trải nghiệm mua sắm đẳng cấp với công nghệ AI',
  },
  robots: {
    index: true,
    follow: true,
  },
};

// Viewport configuration
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#FAF7F2' },
    { media: '(prefers-color-scheme: dark)', color: '#1e1a14' },
  ],
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="vi" className="light" suppressHydrationWarning>
      <head>
        {/* Preconnect to Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </head>
      <body className="font-sans bg-cream text-text-main antialiased">
        <QueryProvider>
          {/* Main content */}
          <div className="relative flex min-h-screen flex-col">
            {children}
          </div>
        </QueryProvider>
      </body>
    </html>
  );
}
