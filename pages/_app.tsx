import type { AppProps } from "next/app";
import type { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MotionConfig } from "framer-motion";
import "@styles/globals.css";

const queryClient = new QueryClient();

const MyApp = ({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps<{ session: Session }>) => {
  return (
    <SessionProvider session={session}>
      <QueryClientProvider client={queryClient}>
        <MotionConfig reducedMotion="user">
          <Component {...pageProps} />
        </MotionConfig>
      </QueryClientProvider>
    </SessionProvider>
  );
};

export default MyApp;
