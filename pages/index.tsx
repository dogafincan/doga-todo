import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/future/image";
import Todos from "../components/Todos";
import memoji from "../public/memoji.png";

const Home: NextPage = () => {
  const css = { width: "100%", height: "auto" };
  return (
    <div className="flex flex-col items-center">
      <Head>
        <title>Todo</title>
        <meta name="Todo" content="Todo list app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="w-2/3 space-y-4 p-8">
        <div className="flex justify-between shadow dark:shadow-none rounded-3xl bg-gradient-to-r from-rose-500/80 to-fuchsia-500/80 h-60 px-8">
          <div className="flex flex-col justify-center space-y-4">
            <h1 className="text-5xl text-white">Todo</h1>
            <h2 className="text-slate-50 dark:text-slate-200 text-xl">
              My personal dev and design playground.
            </h2>
          </div>
          <div className="flex flex-col justify-end mb-[-12px]">
            <Image
              src={memoji}
              alt="Picture of the author"
              className="w-[200px] items-center"
            />
          </div>
        </div>
        <Todos />
      </main>
    </div>
  );
};

export default Home;
