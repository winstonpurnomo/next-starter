import { oc } from '@orpc/contract';
import * as v from 'valibot';
import { resource } from '@/models/resource.model';

export const resourceContract = oc.input(v.number()).output(resource);

export const resourceRouterContract = {
  get: resourceContract,
};
