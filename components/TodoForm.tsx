import { useState } from "react";
import useAddTodo from "../utils/useAddTodo";

const AddTodoForm = () => {
  const [title, setTitle] = useState("");
  const { addTodo } = useAddTodo();

  function handleSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    addTodo({ title });
    setTitle("");
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col">
      <input
        tabIndex={0}
        type="text"
        name="add-todo"
        autoComplete="off"
        aria-label="Add todo"
        className="h-20 appearance-none rounded-3xl border-0 py-3.5 px-8 text-2xl shadow focus:border-transparent focus:ring-4 focus:ring-blue-400 dark:border dark:border-slate-50/10 dark:bg-neutral-700/40 dark:shadow-none dark:focus:ring-blue-500"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        placeholder="Add todo"
      />
    </form>
  );
};

export default AddTodoForm;
