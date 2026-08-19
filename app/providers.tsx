"use client";

import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { trpc } from "@/lib/trpc";
import { COOKIE_NAME, UNAUTHED_ERR_MSG } from "@shared/const";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink, TRPCClientError } from "@trpc/client";
import { useState } from "react";
import superjson from "superjson";
import { startLogin } from "@/const";

function getPreviewAuthorization() {
  try {
    const raw = sessionStorage.getItem("manus-cookie");
    if (!raw) return {};
    const prefix = `${COOKIE_NAME}=`;
    const pair = raw.split(";").find((entry) => entry.trim().startsWith(prefix));
    const token = pair?.trim().slice(prefix.length);
    return token ? { Authorization: `Bearer ${token}` } : {};
  } catch {
    return {};
  }
}

function redirectToLoginIfUnauthorized(error: unknown) {
  if (error instanceof TRPCClientError && error.message === UNAUTHED_ERR_MSG) startLogin();
}

export default function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => {
    const client = new QueryClient();
    client.getQueryCache().subscribe((event) => {
      if (event.type === "updated" && event.action.type === "error") redirectToLoginIfUnauthorized(event.query.state.error);
    });
    client.getMutationCache().subscribe((event) => {
      if (event.type === "updated" && event.action.type === "error") redirectToLoginIfUnauthorized(event.mutation.state.error);
    });
    return client;
  });
  const [trpcClient] = useState(() => trpc.createClient({ links: [httpBatchLink({ url: "/api/trpc", transformer: superjson, headers: getPreviewAuthorization, fetch: (input, init) => globalThis.fetch(input, { ...(init ?? {}), credentials: "include" }) })] }));

  return <trpc.Provider client={trpcClient} queryClient={queryClient}><QueryClientProvider client={queryClient}><ThemeProvider defaultTheme="light"><TooltipProvider>{children}<Toaster /></TooltipProvider></ThemeProvider></QueryClientProvider></trpc.Provider>;
}
