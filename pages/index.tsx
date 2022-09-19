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

      <main>
        <Todos />
      </main>
    </div>
  );
};

export default Home;
