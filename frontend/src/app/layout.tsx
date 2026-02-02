/**
 * Fashion AI - Root Layout
 * 
 * Layout chính của ứng dụng, bao gồm:
 * - Import fonts (Manrope)
 * - Providers (Theme, Auth, etc.)
 * - Header & Footer components
 */

import type { Metadata } from 'next';
import { Manrope } from 'next/font/google';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

// Font configuration - Manrope cho toàn bộ app
const manrope = Manrope({
  subsets: ['latin', 'vietnamese'],
  weight: ['200', '300', '400', '500', '600', '700', '800'],
  variable: '--font-manrope',
  display: 'swap',
});

// Metadata cho SEO
export const metadata: Metadata = {
  title: {
    default: 'Fashion AI - Thời trang cao cấp kết hợp AI',
    template: '%s | Fashion AI',
  },
  description: 'Khám phá phong cách của riêng bạn với Fashion AI. Thử đồ trực tuyến với công nghệ AI tiên tiến.',
  keywords: ['thời trang', 'fashion', 'AI', 'try-on', 'quần áo', 'mua sắm online'],
  authors: [{ name: 'Fashion AI Team' }],
  openGraph: {
    title: 'Fashion AI - Thời trang cao cấp kết hợp AI',
    description: 'Khám phá phong cách của riêng bạn với Fashion AI',
    url: 'https://fashionai.vn',
    siteName: 'Fashion AI',
    locale: 'vi_VN',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi" className={manrope.variable} suppressHydrationWarning>
      <head>
        {/* Favicon */}
        <link rel="icon" href="/logo.png" />
        <link rel="apple-touch-icon" href="/logo.png" />
      </head>
      <body className="min-h-screen bg-cream dark:bg-[#1e1a14] text-text-main dark:text-white antialiased flex flex-col">
        {/* TODO: Thêm Providers (ThemeProvider, AuthProvider) */}
        
        {/* Header */}
        <Header />
        
        {/* Main content - có padding-top cho header */}
        <main className="flex-1 pt-28">
          {children}
        </main>
        
        {/* Footer */}
        <Footer />
        
        {/* TODO: Thêm Live Chat Widget */}
      </body>
    </html>
  );
}

