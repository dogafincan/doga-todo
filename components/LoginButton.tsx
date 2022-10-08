import { signIn, signOut } from "next-auth/react";
import { FaGithub } from "react-icons/fa";
import useSession from "@utils/useSession";

const LoginButton = () => {
  const { session, status } = useSession();

  const handleSignOut = async () => {
    signOut();
  };

  const handleSignIn = async () => {
    signIn("github");
  };

  return (
    <div>
      <button
        disabled={status === "loading"}
        className={`mt-2 rounded-md bg-neutral-800 px-4 py-2 text-white shadow duration-200 ease-linear hover:bg-neutral-700 focus:outline-0 focus:ring-4 focus:ring-blue-400 motion-reduce:transition-colors sm:px-10 ${
          status === "loading" && "animate-pulse"
        }`}
        onClick={session ? handleSignOut : handleSignIn}
      >
        <p className="flex items-center gap-x-2">
          <FaGithub />
          {session && "Sign out"}
          {status === "loading" && "Loading..."}
          {!session && "Continue with GitHub"}
        </p>
      </button>
    </div>
  );
};

export default LoginButton;
