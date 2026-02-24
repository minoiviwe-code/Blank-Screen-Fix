import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api, buildUrl } from "@shared/routes";
import { type InsertPool } from "@shared/schema";
import { z } from "zod";

function parseWithLogging<T>(schema: z.ZodSchema<T>, data: unknown, label: string): T {
  const result = schema.safeParse(data);
  if (!result.success) {
    console.error(`[Zod] ${label} validation failed:`, result.error.format());
    throw result.error;
  }
  return result.data;
}

export function usePools() {
  return useQuery({
    queryKey: [api.pools.list.path],
    queryFn: async () => {
      const res = await fetch(api.pools.list.path, { credentials: "include" });
      if (!res.ok) throw new Error("Failed to fetch pools");
      const data = await res.json();
      return parseWithLogging(api.pools.list.responses[200], data, "pools.list");
    },
  });
}

export function usePool(id: number) {
  return useQuery({
    queryKey: [api.pools.get.path, id],
    queryFn: async () => {
      if (!id || isNaN(id)) return null;
      const url = buildUrl(api.pools.get.path, { id });
      const res = await fetch(url, { credentials: "include" });
      if (res.status === 404) return null;
      if (!res.ok) throw new Error("Failed to fetch pool");
      const data = await res.json();
      return parseWithLogging(api.pools.get.responses[200], data, "pools.get");
    },
    enabled: !!id && !isNaN(id),
  });
}

export function useCreatePool() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (data: InsertPool) => {
      // Coerce numeric targetAmount before sending
      const coercedData = { ...data, targetAmount: String(data.targetAmount) };
      const validated = api.pools.create.input.parse(coercedData);
      const res = await fetch(api.pools.create.path, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validated),
        credentials: "include",
      });
      if (!res.ok) {
        if (res.status === 400) {
          const error = api.pools.create.responses[400].parse(await res.json());
          throw new Error(error.message);
        }
        throw new Error("Failed to create pool");
      }
      return api.pools.create.responses[201].parse(await res.json());
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.pools.list.path] });
    },
  });
}
