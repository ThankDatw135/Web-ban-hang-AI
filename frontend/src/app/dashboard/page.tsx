/**
 * Fashion AI - Dashboard Overview (Redirect to Profile or Show Summary)
 */

import { redirect } from 'next/navigation';

export default function DashboardPage() {
  redirect('/dashboard/profile');
}
