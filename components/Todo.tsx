import { useEffect, useRef, useState } from "react";
import { Todos } from "../utils/xata";
import useEditTodo from "../utils/useEditTodo";
import useDeleteTodo from "../utils/useDeleteTodo";

const Todo = ({ todo }: { todo: Todos }) => {
  const [title, setTitle] = useState(todo.title ?? "");
  const [edit, setEdit] = useState(false);
  const [active, setActive] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const { editTodo } = useEditTodo();
  const { deleteTodo } = useDeleteTodo();

  useEffect(() => {
    inputRef.current?.focus();
  }, [edit]);

  const handleCheckboxChange = () => {
    deleteTodo.mutate({ id: todo.id });
  };

  const handleCheckboxFocus = () => {
    setActive(true);
  };

  const handleCheckboxBlur = () => {
    setActive(false);
  };

  const handleTitleClick = () => {
    setEdit(true);
  };

  const handleTitleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    setEdit(false);
    editTodo.mutate({ id: todo.id, title });
  };

  const handleTitleBlur = () => {
    setEdit(false);
    setActive(false);

    if (todo.title !== title) {
      editTodo.mutate({ id: todo.id, title });
    }
  };

  const handleTitleFocus = () => {
    setEdit(true);
    setActive(true);
  };

  return (
    <div
      onClick={handleTitleClick}
      className={`flex h-20 cursor-text items-center rounded-3xl bg-white pl-5 shadow dark:border dark:border-slate-50/10 dark:bg-neutral-700/40 dark:shadow-none sm:py-3.5 sm:pl-8 ${
        (active || edit) && "ring-4 ring-blue-400 dark:ring-blue-500"
      }`}
    >
      <input
        type="checkbox"
        name="complete-todo"
        role="button"
        aria-pressed="false"
        aria-label="Mark completed"
        className="mr-4 h-7 w-7 appearance-none rounded-full border-2 border-slate-400/50 bg-slate-200/25 focus:border-spacing-0 focus:border-0 focus:ring-2 focus:ring-blue-400 focus:ring-offset-0 dark:border-slate-50/10 dark:bg-neutral-700/40 focus:dark:ring-blue-500 sm:mr-6"
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
            className="flex flex-1 appearance-none rounded-r-3xl border-0 bg-transparent p-0 py-3.5 text-xl focus:border-0 focus:ring-0"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="Add title"
            onBlur={handleTitleBlur}
          />
        </form>
      ) : (
        <div className="pr-5 sm:pr-10" onFocus={handleTitleFocus} tabIndex={0}>
          <p className="line-clamp-2">{title}</p>
        </div>
      )}
    </div>
  );
};

export default Todo;
