"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode, useState } from "react";

export default function Providers({ children }: { children: ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: 0,
            refetchOnMount: "always", // Refetch on mount
            refetchOnWindowFocus: false, // Disable refetching on window focus
            refetchOnReconnect: true, // When network connectivity is restored,
            refetchInterval: 10000, // Disable polling
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
