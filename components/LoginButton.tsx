import { signIn, signOut } from "next-auth/react";
import { FaGithub } from "react-icons/fa";
import Cookie from "js-cookie";
import { SignInStatus } from "@utils/types";

const LoginButton = ({ signInStatus }: { signInStatus: SignInStatus }) => {
  const handleClick = () => {
    if (signInStatus === "authenticated") {
      signOut();
      Cookie.set("signInStatus", JSON.stringify(false));
    }

    if (signInStatus === "unauthenticated") {
      signIn("github");
      Cookie.set("signInStatus", JSON.stringify(true));
    }
  };

  return (
    <div>
      <button
        className="mt-2 rounded-md bg-neutral-800 px-4 py-2 text-white shadow duration-200 ease-linear hover:bg-neutral-700 focus:outline-0 focus:ring-4 focus:ring-blue-400 motion-reduce:transition-colors sm:px-10"
        onClick={handleClick}
      >
        <p className="flex items-center gap-x-2">
          <FaGithub />
          {signInStatus === "authenticated" && "Sign out"}
          {signInStatus === "unauthenticated" && "Continue with GitHub"}
        </p>
      </button>
    </div>
  );
};

export default LoginButton;
