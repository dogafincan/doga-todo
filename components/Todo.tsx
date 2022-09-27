import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Todos } from "../utils/xata";

type TodoProps = {
  todo: Todos;
};

export default function Todo({ todo }: TodoProps) {
  const [title, setTitle] = useState(todo.title);
  const [edit, setEdit] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, [edit]);

  const patchTodo = () =>
    axios
      .patch("/api/edit-todo", { id: todo.id, title })
      .then((res) => res.data);

  const queryClient = useQueryClient();

  const patchMutation = useMutation(patchTodo, {
    onSuccess: () => {
      queryClient.invalidateQueries(["todos"]);
    },
  });

  const deleteTodo = () => {
    fetch("/api/delete-todo", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: todo.id,
      }),
    }).then(() => window.location.reload());
  };

  function handleSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    patchMutation.mutate();
    setEdit(false);
  }

  function handleChange() {
    deleteTodo();
  }

  function handleBlur() {
    setEdit(false);
    if (todo.title !== title) patchMutation.mutate();
  }

  function handleClick() {
    setEdit(true);
  }

  function handleFocus() {
    setEdit(true);
  }

  return (
    <div
      onClick={handleClick}
      className={`flex h-20 items-center rounded-3xl bg-white py-3.5 pl-8 text-2xl shadow dark:border dark:border-slate-50/10 dark:bg-neutral-700/40 dark:shadow-none ${
        edit && "ring-4"
      }`}
    >
      <input
        type="checkbox"
        name="complete-todo"
        role="button"
        aria-pressed="false"
        aria-label="Mark completed"
        className="mr-6 h-6 w-6 appearance-none rounded-full border-2 border-slate-400/50 bg-slate-200/25 dark:border-slate-50/10 dark:bg-neutral-700/40"
        onChange={handleChange}
      />
      {edit ? (
        <form onSubmit={handleSubmit} className="flex flex-1">
          <input
            type="text"
            name="edit-todo"
            autoComplete="off"
            aria-label="Todo title"
            ref={inputRef}
            className="flex flex-1 appearance-none rounded-r-3xl border-0 bg-transparent p-0 py-3.5 text-2xl focus:border-0 focus:ring-0"
            value={title ?? ""}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="Add title..."
            onBlur={handleBlur}
          />
        </form>
      ) : (
        <div onFocus={handleFocus} tabIndex={0}>
          {title}
        </div>
      )}
    </div>
  );
}
