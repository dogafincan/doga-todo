import { useSession, signIn, signOut } from "next-auth/react";
import { FaGithub } from "react-icons/fa";

const LoginButton = () => {
  const { status } = useSession();

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
        onClick={status === "authenticated" ? handleSignOut : handleSignIn}
      >
        <p className="flex items-center gap-x-2">
          <FaGithub />
          {status === "authenticated" && "Sign out"}
          {status === "loading" && "Loading..."}
          {status === "unauthenticated" && "Continue with GitHub"}
        </p>
      </button>
    </div>
  );
};

export default LoginButton;
