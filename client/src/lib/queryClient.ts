import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: async ({ queryKey }) => {
        const [url] = queryKey as [string];
        const response = await fetch(url, {
          credentials: "include",
        });

        if (!response.ok) {
          if (response.status >= 500) {
            throw new Error(`${response.status}: ${response.statusText}`);
          }

          throw new Error(`${response.status}: ${await response.text()}`);
        }

        return response.json();
      },
      refetchOnWindowFocus: false,
      staleTime: 1000,
    },
    mutations: {
      onError: (error) => {
        console.error("Mutation error:", error);
      },
    },
  },
});

export async function apiRequest(url: string, options?: RequestInit) {
  const response = await fetch(url, {
    ...options,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(error || response.statusText);
  }

  if (response.status === 204) {
    return null;
  }

  return response.json();
}
