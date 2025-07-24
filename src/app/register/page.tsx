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
      name: '',
      email: '',
      password: '',
    },
    onSubmit: ({ value }) => {
      authClient.signUp.email(
        {
          name: value.name,
          email: value.email,
          password: value.password,
        },
        {
          onSuccess: () => {
            toast.success('Successfully registered!');
            router.push('/app/dashboard');
          },
          onError: (error) => {
            toast.success(JSON.stringify(error));
          },
        }
      );
    },
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
          <form.Field name="name">
            {(field) => (
              <Input
                onChange={(e) => field.setValue(e.target.value)}
                placeholder="Full Name"
                value={field.state.value}
              />
            )}
          </form.Field>

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

          <Button type="submit">
            {form.state.isSubmitting ? 'Creating account...' : 'Create Account'}
          </Button>

          <Link
            className="font-medium text-blue-400 text-sm hover:text-blue-300"
            href="/login"
          >
            Already have an account?{' '}
          </Link>
        </form>
      </Card>
    </div>
  );
}
