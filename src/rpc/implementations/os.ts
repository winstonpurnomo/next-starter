import { implement, ORPCError } from '@orpc/server';
import { contractsRouter } from '../contracts';
import type { Context } from '../contracts/context';

export const os = implement(contractsRouter);

export const authMiddleware = os
  .$context<Context>()
  .middleware(({ context, next }) => {
    // Check that we have a valid session attached to this request
    if (context.authData?.session) {
      return next({
        context,
      });
    }

    throw new ORPCError('Unauthorized');
  });
