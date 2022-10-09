import { useState } from "react";
import Head from "next/head";
import cookie from "cookie";
import Todos from "@components/Todos";
import TodoForm from "@components/TodoForm";
import HeroBanner from "@components/HeroBanner";
import initialLocalTodos from "@utils/initialLocalTodos";
import { GetServerSideProps, InferGetServerSidePropsType } from "next/types";

const Index = ({
  initialIsLoggedIn,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [isLoggedIn] = useState(initialIsLoggedIn);
  const [isLoading, setLoading] = useState(isLoggedIn ? false : true);
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
    },
  };
};

export default Index;
