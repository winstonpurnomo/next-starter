'use client';

import Link from 'next/link';
import { authClient } from '@/lib/auth';

export default function RouteComponent() {
  const { data: session, isPending } = authClient.useSession();

  if (isPending) {
    return (
      <div className="relative min-h-screen bg-gray-900">
        <div className="absolute top-4 right-4">
          <div className="h-10 w-32 animate-pulse rounded bg-gray-700" />
        </div>

        <div className="flex min-h-screen items-center justify-center">
          <h1 className="text-center font-bold text-6xl text-white">Welcome</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-gray-900">
      <div className="absolute top-4 right-4">
        {session ? (
          <Link
            className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
            href="/app/dashboard"
          >
            Dashboard
          </Link>
        ) : (
          <div className="space-x-2">
            <Link
              className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
              href="/login"
            >
              Login
            </Link>
            <Link
              className="rounded bg-green-600 px-4 py-2 text-white hover:bg-green-700"
              href="/register"
            >
              Register
            </Link>
          </div>
        )}
      </div>

      <div className="flex min-h-screen items-center justify-center">
        <h1 className="text-center font-bold text-6xl text-white">Welcome</h1>
      </div>
    </div>
  );
}
