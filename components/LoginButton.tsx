import { signIn, signOut } from "next-auth/react";
import { FaGithub } from "react-icons/fa";
import Cookie from "js-cookie";
import { useQueryClient } from "@tanstack/react-query";

const LoginButton = ({ isLoggedIn }: { isLoggedIn: boolean }) => {
  const queryClient = useQueryClient();

  const handleSignOut = async () => {
    signOut();
    Cookie.set("isLoggedIn", JSON.stringify(false));
    queryClient.invalidateQueries(["todos"]);
  };

  const handleSignIn = async () => {
    signIn("github");
    Cookie.set("isLoggedIn", JSON.stringify(true));
  };

  return (
    <div>
      <button
        className="mt-2 rounded-md bg-neutral-800 px-4 py-2 text-white shadow duration-200 ease-linear hover:bg-neutral-700 focus:outline-0 focus:ring-4 focus:ring-blue-400 motion-reduce:transition-colors sm:px-10"
        onClick={isLoggedIn ? handleSignOut : handleSignIn}
      >
        <p className="flex items-center gap-x-2">
          <FaGithub />
          {isLoggedIn && "Sign out"}
          {!isLoggedIn && "Continue with GitHub"}
        </p>
      </button>
    </div>
  );
};

export default LoginButton;
