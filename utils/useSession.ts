import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Session } from "next-auth";
import { useEffect, useState } from "react";

const getSession = async (): Promise<Session | null> => {
  const res = await axios.get("/api/auth/session");

  if (Object.keys(res.data).length) {
    return res.data;
  }

  return null;
};

const useSession = () => {
  const query = useQuery(["session"], getSession);
  const [status, setStatus] = useState<
    "loading" | "authenticated" | "unauthenticated"
  >();

  useEffect(() => {
    if (query.data) {
      setStatus("authenticated");
    } else if (query.data === null) {
      setStatus("unauthenticated");
    } else {
      setStatus("loading");
    }
  }, [query.data, query.status]);

  return {
    session: query.data,
    status: status,
  };
};

export default useSession;
