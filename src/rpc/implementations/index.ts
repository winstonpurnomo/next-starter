import { os } from './os';
import { resourceRouter } from './resources.router';

export const router = os.router({
  resources: resourceRouter,
});

export type Router = typeof router;
