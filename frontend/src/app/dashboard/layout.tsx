/**
 * Fashion AI - Dashboard Layout
 */

'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from '@/components/layout/Sidebar';
import { useAuthStore } from '@/stores/auth-store';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [user, router]);



  if (!user) {
      return null; // Will redirect
  }

  return (
    <div className="min-h-screen pt-28 pb-12 bg-gray-50 dark:bg-[#1e1a14]">
      <div className="container-app">
        <div className="flex flex-col md:flex-row gap-8">
           {/* Sidebar */}
           <div className="md:shrink-0">
              <Sidebar />
           </div>

           {/* Content */}
           <div className="flex-1 min-w-0">
              {children}
           </div>
        </div>
      </div>
    </div>
  );
}
