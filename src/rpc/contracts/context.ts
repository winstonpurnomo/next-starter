import type { Session, User } from 'better-auth';

export type Context = {
  authData: {
    session: Session | null;
    user: User | null;
  } | null;
};
