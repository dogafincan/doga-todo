import { useState } from "react";

const AddTodoForm = () => {
  const [title, setTitle] = useState("");

  const addTodo = () => {
    fetch("/api/add-todo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
      }),
    }).then(() => window.location.reload());
  };

  function handleSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    addTodo();
    setTitle("");
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col">
      <input
        tabIndex={0}
        type="text"
        name="add-todo"
        className="h-20 appearance-none rounded-3xl border-0 py-3.5 px-8 text-2xl shadow focus:border-0 focus:outline-none focus:ring-4 dark:border dark:border-slate-50/10 dark:bg-neutral-700/40 dark:shadow-none"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        placeholder="Add todo..."
      />
    </form>
  );
};

export default AddTodoForm;
