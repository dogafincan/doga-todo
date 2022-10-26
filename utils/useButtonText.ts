import { useEffect, useState } from "react";
import useSession from "@/utils/useSession";

const useButtonText = (initialVisit: boolean) => {
  const { status } = useSession();
  const [buttonText, setButtonText] = useState("Loading...");

  useEffect(() => {
    if (status === "authenticated") {
      setButtonText("Sign out");
    } else if (status === "unauthenticated" || initialVisit) {
      setButtonText("Sign in with GitHub");
    } else if (status === "loading") {
      setButtonText("Loading...");
    }
  }, [initialVisit, status]);

  return buttonText;
};

export default useButtonText;
