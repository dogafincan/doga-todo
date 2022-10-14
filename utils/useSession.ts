import { useContext } from "react";
import { SessionContext } from "@components/SessionProvider";

const useSession = () => {
  const { session, status } = useContext(SessionContext);
  return { session, status };
};

export default useSession;
