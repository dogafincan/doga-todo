import { createContext, ReactNode, useEffect, useMemo, useState } from "react";
import { Session } from "next-auth";
import { useQuery } from "@tanstack/react-query";
import { SessionContextType, SessionStatus } from "@/utils/types";

const getSession = async (): Promise<Session | null> => {
  const response = await fetch("/api/auth/session", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();

  if (Object.keys(data).length) {
    return data;
  }

  return null;
};

export const SessionContext = createContext<SessionContextType>({
  session: undefined,
  status: "loading",
});

const SessionProvider = ({ children }: { children?: ReactNode }) => {
  const query = useQuery(["session"], getSession);
  const [status, setStatus] = useState<SessionStatus>("loading");

  useEffect(() => {
    if (query.data) {
      setStatus("authenticated");
    } else if (query.data === null) {
      setStatus("unauthenticated");
    } else {
      setStatus("loading");
    }
  }, [query.data]);

  const value = useMemo(
    () => ({
      session: query.data,
      status,
    }),
    [query.data, status]
  );

  return (
    <SessionContext.Provider value={value}>{children}</SessionContext.Provider>
  );
};

export default SessionProvider;
