import { useState } from "react";
import Head from "next/head";
import Image from "next/future/image";
import { motion } from "framer-motion";
import Todos from "../components/Todos";
import Memoji from "../public/memoji.png";
import TodoForm from "../components/TodoForm";

const Index = () => {
  const [isLoading, setLoading] = useState(true);

  return (
    <div className="flex flex-col items-center">
      <Head>
        <title>Todo</title>
        <meta name="Todo" content="Todo list app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex w-full flex-col space-y-4 p-3 md:w-11/12 md:p-8 lg:w-4/5 xl:w-4/6 2xl:w-7/12">
        <div className="flex h-auto flex-col rounded-3xl bg-gradient-to-r from-rose-500/80 to-fuchsia-500/80 px-8 pt-8 shadow dark:shadow-none lg:flex-row lg:justify-between">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col justify-center space-y-4 lg:w-2/3 lg:pb-8"
          >
            <h1 className="text-5xl text-white">Todo</h1>
            <h2 className="text-slate-50 dark:text-slate-50">
              My personal dev and design playground. Lorem ipsum dolor sit amet,
              consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
              labore et dolore magna aliqua. Ut enim ad minim veniam, quis
              nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
              consequat.
            </h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col items-center justify-end"
          >
            <Image
              src={Memoji}
              alt="Picture of the author"
              className="w-[200px]"
            />
          </motion.div>
        </div>
        <TodoForm isLoading={isLoading} />
        <Todos setLoading={setLoading} />
      </main>
    </div>
  );
};

export default Index;
