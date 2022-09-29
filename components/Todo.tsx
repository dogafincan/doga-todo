import { useEffect, useRef, useState } from "react";
import { Todos } from "../utils/xata";
import useEditTodo from "../utils/useEditTodo";
import useDeleteTodo from "../utils/useDeleteTodo";

export default function Todo({ todo }: { todo: Todos }) {
  const [title, setTitle] = useState(todo.title ?? "");
  const [edit, setEdit] = useState(false);
  const [active, setActive] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const { editTodo } = useEditTodo();
  const { deleteTodo } = useDeleteTodo();

  useEffect(() => {
    inputRef.current?.focus();
  }, [edit]);

  function handleCheckboxChange() {
    deleteTodo({ id: todo.id });
  }

  function handleCheckboxFocus() {
    setActive(true);
  }

  function handleCheckboxBlur() {
    setActive(false);
  }

  function handleTitleClick() {
    setEdit(true);
  }

  function handleTitleSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    editTodo({ id: todo.id, title });
    setEdit(false);
  }

  function handleTitleBlur() {
    setEdit(false);
    setActive(false);

    if (todo.title !== title) {
      editTodo({ id: todo.id, title });
    }
  }

  function handleTitleFocus() {
    setEdit(true);
    setActive(true);
  }

  return (
    <div
      onClick={handleTitleClick}
      className={`flex h-20 cursor-text items-center rounded-3xl bg-white py-3.5 pl-8 text-2xl shadow dark:border dark:border-slate-50/10 dark:bg-neutral-700/40 dark:shadow-none ${
        (active || edit) && "ring-4 ring-blue-400 dark:ring-blue-500"
      }`}
    >
      <input
        type="checkbox"
        name="complete-todo"
        role="button"
        aria-pressed="false"
        aria-label="Mark completed"
        className="mr-6 h-6 w-6 appearance-none rounded-full border-2 border-slate-400/50 bg-slate-200/25 focus:border-spacing-0 focus:border-0 focus:ring-2 focus:ring-blue-400 focus:ring-offset-0 dark:border-slate-50/10 dark:bg-neutral-700/40 focus:dark:ring-blue-500"
        onChange={handleCheckboxChange}
        onFocus={handleCheckboxFocus}
        onBlur={handleCheckboxBlur}
      />
      {edit ? (
        <form onSubmit={handleTitleSubmit} className="flex flex-1">
          <input
            type="text"
            name="edit-todo"
            autoComplete="off"
            aria-label="Todo title"
            ref={inputRef}
            className="flex flex-1 appearance-none rounded-r-3xl border-0 bg-transparent p-0 py-3.5 text-2xl focus:border-0 focus:ring-0"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="Add title"
            onBlur={handleTitleBlur}
          />
        </form>
      ) : (
        <div onFocus={handleTitleFocus} tabIndex={0}>
          {title}
        </div>
      )}
    </div>
  );
}
