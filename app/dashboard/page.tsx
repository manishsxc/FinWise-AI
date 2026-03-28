import type { Metadata } from 'next';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { DashboardClient } from '@/components/pages/DashboardClient';

export const metadata: Metadata = { title: 'Dashboard — FinWise AI' };

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <DashboardClient />
    </DashboardLayout>
  );
}
