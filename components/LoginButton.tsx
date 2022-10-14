import { signIn, signOut } from "next-auth/react";
import { useQueryClient } from "@tanstack/react-query";
import Cookie from "js-cookie";
import { FaGithub } from "react-icons/fa";
import useSession from "@utils/useSession";
import ButtonText from "@components/ButtonText";

const LoginButton = ({ initialVisit }: { initialVisit: boolean }) => {
  const { status } = useSession();
  const queryClient = useQueryClient();

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
    <div>
      <button
        disabled={status === "loading" && !initialVisit}
        className={`rounded-md bg-neutral-800 px-4 py-2 text-white shadow duration-200 ease-linear hover:bg-neutral-700 focus:outline-0 focus:ring-4 focus:ring-blue-400 motion-reduce:transition-colors sm:mt-1 sm:px-10 ${
          status === "loading" && !initialVisit ? "animate-pulse" : ""
        }`}
        onClick={handleClick}
      >
        <p className="flex items-center gap-x-2">
          <FaGithub />
          <ButtonText initialVisit={initialVisit} />
        </p>
      </button>
    </div>
  );
};

export default LoginButton;
