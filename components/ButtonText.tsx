import useSession from "@utils/useSession";
import { useEffect, useState } from "react";

const ButtonText = ({ isLocal }: { isLocal: boolean }) => {
  const { status } = useSession();
  const [buttonText, setButtonText] = useState<string>();

  useEffect(() => {
    if (status === "authenticated") {
      setButtonText("Sign out");
    } else if (status === "unauthenticated" || isLocal) {
      setButtonText("Continue with GitHub");
    } else if (status === "loading") {
      setButtonText("Loading...");
    }
  }, [isLocal, status]);

  return <>{buttonText}</>;
};

export default ButtonText;
