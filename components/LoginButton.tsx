import { signIn, signOut } from "next-auth/react";
import { del } from "idb-keyval";
import Cookie from "js-cookie";
import { FaGithub } from "react-icons/fa";
import useSession from "@utils/useSession";
import ButtonText from "@components/ButtonText";

const LoginButton = ({ isLocal }: { isLocal: boolean }) => {
  const { status } = useSession();

  const handleClick = () => {
    if (status === "unauthenticated" || isLocal) {
      signIn("github");
    } else if (status === "authenticated") {
      del("reactQuery");
      Cookie.set("initialVisit", "true");
      signOut();
    }
  };

  return (
    <div>
      <button
        disabled={status === "loading" && !isLocal}
        className={`rounded-md bg-neutral-800 px-4 py-2 text-white shadow duration-200 ease-linear hover:bg-neutral-700 focus:outline-0 focus:ring-4 focus:ring-blue-400 motion-reduce:transition-colors sm:mt-1 sm:px-10 ${
          status === "loading" ? "animate-pulse" : ""
        }`}
        onClick={handleClick}
      >
        <p className="flex items-center gap-x-2">
          <FaGithub />
          <ButtonText isLocal={isLocal} />
        </p>
      </button>
    </div>
  );
};

export default LoginButton;
