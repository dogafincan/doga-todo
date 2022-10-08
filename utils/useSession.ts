import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Session } from "next-auth";

const getSession = async (): Promise<Session | null> => {
  const res = await axios.get("/api/auth/session");

  if (Object.keys(res.data).length) {
    return res.data;
  }

  return null;
};

const useSession = () => {
  const query = useQuery(["session"], getSession);
  return { session: query.data, status: query.status };
};

export default useSession;
