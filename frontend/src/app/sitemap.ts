import { MetadataRoute } from 'next';

/**
 * Dynamic Sitemap Generator - Fashion AI
 * 
 * Generates sitemap.xml for SEO
 */

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://wearly.vn';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Static pages
  const staticPages = [
    '',
    '/shop',
    '/collections',
    '/try-on',
    '/about',
    '/faq',
    '/support',
    '/privacy',
    '/returns',
    '/shipping',
    '/size-guide',
    '/stores',
    '/loyalty',
    '/magazine',
    '/gallery',
    '/exclusive',
    '/ai-stylist',
    '/body-scan',
    '/gift-finder',
  ];

  const staticRoutes: MetadataRoute.Sitemap = staticPages.map((page) => ({
    url: `${BASE_URL}${page}`,
    lastModified: new Date(),
    changeFrequency: page === '' ? 'daily' : 'weekly',
    priority: page === '' ? 1 : page === '/shop' ? 0.9 : 0.8,
  }));

  // Dynamic pages - Products
  // In production, fetch from API
  let productRoutes: MetadataRoute.Sitemap = [];
  try {
    // const products = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products?limit=1000`).then(r => r.json());
    // productRoutes = products.data.items.map((product: any) => ({
    //   url: `${BASE_URL}/products/${product.slug}`,
    //   lastModified: new Date(product.updatedAt),
    //   changeFrequency: 'weekly' as const,
    //   priority: 0.7,
    // }));
    
    // Placeholder for development
    productRoutes = [];
  } catch (error) {
    console.error('Failed to fetch products for sitemap:', error);
  }

  // Dynamic pages - Collections
  let collectionRoutes: MetadataRoute.Sitemap = [];
  try {
    // const collections = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/collections`).then(r => r.json());
    // collectionRoutes = collections.data.map((collection: any) => ({
    //   url: `${BASE_URL}/collections/${collection.slug}`,
    //   lastModified: new Date(collection.updatedAt),
    //   changeFrequency: 'weekly' as const,
    //   priority: 0.8,
    // }));
    
    // Placeholder for development
    collectionRoutes = [];
  } catch (error) {
    console.error('Failed to fetch collections for sitemap:', error);
  }

  return [...staticRoutes, ...productRoutes, ...collectionRoutes];
}
