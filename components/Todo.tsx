import { useEffect, useRef, useState } from "react";
import { m } from "framer-motion";
import { Todos } from "@utils/xata";
import useEditTodo from "@utils/useEditTodo";
import useDeleteTodo from "@utils/useDeleteTodo";
import { LocalTodo, SetLocalTodos } from "@utils/types";
import useSession from "@utils/useSession";

const Todo = ({
  todo,
  localTodos,
  setLocalTodos,
  initialVisit,
}: {
  todo: Todos;
  localTodos: LocalTodo[];
  setLocalTodos: SetLocalTodos;
  initialVisit: boolean;
}) => {
  const { status } = useSession();
  const [title, setTitle] = useState(todo.title ?? "");
  const [edit, setEdit] = useState(false);
  const [active, setActive] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const { editTodo } = useEditTodo();
  const { deleteTodo } = useDeleteTodo();

  useEffect(() => {
    inputRef.current?.focus();
  }, [edit]);

  const editLocalTodo = () => {
    setLocalTodos(
      localTodos.map((localTodo) => {
        if (localTodo.id === todo.id) {
          return { id: localTodo.id, title };
        } else {
          return localTodo;
        }
      })
    );
  };

  const handleCheckboxChange = () => {
    if (status === "authenticated") {
      deleteTodo.mutate({ id: todo.id });
    } else if (status === "unauthenticated" || initialVisit) {
      setLocalTodos(localTodos.filter((localTodo) => localTodo.id !== todo.id));
    }
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
    setActive(false);

    if (status === "authenticated") {
      editTodo.mutate({ id: todo.id, title });
    } else if (status === "unauthenticated" || initialVisit) {
      editLocalTodo();
    }
  };

  const handleTitleBlur = () => {
    setEdit(false);
    setActive(false);

    if (todo.title !== title) {
      if (status === "authenticated") {
        editTodo.mutate({ id: todo.id, title });
      } else if (status === "unauthenticated" || initialVisit) {
        editLocalTodo();
      }
    }
  };

  const handleTitleFocus = () => {
    setEdit(true);
    setActive(true);
  };

  return (
    <m.li
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={handleTitleClick}
    >
      <div
        className={`flex h-20 cursor-text items-center rounded-3xl bg-white pl-5 shadow duration-200 ease-linear motion-reduce:transition-colors dark:border dark:border-slate-50/10 dark:bg-neutral-700/40 dark:shadow-none sm:py-3.5 sm:pl-8 ${
          active || edit ? "ring-4 ring-blue-400 dark:ring-blue-500" : ""
        }`}
      >
        <input
          type="checkbox"
          name="complete-todo"
          role="button"
          aria-pressed="false"
          aria-label="Mark completed"
          className="mr-4 h-7 w-7 appearance-none rounded-full border-2 border-slate-400/50 bg-slate-200/25 duration-200 ease-linear focus:border-spacing-0 focus:border-0 focus:outline-0 focus:ring-2 focus:ring-blue-400 focus:ring-offset-0 motion-reduce:transition-colors dark:border-slate-50/10 dark:bg-neutral-700/40 focus:dark:ring-blue-500 sm:mr-6"
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
              className="flex flex-1 appearance-none rounded-r-3xl border-0 bg-transparent p-0 py-3.5 pr-4 text-base focus:border-0 focus:ring-0 sm:text-xl"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="Add title"
              onBlur={handleTitleBlur}
            />
          </form>
        ) : (
          <div
            className="pr-5 sm:pr-10"
            onFocus={handleTitleFocus}
            tabIndex={0}
          >
            <p className="line-clamp-2">{title}</p>
          </div>
        )}
      </div>
    </m.li>
  );
};

export default Todo;
