import type { NextPage } from "next";
import Head from "next/head";
import Todos from "../components/Todos";

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Todo</title>
        <meta name="Todo" content="Todo list app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col items-center">
        <h1 className="drop-shadow text-9xl mt-5 mb-10 font-bold">Todo</h1>
        <Todos />
      </main>
    </div>
  );
};

export default Home;
