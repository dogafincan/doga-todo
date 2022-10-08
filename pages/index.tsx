import { useState } from "react";
import Head from "next/head";
import Todos from "@components/Todos";
import TodoForm from "@components/TodoForm";
import HeroBanner from "@components/HeroBanner";
import initialLocalTodos from "@utils/initialLocalTodos";
import useSession from "@utils/useSession";

const Index = () => {
  const { session } = useSession();
  const [isLoading, setLoading] = useState(session ? true : false);
  const [localTodos, setLocalTodos] = useState(initialLocalTodos);

  return (
    <div className="flex flex-col items-center">
      <Head>
        <title>Doga Todo</title>
        <meta name="description" content="My personal dev playground." />
        <meta name="keywords" content="Todo, List, Groceries, Productivity" />
        <meta name="author" content="Doga Fincan" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex w-full flex-col space-y-4 p-3 md:w-11/12 md:p-8 lg:w-4/5 xl:w-4/6 2xl:w-7/12">
        <HeroBanner />
        <TodoForm
          isLoading={isLoading}
          localTodos={localTodos}
          setLocalTodos={setLocalTodos}
        />
        <Todos
          setLoading={setLoading}
          localTodos={localTodos}
          setLocalTodos={setLocalTodos}
        />
      </main>
    </div>
  );
};

export default Index;
