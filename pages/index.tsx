import { useEffect } from "react";
import Head from "next/head";
import { GetServerSideProps } from "next";
import cookie from "cookie";
import Cookie from "js-cookie";
import HeroBanner from "@/components/HeroBanner";
import TodosContainer from "@/components/TodosContainer";
import { LocalTodo } from "@/utils/types";

const Index = ({
  initialVisit,
  initialLocalTodos,
}: {
  // Cookies are used to register whether it's the user's first time visiting
  // the app. If that's the case, the app will assume no data has to be
  // loaded from the server and auth-related loading states can be avoided.
  initialVisit: boolean;
  initialLocalTodos: LocalTodo[];
}) => {
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
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </Head>
      <main className="flex w-full max-w-4xl flex-col space-y-4 px-3 pt-3 md:w-11/12 md:px-0 md:pt-8">
        <HeroBanner initialVisit={initialVisit} />
        <TodosContainer
          initialLocalTodos={initialLocalTodos}
          initialVisit={initialVisit}
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
      initialVisit: JSON.parse(cookies.initialVisit ?? true),
      initialLocalTodos: [
        {
          id: "1",
          title: "👋 I've set up a few todos for you to play around with.",
          isCompleted: false,
        },
        {
          id: "2",
          title: "🥥 Write down a new todo using the input field above.",
          isCompleted: false,
        },
        {
          id: "3",
          title: "🥭 Todos are added by pressing the return key.",
          isCompleted: false,
        },
        {
          id: "4",
          title:
            "🥑 Mark a todo as completed using the checkboxes on the left.",
          isCompleted: false,
        },
        {
          id: "5",
          title: "🚀 Finally, sign in with GitHub to create your own todos!",
          isCompleted: false,
        },
      ],
    },
  };
};

export default Index;
