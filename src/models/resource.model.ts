import * as v from 'valibot';

export const resource = v.object({
  id: v.number(),
  name: v.string(),
  description: v.string(),
  createdBy: v.nullable(v.string()),
  createdAt: v.date(),
  updatedAt: v.date(),
});

export type Resource = v.InferInput<typeof resource>;
