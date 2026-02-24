import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api, buildUrl } from "@shared/routes";
import { type InsertContribution } from "@shared/schema";
import { z } from "zod";

function parseWithLogging<T>(schema: z.ZodSchema<T>, data: unknown, label: string): T {
  const result = schema.safeParse(data);
  if (!result.success) {
    console.error(`[Zod] ${label} validation failed:`, result.error.format());
    throw result.error;
  }
  return result.data;
}

export function useContributions(poolId: number) {
  return useQuery({
    queryKey: ['contributions', poolId],
    queryFn: async () => {
      if (!poolId || isNaN(poolId)) return [];
      const url = buildUrl(api.contributions.list.path, { poolId });
      const res = await fetch(url, { credentials: "include" });
      if (!res.ok) throw new Error("Failed to fetch contributions");
      const data = await res.json();
      return parseWithLogging(api.contributions.list.responses[200], data, "contributions.list");
    },
    enabled: !!poolId && !isNaN(poolId),
  });
}

export function useCreateContribution() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (data: InsertContribution) => {
      const coercedData = { ...data, amount: String(data.amount) };
      const validated = api.contributions.create.input.parse(coercedData);
      
      const res = await fetch(api.contributions.create.path, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validated),
        credentials: "include",
      });
      if (!res.ok) {
        if (res.status === 400) {
          const error = api.contributions.create.responses[400].parse(await res.json());
          throw new Error(error.message);
        }
        throw new Error("Failed to create contribution");
      }
      return api.contributions.create.responses[201].parse(await res.json());
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['contributions', variables.poolId] });
      queryClient.invalidateQueries({ queryKey: [api.pools.get.path, variables.poolId] });
    },
  });
}
