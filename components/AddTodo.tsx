import { useState } from "react";

const AddTodo = () => {
  const [title, setTitle] = useState("");

  const add = () => {
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
    add();
    setTitle("");
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col">
      <input
        className=" h-20 appearance-none rounded-3xl py-3.5 px-8 text-2xl shadow  dark:border dark:border-slate-50/10 dark:bg-neutral-700/40 dark:shadow-none "
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        placeholder="Add todo..."
      />
    </form>
  );
};

export default AddTodo;
