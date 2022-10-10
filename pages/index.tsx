import { useState } from "react";
import Head from "next/head";
import { GetServerSideProps, InferGetServerSidePropsType } from "next/types";
import cookie from "cookie";
import Todos from "@components/Todos";
import TodoForm from "@components/TodoForm";
import HeroBanner from "@components/HeroBanner";

const Index = ({
  initialIsLoggedIn,
  initialLocalTodos,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [isLoggedIn] = useState(initialIsLoggedIn);
  const [isLoading, setLoading] = useState(isLoggedIn ? true : false);
  const [localTodos, setLocalTodos] = useState(initialLocalTodos);

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
        <HeroBanner isLoggedIn={isLoggedIn} />
        <TodoForm
          isLoading={isLoading}
          localTodos={localTodos}
          setLocalTodos={setLocalTodos}
          isLoggedIn={isLoggedIn}
        />
        <Todos
          setLoading={setLoading}
          localTodos={localTodos}
          setLocalTodos={setLocalTodos}
          isLoggedIn={isLoggedIn}
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
      initialIsLoggedIn: JSON.parse(cookies.isLoggedIn ?? "false"),
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
