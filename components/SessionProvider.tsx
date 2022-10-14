import { createContext, ReactNode, useEffect, useState } from "react";
import { SessionContextType, SessionStatus } from "@utils/types";
import { Session } from "next-auth";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const getSession = async (): Promise<Session | null> => {
  const res = await axios.get("/api/auth/session");

  if (Object.keys(res.data).length) {
    return res.data;
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

  return (
    <SessionContext.Provider value={{ session: query.data, status }}>
      {children}
    </SessionContext.Provider>
  );
};

export default SessionProvider;
