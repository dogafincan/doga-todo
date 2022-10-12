import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { persistQueryClient } from "@tanstack/react-query-persist-client";
import createIDBPersister from "@utils/createIDBPersister";
import { MotionConfig } from "framer-motion";
import "@styles/globals.css";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: Infinity,
    },
  },
});

if (typeof window !== "undefined") {
  const persister = createIDBPersister();
  persistQueryClient({ queryClient, persister, maxAge: Infinity });
}

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <QueryClientProvider client={queryClient}>
      <MotionConfig reducedMotion="user">
        <Component {...pageProps} />
      </MotionConfig>
    </QueryClientProvider>
  );
};

export default MyApp;
