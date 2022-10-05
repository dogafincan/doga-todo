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
    <button
      disabled={status === "loading"}
      className={`mt-2 rounded-md bg-neutral-800 px-16 py-2 text-white shadow duration-200 ease-linear hover:bg-neutral-700 focus:outline-0 focus:ring-4 focus:ring-blue-400 motion-reduce:transition-colors ${
        status === "loading" && "animate-pulse"
      }`}
      onClick={status === "authenticated" ? handleSignOut : handleSignIn}
    >
      <p className="flex items-center gap-x-2">
        <FaGithub className="" />
        {status === "authenticated" && "Sign out"}
        {status === "loading" && "Loading..."}
        {status === "unauthenticated" && "Sign out"}
      </p>
    </button>
  );
};

export default LoginButton;
