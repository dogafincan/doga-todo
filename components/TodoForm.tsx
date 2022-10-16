import { memo, useState } from "react";
import { v4 as uuid } from "uuid";
import useAddTodo from "@utils/useAddTodo";
import { LocalTodo, SetLocalTodos } from "@utils/types";
import useSession from "@utils/useSession";

const AddTodoForm = memo(function AddTodoForm({
  isLoading,
  localTodos,
  setLocalTodos,
  initialVisit,
}: {
  isLoading: boolean;
  localTodos: LocalTodo[];
  setLocalTodos: SetLocalTodos;
  initialVisit: boolean;
}) {
  const { status } = useSession();
  const [title, setTitle] = useState("");
  const { addTodo } = useAddTodo();

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();

    if (status === "authenticated") {
      addTodo.mutate({ id: "todo" + uuid(), title });
    } else if (status === "unauthenticated" || initialVisit) {
      setLocalTodos([
        { id: "todo" + uuid(), title, isCompleted: false },
        ...localTodos,
      ]);
    }

    setTitle("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col">
      <input
        tabIndex={0}
        type="text"
        name="add-todo"
        autoComplete="off"
        aria-label="Add todo"
        className={`h-20 appearance-none rounded-3xl border-0 py-3.5 px-8 text-base shadow duration-200 ease-linear focus:border-transparent focus:outline-0 focus:ring-4 focus:ring-blue-400 motion-reduce:transition-opacity dark:border dark:border-slate-50/10 dark:bg-neutral-700/40 dark:shadow-none dark:focus:ring-blue-500 sm:text-xl ${
          isLoading && !initialVisit ? "animate-pulse" : ""
        }`}
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        placeholder={isLoading && !initialVisit ? "Loading..." : "Add todo"}
        disabled={isLoading && !initialVisit}
      />
    </form>
  );
});

export default AddTodoForm;
