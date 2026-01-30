'use client';

/**
 * PWA Provider - Service Worker Registration
 */

import { useEffect } from 'react';

export function PWAProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
      // Register service worker
      navigator.serviceWorker
        .register('/sw.js')
        .then((registration) => {
          console.log('[PWA] Service Worker registered:', registration.scope);

          // Check for updates
          registration.addEventListener('updatefound', () => {
            const newWorker = registration.installing;
            if (newWorker) {
              newWorker.addEventListener('statechange', () => {
                if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                  // New content available, show update prompt
                  if (confirm('Có phiên bản mới! Bạn có muốn cập nhật không?')) {
                    newWorker.postMessage({ type: 'SKIP_WAITING' });
                    window.location.reload();
                  }
                }
              });
            }
          });
        })
        .catch((error) => {
          console.error('[PWA] Service Worker registration failed:', error);
        });

      // Handle controller change (new SW activated)
      navigator.serviceWorker.addEventListener('controllerchange', () => {
        console.log('[PWA] New Service Worker activated');
      });
    }
  }, []);

  return <>{children}</>;
}

// Hook to check if app is installed as PWA
export function useIsPWA(): boolean {
  if (typeof window === 'undefined') return false;
  
  return (
    window.matchMedia('(display-mode: standalone)').matches ||
    (window.navigator as any).standalone === true
  );
}

// Hook to prompt PWA installation
export function usePWAInstall() {
  useEffect(() => {
    let deferredPrompt: any = null;

    const handleBeforeInstall = (e: Event) => {
      e.preventDefault();
      deferredPrompt = e;
      // Store for later use
      (window as any).deferredPWAPrompt = deferredPrompt;
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstall);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
    };
  }, []);

  const promptInstall = async (): Promise<boolean> => {
    const deferredPrompt = (window as any).deferredPWAPrompt;
    if (!deferredPrompt) return false;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    (window as any).deferredPWAPrompt = null;

    return outcome === 'accepted';
  };

  return { promptInstall };
}

export default PWAProvider;
