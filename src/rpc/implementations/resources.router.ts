import { eq } from 'drizzle-orm';
import { db } from '@/db';
import { resource } from '@/db/schema/resource.schema';
import { os } from './os';

const getResources = os.resources.get.handler(async ({ input }) => {
  const [result] = await db
    .select()
    .from(resource)
    .where(eq(resource.id, input));
  return result;
});

export const resourceRouter = {
  get: getResources,
};
