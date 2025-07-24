import { createORPCClient } from '@orpc/client';
import { RPCLink } from '@orpc/client/fetch';
import type { RouterClient } from '@orpc/server';
import { createTanstackQueryUtils } from '@orpc/tanstack-query';
import type { Router } from '@/rpc/implementations';

declare global {
  var $client: RouterClient<Router> | undefined;
}

const link = new RPCLink({
  url: () => {
    if (typeof window === 'undefined') {
      throw new Error('RPCLink is not allowed on the server side.');
    }

    return `${window.location.origin}/api/rpc`;
  },
});

/**
 * Fallback to client-side client if server-side client is not available.
 */
export const client: RouterClient<Router> =
  globalThis.$client ?? createORPCClient(link);

export const orpc = createTanstackQueryUtils(client);
