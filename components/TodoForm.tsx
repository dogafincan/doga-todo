import { useState } from "react";
import { motion } from "framer-motion";
import { v4 as uuid } from "uuid";
import useSession from "@utils/useSession";
import useAddTodo from "@utils/useAddTodo";
import { LocalTodo, SetLocalTodos } from "@utils/types";

const AddTodoForm = ({
  isLoading,
  localTodos,
  setLocalTodos,
}: {
  isLoading: boolean;
  localTodos: LocalTodo[];
  setLocalTodos: SetLocalTodos;
}) => {
  const { session, status } = useSession();
  const [title, setTitle] = useState("");
  const { addTodo } = useAddTodo();
  const id = "todo" + uuid();

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();

    if (session && status === "success") {
      addTodo.mutate({ id, title });
    } else {
      setLocalTodos([{ id, title }, ...localTodos]);
    }

    setTitle("");
  };

  return (
    <motion.form
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      layout
      transition={{ duration: 0.2 }}
      onSubmit={handleSubmit}
      className="flex flex-col"
    >
      <input
        tabIndex={0}
        type="text"
        name="add-todo"
        autoComplete="off"
        aria-label="Add todo"
        className={`h-20 appearance-none rounded-3xl border-0 py-3.5 px-8 text-base shadow duration-200 ease-linear focus:border-transparent focus:outline-0 focus:ring-4 focus:ring-blue-400 motion-reduce:transition-colors dark:border dark:border-slate-50/10 dark:bg-neutral-700/40 dark:shadow-none dark:focus:ring-blue-500 sm:text-xl ${
          isLoading && "animate-pulse"
        }`}
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        placeholder={isLoading ? "Loading..." : "Add todo"}
        disabled={isLoading}
      />
    </motion.form>
  );
};

export default AddTodoForm;
