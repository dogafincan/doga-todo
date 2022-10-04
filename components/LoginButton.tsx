import { useSession, signIn, signOut } from "next-auth/react";

const LoginButton = () => {
  const { data: session, status } = useSession();
  console.log(session, status);

  const handleSignOut = async () => {
    signOut();
  };

  const handleSignIn = async () => {
    signIn("github");
  };

  return (
    <button
      className="bg-black px-12 text-white"
      onClick={session ? handleSignOut : handleSignIn}
    >
      Sign out
    </button>
  );
};

export default LoginButton;
