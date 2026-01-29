import type { Metadata } from 'next';
import './globals.css';
import { Providers } from './providers';

export const metadata: Metadata = {
  title: 'Fashion AI - Thời Trang Thông Minh',
  description: 'Mua sắm thời trang với công nghệ AI - Thử đồ ảo, gợi ý size thông minh, hỗ trợ 24/7',
  keywords: ['fashion', 'AI', 'thời trang', 'thử đồ ảo', 'virtual try-on'],
  authors: [{ name: 'Fashion AI Team' }],
  openGraph: {
    title: 'Fashion AI - Thời Trang Thông Minh',
    description: 'Mua sắm thời trang với công nghệ AI',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
