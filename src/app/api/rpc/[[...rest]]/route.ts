import { RPCHandler } from '@orpc/server/fetch';
import type { Context } from '@/rpc/contracts/context';
import { router } from '@/rpc/implementations';
import { auth } from '@/server/auth';

const handler = new RPCHandler(router);

async function handleRequest(request: Request) {
  const context: Context = {
    authData: await auth.api.getSession({ headers: request.headers }),
  };
  const { response } = await handler.handle(request, {
    prefix: '/api/rpc',
    context,
  });

  return response ?? new Response('Not found', { status: 404 });
}

export const HEAD = handleRequest;
export const GET = handleRequest;
export const POST = handleRequest;
export const PUT = handleRequest;
export const PATCH = handleRequest;
export const DELETE = handleRequest;
