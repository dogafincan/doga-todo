import React, { useState } from "react";

type Props = {
  initialTodo: string | null | undefined;
};

export default function Todo({ initialTodo }: Props) {
  const [todo, setTodo] = useState(initialTodo);
  const [edit, setEdit] = useState(false);

  function handleSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    setEdit(!edit);
  }

  function handleClick() {
    setEdit(!edit);
  }

  return edit && todo ? (
    <form onSubmit={handleSubmit} className="flex flex-col">
      <input
        className="h-20 rounded-3xl py-3.5 px-8 text-2xl shadow dark:border dark:border-slate-50/10 dark:bg-neutral-700/40 dark:shadow-none"
        value={todo}
        onChange={(event) => setTodo(event.target.value)}
        placeholder="Add todo..."
        autoFocus
      />
    </form>
  ) : (
    <div
      onClick={handleClick}
      className="flex h-20 items-center rounded-3xl bg-white py-3.5 px-8 text-2xl shadow dark:border dark:border-slate-50/10 dark:bg-neutral-700/40 dark:shadow-none"
    >
      {todo}
    </div>
  );
}
