import { useState } from "react";
import Head from "next/head";
import Image from "next/future/image";
import { useSession } from "next-auth/react";
import { motion } from "framer-motion";
import Todos from "@components/Todos";
import Memoji from "@public/memoji.png";
import TodoForm from "@components/TodoForm";
import LoginButton from "@components/LoginButton";

const initialLocalTodos = [
  { id: "1", title: "👋 Hi there!" },
  { id: "2", title: "👨‍💻 My name is Doga Fincan." },
  { id: "3", title: "🔥 I've set up a few todos for you." },
  { id: "4", title: "🕹 Feel free to play around." },
  { id: "5", title: "🚀 Or log in above to create your own!" },
];

const Index = () => {
  const { status } = useSession();

  const [isLoading, setLoading] = useState(
    status === "unauthenticated" ? false : true
  );

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
        <div className="flex h-auto flex-col rounded-3xl bg-gradient-to-r from-rose-500/80 to-fuchsia-500/80 px-8 pt-8 shadow dark:shadow-none">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col items-center space-y-4"
          >
            <h1 className="mb-3 font-['Pacifico'] text-5xl text-white duration-200 ease-linear will-change-auto motion-reduce:transition-transform sm:mb-6 sm:text-7xl">
              Doga Todo
            </h1>
            <h2 className="text-slate-50 ease-linear motion-reduce:transition-transform dark:text-slate-50">
              A fun way to get things done.
            </h2>
            <div>
              <LoginButton />
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col items-center justify-end"
          >
            <Image
              priority
              src={Memoji}
              alt="Memoji of Doga Fincan"
              className="w-[200px]"
            />
          </motion.div>
        </div>
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
