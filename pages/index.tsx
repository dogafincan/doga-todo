import Head from "next/head";
import HeroBanner from "@/components/HeroBanner";
import TodosContainer from "@/components/TodosContainer";

const Index = () => {
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
        <HeroBanner />
        <TodosContainer />
      </main>
    </>
  );
};

export default Index;
