import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { persistQueryClient } from "@tanstack/react-query-persist-client";
import { LazyMotion, domMax, MotionConfig } from "framer-motion";
import SessionProvider from "@/components/SessionProvider";
import createIDBPersister from "@/utils/createIDBPersister";
import "@/styles/globals.css";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: Infinity,
    },
  },
});

// The React Query cache lives in memory and is removed when the browser is
// reloaded or the user hits refresh. This can result in longer load times.
// Persisting the React Query cache using IndexedDB is one way to ensure
// that local data is available in those cases.
if (typeof window !== "undefined") {
  const persister = createIDBPersister();
  persistQueryClient({ queryClient, persister, maxAge: Infinity });
}

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider>
        <MotionConfig reducedMotion="user">
          <LazyMotion features={domMax} strict>
            <Component {...pageProps} />
          </LazyMotion>
        </MotionConfig>
      </SessionProvider>
    </QueryClientProvider>
  );
};

export default MyApp;
