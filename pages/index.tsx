import { useState } from "react";
import Head from "next/head";
import { useSession } from "next-auth/react";
import Todos from "@components/Todos";
import TodoForm from "@components/TodoForm";
import HeroBanner from "@components/HeroBanner";
import initialLocalTodos from "@utils/initialLocalTodos";

const Index = () => {
  const { status } = useSession();
  const [localTodos, setLocalTodos] = useState(initialLocalTodos);
  const [isLoading, setIsLoading] = useState(
    status === "unauthenticated" ? false : true
  );

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
        <HeroBanner />
        <TodoForm
          isLoading={isLoading}
          localTodos={localTodos}
          setLocalTodos={setLocalTodos}
        />
        <Todos
          setIsLoading={setIsLoading}
          localTodos={localTodos}
          setLocalTodos={setLocalTodos}
        />
      </main>
    </>
  );
};

export default Index;
