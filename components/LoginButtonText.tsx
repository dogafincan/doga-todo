import useSession from "@utils/useSession";

const LoginButtonText = () => {
  const { session, status } = useSession();

  if (status === "loading") return <>Loading...</>;
  if (session) return <>Sign out</>;

  return <>Continue with GitHub</>;
};

export default LoginButtonText;
