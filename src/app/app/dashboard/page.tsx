import { headers } from 'next/headers';
import { Profile } from '@/components/profile';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { auth } from '@/server/auth';

export default async function () {
  const sessionData = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-2">
      <Card className="mx-auto w-lg p-6">
        <CardHeader>
          <CardTitle>Dashboard</CardTitle>
          <CardDescription> Hello {sessionData?.user.name}</CardDescription>
        </CardHeader>
      </Card>
      <Profile />
    </div>
  );
}
