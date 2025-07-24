'use client';

import { ChevronsUpDown, LogOut, Settings } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { authClient } from '@/lib/auth';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { Skeleton } from './ui/skeleton';

export function Profile() {
  const sessionData = authClient.useSession();
  const router = useRouter();

  if (sessionData.data === null) {
    <button
      className="flex items-center space-x-3 rounded-lg border bg-card p-2 transition-colors hover:bg-accent hover:text-accent-foreground"
      disabled
      type="button"
    >
      <div className="h-8 w-8">
        <Skeleton className="h-full w-full" />
      </div>
      <div className="flex flex-col items-start">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-4 w-32" />
      </div>
      <ChevronsUpDown className="h-4 w-4 text-muted-foreground" />
    </button>;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className="flex items-center space-x-3 rounded-lg border bg-card p-2 transition-colors hover:bg-accent hover:text-accent-foreground"
          type="button"
        >
          <Avatar className="h-8 w-8">
            <AvatarImage
              alt={sessionData.data?.user.name}
              src={sessionData.data?.user.image ?? undefined}
            />
            <AvatarFallback className="text-sm">
              {sessionData.data?.user.name?.charAt(0)?.toUpperCase() || 'U'}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col items-start">
            <span className="font-medium text-sm">
              {sessionData.data?.user.name}
            </span>
            <span className="text-muted-foreground text-xs">
              {sessionData.data?.user.email}
            </span>
          </div>
          <ChevronsUpDown className="h-4 w-4 text-muted-foreground" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>
          <div className="flex flex-col space-y-1">
            <p className="font-medium text-sm">{sessionData.data?.user.name}</p>
            <p className="text-muted-foreground text-xs">
              {sessionData.data?.user.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <Link href="/app/settings">
          <DropdownMenuItem>
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </DropdownMenuItem>
        </Link>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={async () => {
            await authClient.signOut(
              {},
              {
                onSuccess: () => {
                  toast.success('Successfully logged out!');
                  router.push('/');
                },
                onError: () => {
                  toast.error('Failed to log out');
                },
              }
            );
          }}
        >
          <LogOut className="mr-2 h-4 w-4" />
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
