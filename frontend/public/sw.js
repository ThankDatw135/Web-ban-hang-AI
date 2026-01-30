/// <reference lib="webworker" />

/**
 * Service Worker - Fashion AI PWA
 * 
 * Handles offline caching and background sync
 */

declare const self: ServiceWorkerGlobalScope;

const CACHE_NAME = 'wearly-v1';
const STATIC_CACHE = 'wearly-static-v1';
const DYNAMIC_CACHE = 'wearly-dynamic-v1';
const IMAGE_CACHE = 'wearly-images-v1';

// Assets to cache on install
const STATIC_ASSETS = [
  '/',
  '/offline',
  '/manifest.json',
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png',
];

// Install event - cache static assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE).then((cache) => {
      console.log('[SW] Caching static assets');
      return cache.addAll(STATIC_ASSETS);
    })
  );
  self.skipWaiting();
});

// Activate event - clean old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys
          .filter((key) => key !== STATIC_CACHE && key !== DYNAMIC_CACHE && key !== IMAGE_CACHE)
          .map((key) => caches.delete(key))
      );
    })
  );
  self.clients.claim();
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') return;

  // Skip API calls and WebSocket
  if (url.pathname.startsWith('/api') || url.protocol === 'ws:' || url.protocol === 'wss:') {
    return;
  }

  // Handle images specially
  if (request.destination === 'image') {
    event.respondWith(cacheFirst(request, IMAGE_CACHE));
    return;
  }

  // Handle static assets
  if (isStaticAsset(url.pathname)) {
    event.respondWith(cacheFirst(request, STATIC_CACHE));
    return;
  }

  // Handle page navigations - network first with cache fallback
  if (request.mode === 'navigate') {
    event.respondWith(networkFirst(request, DYNAMIC_CACHE));
    return;
  }

  // Default: network first
  event.respondWith(networkFirst(request, DYNAMIC_CACHE));
});

// Cache first strategy
async function cacheFirst(request: Request, cacheName: string): Promise<Response> {
  const cached = await caches.match(request);
  if (cached) {
    return cached;
  }

  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(cacheName);
      cache.put(request, response.clone());
    }
    return response;
  } catch {
    return new Response('Offline', { status: 503 });
  }
}

// Network first strategy
async function networkFirst(request: Request, cacheName: string): Promise<Response> {
  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(cacheName);
      cache.put(request, response.clone());
    }
    return response;
  } catch {
    const cached = await caches.match(request);
    if (cached) {
      return cached;
    }

    // Return offline page for navigations
    if (request.mode === 'navigate') {
      const offlinePage = await caches.match('/offline');
      if (offlinePage) {
        return offlinePage;
      }
    }

    return new Response('Offline', { status: 503 });
  }
}

// Check if URL is a static asset
function isStaticAsset(pathname: string): boolean {
  return (
    pathname.startsWith('/_next/static') ||
    pathname.startsWith('/icons') ||
    pathname.startsWith('/images') ||
    pathname.endsWith('.js') ||
    pathname.endsWith('.css') ||
    pathname.endsWith('.woff2') ||
    pathname.endsWith('.woff')
  );
}

// Handle push notifications
self.addEventListener('push', (event) => {
  if (!event.data) return;

  try {
    const data = event.data.json();
    
    const options: NotificationOptions = {
      body: data.body || 'Bạn có thông báo mới',
      icon: '/icons/icon-192x192.png',
      badge: '/icons/badge-72x72.png',
      vibrate: [100, 50, 100],
      data: data.data || {},
      actions: data.actions || [],
      tag: data.tag || 'default',
      renotify: true,
    };

    event.waitUntil(
      self.registration.showNotification(data.title || 'WEARLY', options)
    );
  } catch (error) {
    console.error('[SW] Push notification error:', error);
  }
});

// Handle notification click
self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  const urlToOpen = event.notification.data?.url || '/';

  event.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clients) => {
      // Check if there's already a window open
      for (const client of clients) {
        if (client.url === urlToOpen && 'focus' in client) {
          return client.focus();
        }
      }
      // Open new window
      return self.clients.openWindow(urlToOpen);
    })
  );
});

// Background sync for offline actions
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-cart') {
    event.waitUntil(syncCart());
  } else if (event.tag === 'sync-wishlist') {
    event.waitUntil(syncWishlist());
  }
});

async function syncCart(): Promise<void> {
  // Implement cart sync logic
  console.log('[SW] Syncing cart...');
}

async function syncWishlist(): Promise<void> {
  // Implement wishlist sync logic
  console.log('[SW] Syncing wishlist...');
}

export {};
