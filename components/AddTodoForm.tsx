import { memo, useState } from "react";
import { m } from "framer-motion";
import { v4 as uuid } from "uuid";
import useSession from "@/utils/useSession";
import useAddTodo from "@/utils/useAddTodo";
import { LocalTodosDispatch } from "@/utils/types";

const AddTodoForm = memo(function AddTodoForm({
  initialVisit,
  isFetched,
  localTodosDispatch,
}: {
  initialVisit: boolean;
  isFetched: boolean;
  localTodosDispatch?: LocalTodosDispatch;
}) {
  const { status } = useSession();
  const [title, setTitle] = useState("");
  const { addTodo } = useAddTodo();

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();

    if (!title) {
      return;
    }

    if (status === "authenticated") {
      addTodo.mutate({ id: "todo" + uuid(), title });
    } else if (status === "unauthenticated" || initialVisit) {
      localTodosDispatch!({ type: "added", title });
    }

    setTitle("");
  };

  return (
    <m.form
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
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
        className={`h-20 appearance-none rounded-3xl border-0 py-3.5 px-8 text-base shadow duration-200 ease-linear focus:border-transparent focus:outline-0 focus:ring-4 focus:ring-blue-400 motion-reduce:transition-opacity dark:border dark:border-slate-50/10 dark:bg-neutral-700/40 dark:shadow-none dark:focus:ring-blue-500 sm:text-xl ${
          !isFetched && !initialVisit ? "animate-pulse" : ""
        }`}
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        placeholder={!isFetched && !initialVisit ? "Loading..." : "Add todo"}
        disabled={!isFetched && !initialVisit}
      />
    </m.form>
  );
});

export default AddTodoForm;
