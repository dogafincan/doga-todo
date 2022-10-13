import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { persistQueryClient } from "@tanstack/react-query-persist-client";
import { LazyMotion, domMax, MotionConfig } from "framer-motion";
import createIDBPersister from "@utils/createIDBPersister";
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
      <MotionConfig reducedMotion="user" transition={{ duration: 0.2 }}>
        <LazyMotion features={domMax} strict>
          <Component {...pageProps} />
        </LazyMotion>
      </MotionConfig>
    </QueryClientProvider>
  );
};

export default MyApp;
