'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { authClient } from '@/lib/auth';

export default function Layout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const sessionData = authClient.useSession();

  useEffect(() => {
    if (
      !sessionData.isPending &&
      (sessionData.data === null || sessionData.error)
    ) {
      router.push('/login');
    }
  }, [sessionData, router]);

  return <>{children}</>;
}
