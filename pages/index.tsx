import { useEffect, useState } from "react";
import Head from "next/head";
import { GetServerSideProps } from "next";
import cookie from "cookie";
import Cookie from "js-cookie";
import TodoForm from "@components/TodoForm";
import HeroBanner from "@components/HeroBanner";
import TodosContainer from "@components/TodosContainer";
import { LocalTodo } from "@utils/types";
import { m } from "framer-motion";

const Index = ({
  initialVisit,
  initialLocalTodos,
}: {
  initialVisit: boolean;
  initialLocalTodos: LocalTodo[];
}) => {
  const [localTodos, setLocalTodos] = useState(initialLocalTodos);
  const [isLoading, setIsLoading] = useState(!initialVisit);

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
      <m.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="flex w-full max-w-4xl flex-col space-y-4 p-3 md:w-11/12 md:p-8"
      >
        <HeroBanner initialVisit={initialVisit} />
        <TodoForm
          isLoading={isLoading}
          localTodos={localTodos}
          setLocalTodos={setLocalTodos}
          initialVisit={initialVisit}
        />
        <TodosContainer
          setIsLoading={setIsLoading}
          localTodos={localTodos}
          setLocalTodos={setLocalTodos}
          initialVisit={initialVisit}
        />
      </m.main>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const cookies = cookie.parse(
    context.req ? context.req.headers.cookie || "" : document.cookie
  );

  return {
    props: {
      initialVisit: JSON.parse(cookies.initialVisit ?? true),
      initialLocalTodos: [
        { id: "1", title: "👋 Hi there!", isCompleted: false },
        { id: "2", title: "👨‍💻 My name is Doga Fincan.", isCompleted: false },
        {
          id: "3",
          title: "🔥 I've set up a few todos for you.",
          isCompleted: false,
        },
        { id: "4", title: "🕹 Feel free to play around.", isCompleted: false },
        {
          id: "5",
          title: "🚀 Or sign in with GitHub to create your own!",
          isCompleted: false,
        },
      ],
    },
  };
};

export default Index;
