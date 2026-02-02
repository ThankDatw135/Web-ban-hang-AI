/**
 * Fashion AI - Admin Layout
 */

'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/stores/auth-store';
import AdminSidebar from '@/components/admin/AdminSidebar';
import { Loader2 } from 'lucide-react';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isAuthenticated } = useAuthStore();
  const router = useRouter();
  const isLoading = false; // Mock or remove loading check

  useEffect(() => {
    if (!isAuthenticated) {
        router.push('/login');
    } else if (user?.role !== 'ADMIN') { // Check role
        router.push('/dashboard');
    }
  }, [isAuthenticated, user, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  // Prevent flash of content
  if (!isAuthenticated || user?.role !== 'ADMIN') return null;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#121212]">
      <AdminSidebar />
      <div className="pl-64">
           {/* Maybe add a Topbar later */}
          <main className="p-8">
            {children}
          </main>
      </div>
    </div>
  );
}
