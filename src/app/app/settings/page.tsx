'use client';

import { useForm } from '@tanstack/react-form';
import { useQuery } from '@tanstack/react-query';
import { SaveIcon } from 'lucide-react';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { authClient } from '@/lib/auth';
import { orpc } from '@/lib/rpc';

export default function RouteComponent() {
  const sessionData = authClient.useSession();
  const { theme, setTheme } = useTheme();

  const rpcQuery = useQuery(orpc.resources.get.queryOptions({ input: 1 }));

  const changeNameForm = useForm({
    defaultValues: {
      name: sessionData.data?.user.name ?? '',
    },
    onSubmit: async ({ value }) => {
      await authClient.updateUser(
        {
          name: value.name,
        },
        {
          onSuccess: () => {
            toast.success('Successfully updated name');
          },
          onError: (error) => {
            toast.error(error.error.message);
          },
        }
      );
    },
  });

  const changeEmailForm = useForm({
    defaultValues: {
      email: sessionData.data?.user.email ?? '',
    },
    onSubmit: async ({ value }) => {
      await authClient.changeEmail(
        {
          newEmail: value.email,
        },
        {
          onSuccess: () => {
            toast.success('Successfully updated email');
          },
          onError: (error) => {
            toast.error(error.error.message);
          },
        }
      );
    },
  });

  const changePasswordForm = useForm({
    defaultValues: {
      currentPassword: '',
      newPassword: '',
    },
    onSubmit: async ({ value }) => {
      await authClient.changePassword(
        {
          currentPassword: value.currentPassword,
          newPassword: value.newPassword,
        },
        {
          onSuccess: () => {
            toast.success('Successfully updated password');
          },
          onError: (error) => {
            toast.error(error.error.message);
          },
        }
      );
    },
  });

  return (
    <div className="flex min-h-screen flex-col gap-2 p-6">
      <Tabs className="mx-auto w-xl" defaultValue="profile">
        <TabsList>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
        </TabsList>
        <TabsContent
          className="flex flex-col gap-4 rounded-md bg-card p-4"
          value="profile"
        >
          <h1>Profile</h1>

          <form
            className="flex flex-col gap-4"
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              changeNameForm.handleSubmit();
            }}
          >
            <changeNameForm.Field name="name">
              {(field) => (
                <div className="flex gap-2">
                  <Input
                    className="max-w-sm"
                    onChange={(e) => field.setValue(e.target.value)}
                    placeholder="Full Name"
                    value={field.state.value}
                  />
                  <Button size="icon" type="submit">
                    <SaveIcon className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </changeNameForm.Field>
          </form>

          <form
            className="flex flex-col gap-4"
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              changeEmailForm.handleSubmit();
            }}
          >
            <changeEmailForm.Field name="email">
              {(field) => (
                <div className="flex gap-2">
                  <Input
                    className="max-w-sm"
                    onChange={(e) => field.setValue(e.target.value)}
                    placeholder="Email"
                    value={field.state.value}
                  />
                  <Button size="icon" type="submit">
                    <SaveIcon className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </changeEmailForm.Field>
          </form>

          <form
            className="flex flex-col gap-4"
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              changePasswordForm.handleSubmit();
            }}
          >
            <changePasswordForm.Field name="currentPassword">
              {(field) => (
                <div className="flex gap-2">
                  <Input
                    className="max-w-sm"
                    onChange={(e) => field.setValue(e.target.value)}
                    placeholder="Current Password"
                    type="password"
                    value={field.state.value}
                  />
                </div>
              )}
            </changePasswordForm.Field>

            <changePasswordForm.Field name="newPassword">
              {(field) => (
                <div className="flex gap-2">
                  <Input
                    className="max-w-sm"
                    onChange={(e) => field.setValue(e.target.value)}
                    placeholder="New Password"
                    type="password"
                    value={field.state.value}
                  />
                  <Button size="icon" type="submit">
                    <SaveIcon className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </changePasswordForm.Field>
          </form>

          {rpcQuery.isLoading ? (
            <div>Loading...</div>
          ) : (
            <div>
              <p>Name: {rpcQuery.data?.name}</p>
            </div>
          )}
          <Link href="/app/dashboard">
            <Button className="mt-6">Go to dashboard</Button>
          </Link>
        </TabsContent>
        <TabsContent
          className="flex flex-col gap-4 rounded-md bg-card p-4"
          value="appearance"
        >
          <h1>Appearance</h1>
          <div className="space-y-4">
            <div>
              <h3 className="font-medium text-sm">Theme</h3>
              <p className="text-muted-foreground text-xs">
                Select your preferred theme
              </p>
            </div>
            <Tabs
              onValueChange={(value) => setTheme(value)}
              value={theme || 'system'}
            >
              <TabsList>
                <TabsTrigger value="light">Light</TabsTrigger>
                <TabsTrigger value="dark">Dark</TabsTrigger>
                <TabsTrigger value="system">System</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
