import { memo } from "react";
import { signIn, signOut } from "next-auth/react";
import { useQueryClient } from "@tanstack/react-query";
import { m } from "framer-motion";
import Cookie from "js-cookie";
import { FaGithub } from "react-icons/fa";
import useSession from "../utils/useSession";
import useButtonText from "../utils/useButtonText";

const LoginButton = memo(function LoginButton({
  initialVisit,
}: {
  initialVisit: boolean;
}) {
  const { status } = useSession();
  const queryClient = useQueryClient();
  const buttonText = useButtonText(initialVisit);

  const handleClick = () => {
    if (status === "authenticated") {
      Cookie.set("initialVisit", "true");
      signOut();
    } else if (status === "unauthenticated" || initialVisit) {
      signIn("github");
    }
    queryClient.clear();
  };

  return (
    <m.button
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
      disabled={status === "loading" && !initialVisit}
      className={`rounded-md bg-neutral-800 px-4 py-2 text-slate-50 shadow duration-200 ease-linear hover:bg-neutral-700 focus:outline-0 focus:ring-4 focus:ring-blue-400 motion-reduce:transition sm:mt-1 sm:px-10 ${
        status === "loading" && !initialVisit ? "animate-pulse" : ""
      }`}
      onClick={handleClick}
    >
      <p className="flex items-center gap-x-2">
        <FaGithub />
        {buttonText}
      </p>
    </m.button>
  );
});

export default LoginButton;
