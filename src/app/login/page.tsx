'use client';

import { useForm } from '@tanstack/react-form';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { authClient } from '@/lib/auth';

export default function RouteComponent() {
  const router = useRouter();
  const form = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    onSubmit: async ({ value }) =>
      await authClient.signIn.email(
        {
          email: value.email,
          password: value.password,
        },
        {
          onSuccess: () => {
            toast.success('Successfully logged in!');
            router.push('/app/dashboard');
          },
          onError: (error) => {
            toast.error(error.error.message);
          },
        }
      ),
  });

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-900 p-4">
      <Card className="mx-auto w-lg p-6">
        <form
          className="flex flex-col gap-4"
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
        >
          <form.Field name="email">
            {(field) => (
              <Input
                onChange={(e) => field.setValue(e.target.value)}
                placeholder="Email"
                value={field.state.value}
              />
            )}
          </form.Field>

          <form.Field name="password">
            {(field) => (
              <Input
                onChange={(e) => field.setValue(e.target.value)}
                placeholder="Password"
                type="password"
                value={field.state.value}
              />
            )}
          </form.Field>

          <Button disabled={form.state.isSubmitting} type="submit">
            {form.state.isSubmitting ? 'Signing in...' : 'Sign In'}
          </Button>

          <Link
            className="font-medium text-blue-400 text-sm hover:text-blue-300"
            href="/register"
          >
            Don't have an account?{' '}
          </Link>
        </form>
      </Card>
    </div>
  );
}
