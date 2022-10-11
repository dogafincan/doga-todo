import { useState } from "react";
import Head from "next/head";
import TodoForm from "@components/TodoForm";
import HeroBanner from "@components/HeroBanner";
import initialLocalTodos from "@utils/initialLocalTodos";
import TodosContainer from "@components/TodosContainer";

const Index = () => {
  const [localTodos, setLocalTodos] = useState(initialLocalTodos);
  const [isLoading, setIsLoading] = useState(true);

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
        <TodosContainer
          setIsLoading={setIsLoading}
          localTodos={localTodos}
          setLocalTodos={setLocalTodos}
        />
      </main>
    </>
  );
};

export default Index;
