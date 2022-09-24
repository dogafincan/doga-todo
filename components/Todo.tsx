import React, { useState } from "react";

type Props = {
  initialTodo: string | null | undefined;
};

export default function Todo({ initialTodo }: Props) {
  const [todo, setTodo] = useState(initialTodo);
  const [edit, setEdit] = useState(false);
  const [done, setDone] = useState(false);

  function handleSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    setEdit(!edit);
  }

  function toggleEdit() {
    setEdit(!edit);
  }

  function toggleDone() {
    setEdit(false);
    setDone(!done);
  }

  return (
    <div
      onClick={toggleEdit}
      className={`flex h-20 items-center rounded-3xl bg-white py-3.5 pl-8 text-2xl shadow dark:border dark:border-slate-50/10 dark:bg-neutral-700/40 dark:shadow-none ${
        edit && "ring"
      }`}
    >
      <input
        type="checkbox"
        className="mr-6 h-6 w-6 rounded-full border-2 border-slate-400/50 bg-slate-200/25 dark:border-slate-50/10 dark:bg-neutral-700/40"
        onChange={toggleDone}
      />
      {edit ? (
        <form onSubmit={handleSubmit} className="flex flex-1">
          <input
            className="flex h-20 flex-1 rounded-r-3xl bg-transparent py-3.5 text-2xl focus:outline-none"
            value={todo ?? ""}
            onChange={(event) => setTodo(event.target.value)}
            placeholder="Add todo..."
            autoFocus
            onBlur={toggleEdit}
          />
        </form>
      ) : (
        todo
      )}
    </div>
  );
}
