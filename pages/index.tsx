import { useEffect, useState } from "react";
import Head from "next/head";
import { GetServerSideProps } from "next";
import cookie from "cookie";
import Cookie from "js-cookie";
import TodoForm from "@components/TodoForm";
import HeroBanner from "@components/HeroBanner";
import TodosContainer from "@components/TodosContainer";
import { LocalTodo } from "@utils/types";

const Index = ({
  isLocal,
  initialLocalTodos,
}: {
  isLocal: boolean;
  initialLocalTodos: LocalTodo[];
}) => {
  const [localTodos, setLocalTodos] = useState(initialLocalTodos);
  const [isLoading, setIsLoading] = useState(!isLocal);

  useEffect(() => {
    Cookie.set("initialVisit", "false");
  }, []);

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
        <HeroBanner isLocal={isLocal} />
        <TodoForm
          isLoading={isLoading}
          localTodos={localTodos}
          setLocalTodos={setLocalTodos}
          isLocal={isLocal}
        />
        <TodosContainer
          setIsLoading={setIsLoading}
          localTodos={localTodos}
          setLocalTodos={setLocalTodos}
          isLocal={isLocal}
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
      isLocal: JSON.parse(cookies.initialVisit ?? true),
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
