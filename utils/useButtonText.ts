import { useEffect, useState } from "react";
import useSession from "@/utils/useSession";

const useButtonText = () => {
  const { status } = useSession();
  const [buttonText, setButtonText] = useState("Loading...");

  useEffect(() => {
    if (status === "authenticated") {
      setButtonText("Sign out");
    } else if (status === "unauthenticated") {
      setButtonText("Sign in with GitHub");
    } else if (status === "loading") {
      setButtonText("Loading...");
    }
  }, [status]);

  return buttonText;
};

export default useButtonText;
