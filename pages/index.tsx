import { useEffect, useState } from "react";
import Head from "next/head";
import { GetServerSideProps } from "next/types";
import { useSession } from "next-auth/react";
import cookie from "cookie";
import Cookie from "js-cookie";
import Todos from "@components/Todos";
import TodoForm from "@components/TodoForm";
import HeroBanner from "@components/HeroBanner";
import { LocalTodo, SignInStatus } from "@utils/types";

const Index = ({
  initialSignInStatus,
  initialLocalTodos,
}: {
  initialSignInStatus: SignInStatus;
  initialLocalTodos: LocalTodo[];
}) => {
  const [signInStatus, setSignInStatus] = useState(initialSignInStatus);
  const { status } = useSession();
  const [localTodos, setLocalTodos] = useState(initialLocalTodos);
  const [isLoading, setIsLoading] = useState(
    signInStatus === "authenticated" ? true : false
  );

  useEffect(() => {
    if (status !== "loading") {
      if (status !== Cookie.get("signInStatus")) {
        Cookie.set("signInStatus", status);
        setSignInStatus(status);
      }
    }
  }, [status]);

  return (
    <>
      <Head>
        <title>Doga Todo</title>
        <meta name="description" content="My personal dev playground." />
        <meta name="keywords" content="Todo, List, Groceries, Productivity" />
        <meta name="author" content="Doga Fincan" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex w-full max-w-4xl flex-col space-y-4 p-3 md:w-11/12 md:p-8">
        <HeroBanner signInStatus={signInStatus} />
        <TodoForm
          isLoading={isLoading}
          localTodos={localTodos}
          setLocalTodos={setLocalTodos}
          signInStatus={signInStatus}
        />
        <Todos
          setIsLoading={setIsLoading}
          localTodos={localTodos}
          setLocalTodos={setLocalTodos}
          signInStatus={signInStatus}
        />
      </main>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const cookies = cookie.parse(
    context.req ? context.req.headers.cookie || "" : document.cookie
  );

  return {
    props: {
      initialSignInStatus: cookies.signInStatus ?? "unauthenticated",
      initialLocalTodos: [
        { id: "1", title: "👋 Hi there!" },
        { id: "2", title: "👨‍💻 My name is Doga Fincan." },
        { id: "3", title: "🔥 I've set up a few todos for you." },
        { id: "4", title: "🕹 Feel free to play around." },
        { id: "5", title: "🚀 Or log in above to create your own!" },
      ],
    },
  };
};

export default Index;
