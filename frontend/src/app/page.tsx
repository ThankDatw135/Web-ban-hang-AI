/**
 * Fashion AI - Homepage
 * 
 * Trang chủ với các sections: Hero, Featured Products, AI Try-on CTA, etc.
 */

import HomePageClient from './home-client';

// Force dynamic để tránh static generation timeout
export const dynamic = 'force-dynamic';

export default function HomePage() {
  return <HomePageClient />;
}
