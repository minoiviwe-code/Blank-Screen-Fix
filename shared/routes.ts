import { z } from 'zod';
import { insertUserSchema, insertPoolSchema, insertContributionSchema, users, pools, contributions } from './schema';

export const errorSchemas = {
  validation: z.object({
    message: z.string(),
    field: z.string().optional(),
  }),
  notFound: z.object({
    message: z.string(),
  }),
  internal: z.object({
    message: z.string(),
  }),
};

export const api = {
  auth: {
    login: {
      method: 'POST' as const,
      path: '/api/login' as const,
      input: insertUserSchema,
      responses: {
        200: z.custom<typeof users.$inferSelect>(),
        401: errorSchemas.validation,
      },
    },
    register: {
      method: 'POST' as const,
      path: '/api/register' as const,
      input: insertUserSchema,
      responses: {
        201: z.custom<typeof users.$inferSelect>(),
        400: errorSchemas.validation,
      },
    },
    me: {
      method: 'GET' as const,
      path: '/api/user' as const,
      responses: {
        200: z.custom<typeof users.$inferSelect>(),
        401: errorSchemas.validation,
      },
    },
    logout: {
      method: 'POST' as const,
      path: '/api/logout' as const,
      responses: {
        200: z.void(),
      },
    }
  },
  pools: {
    list: {
      method: 'GET' as const,
      path: '/api/pools' as const,
      responses: {
        200: z.array(z.custom<typeof pools.$inferSelect>()),
      },
    },
    get: {
      method: 'GET' as const,
      path: '/api/pools/:id' as const,
      responses: {
        200: z.custom<typeof pools.$inferSelect>(),
        404: errorSchemas.notFound,
      },
    },
    create: {
      method: 'POST' as const,
      path: '/api/pools' as const,
      input: insertPoolSchema,
      responses: {
        201: z.custom<typeof pools.$inferSelect>(),
        400: errorSchemas.validation,
      },
    },
  },
  contributions: {
    list: {
      method: 'GET' as const,
      path: '/api/contributions/:poolId' as const,
      responses: {
        200: z.array(z.custom<typeof contributions.$inferSelect>()),
      },
    },
    create: {
      method: 'POST' as const,
      path: '/api/contributions' as const,
      input: insertContributionSchema,
      responses: {
        201: z.custom<typeof contributions.$inferSelect>(),
        400: errorSchemas.validation,
      },
    },
  },
};

export function buildUrl(path: string, params?: Record<string, string | number>): string {
  let url = path;
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (url.includes(`:${key}`)) {
        url = url.replace(`:${key}`, String(value));
      }
    });
  }
  return url;
}
