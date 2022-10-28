import { memo } from "react";
import { signIn, signOut } from "next-auth/react";
import { useQueryClient } from "@tanstack/react-query";
import { m } from "framer-motion";
import { FaGithub } from "react-icons/fa";
import useSession from "@/utils/useSession";
import useButtonText from "@/utils/useButtonText";

const LoginButton = memo(function LoginButton() {
  const { status } = useSession();
  const queryClient = useQueryClient();
  const buttonText = useButtonText();

  const handleClick = () => {
    if (status === "authenticated") {
      signOut();
    } else if (status === "unauthenticated") {
      signIn("github");
    }
    // When a user signs out, their data will still be
    // accessible locally because it's stored in IndexedDb.
    // When a user signs in, that data causes their signed
    // out state being shortly visible after signing in.
    // The line below clears their data before signing in
    // and outpreventing both of those issues.
    queryClient.clear();
  };

  return (
    <m.button
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
      disabled={status === "loading"}
      className={`rounded-md bg-neutral-800 px-4 py-2 text-slate-50 shadow duration-200 ease-linear hover:bg-neutral-700 focus:outline-0 focus:ring-4 focus:ring-blue-400 motion-reduce:transition sm:mt-1 sm:px-10 ${
        status === "loading" ? "animate-pulse" : ""
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
