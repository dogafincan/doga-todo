import { signIn, signOut } from "next-auth/react";
import { del } from "idb-keyval";
import { FaGithub } from "react-icons/fa";
import useSession from "@utils/useSession";

const LoginButton = () => {
  const { status } = useSession();

  const handleClick = () => {
    if (status === "authenticated") {
      del("reactQuery");
      signOut();
    }

    if (status === "unauthenticated") {
      signIn("github");
    }
  };

  return (
    <div>
      <button
        disabled={status === "loading"}
        className={`mt-2 rounded-md bg-neutral-800 px-4 py-2 text-white shadow duration-200 ease-linear hover:bg-neutral-700 focus:outline-0 focus:ring-4 focus:ring-blue-400 motion-reduce:transition-colors sm:px-10 ${
          status === "loading" ? "animate-pulse" : ""
        }`}
        onClick={handleClick}
      >
        <p className="flex items-center gap-x-2">
          <FaGithub />
          {status === "authenticated" && "Sign out"}
          {status === "unauthenticated" && "Continue with GitHub"}
          {status === "loading" && "Loading..."}
        </p>
      </button>
    </div>
  );
};

export default LoginButton;
