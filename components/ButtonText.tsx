import useSession from "@utils/useSession";
import { useEffect, useState } from "react";

const ButtonText = ({ initialVisit }: { initialVisit: boolean }) => {
  const { status } = useSession();
  const [buttonText, setButtonText] = useState("Loading...");

  useEffect(() => {
    if (status === "authenticated") {
      setButtonText("Sign out");
    } else if (status === "unauthenticated" || initialVisit) {
      setButtonText("Continue with GitHub");
    } else if (status === "loading") {
      setButtonText("Loading...");
    }
  }, [initialVisit, status]);

  return <>{buttonText}</>;
};

export default ButtonText;
