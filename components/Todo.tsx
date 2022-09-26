import { useState } from "react";
import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Todos } from "../utils/xata";

type TodoProps = {
  todo: Todos;
};

export default function Todo({ todo }: TodoProps) {
  const [title, setTitle] = useState(todo.title);
  const [edit, setEdit] = useState(false);
  const [done, setDone] = useState(false);

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
    setEdit(!edit);
  }

  function startEdit() {
    setEdit(true);
  }

  function endEdit() {
    setEdit(false);
    if (todo.title !== title) patchMutation.mutate();
  }

  function toggleDone() {
    setEdit(false);
    setDone(!done);
    deleteTodo();
  }

  return (
    <div
      onClick={startEdit}
      className={`flex h-20 items-center rounded-3xl bg-white py-3.5 pl-8 text-2xl shadow dark:border dark:border-slate-50/10 dark:bg-neutral-700/40 dark:shadow-none ${
        edit && "ring-4"
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
            value={title ?? ""}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="Add todo..."
            autoFocus
            onBlur={endEdit}
          />
        </form>
      ) : (
        title
      )}
    </div>
  );
}
