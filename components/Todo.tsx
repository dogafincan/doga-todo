import { forwardRef, memo, useEffect, useRef, useState } from "react";
import { m } from "framer-motion";
import { Todos } from "@/utils/xata";
import useEditTodo from "@/utils/useEditTodo";
import useSession from "@/utils/useSession";
import { ClearCompleted, LocalTodosDispatch } from "@/utils/types";

type Props = {
  initialVisit: boolean;
  todo: Todos;
  clearCompleted: ClearCompleted;
  localTodosDispatch?: LocalTodosDispatch;
};

const Todo = memo(
  // When using Framer Motion's AnimatePresence's popLayout mode, any immediate
  // child of AnimatePresence that's a custom component must be wrapped in
  // React's forwardRef function, forwarding the provided ref to the DOM node
  // you wish to pop out of the layout.
  // For more info, see: https://www.framer.com/docs/animate-presence/
  forwardRef<HTMLLIElement, Props>(function Todo(props, ref) {
    const { initialVisit, todo, clearCompleted, localTodosDispatch } = props;
    const { status } = useSession();
    const [title, setTitle] = useState(todo.title ?? "");
    const [isCompleted, setIsCompleted] = useState(todo.isCompleted ?? false);
    const [edit, setEdit] = useState(false);
    const [active, setActive] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const { editTodo } = useEditTodo();

    useEffect(() => {
      inputRef.current?.focus();
    }, [edit]);

    useEffect(() => {
      if (isCompleted) {
        clearCompleted();
      }
    }, [clearCompleted, isCompleted]);

    const handleCheckboxChange = () => {
      setEdit(false);
      const nextCompleted = !isCompleted;
      setIsCompleted(nextCompleted);

      if (status === "authenticated") {
        editTodo.mutate({
          id: todo.id,
          title,
          isCompleted: nextCompleted,
        });
      } else if (status === "unauthenticated" || initialVisit) {
        localTodosDispatch!({
          type: "edited",
          id: todo.id,
          title,
          isCompleted: !isCompleted,
        });
      }
    };

    const handleCheckboxBlur = () => {
      setActive(false);
    };

    const handleTitleClick = () => {
      setEdit(todo.isCompleted ? false : true);
    };

    const handleTitleSubmit = (event: React.SyntheticEvent) => {
      event.preventDefault();
      setEdit(false);
      setActive(false);

      if (status === "authenticated") {
        editTodo.mutate({ id: todo.id, title, isCompleted });
      } else if (status === "unauthenticated" || initialVisit) {
        localTodosDispatch!({
          type: "edited",
          id: todo.id,
          title,
          isCompleted: isCompleted,
        });
      }
    };

    const handleTitleBlur = () => {
      setEdit(false);
      setActive(false);

      if (todo.title !== title) {
        if (status === "authenticated") {
          editTodo.mutate({ id: todo.id, title, isCompleted });
        } else if (status === "unauthenticated" || initialVisit) {
          localTodosDispatch!({
            type: "edited",
            id: todo.id,
            title,
            isCompleted: isCompleted,
          });
        }
      }
    };

    const handleTitleFocus = () => {
      setEdit(!todo.isCompleted);
      setActive(!todo.isCompleted);
    };

    return (
      <m.li
        ref={ref}
        layout
        key={todo.id}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
        exit={{ opacity: 0 }}
        onClick={handleTitleClick}
      >
        <div
          data-testid="todo-div"
          className={`flex h-20 cursor-text items-center rounded-3xl bg-white pl-5 shadow duration-200 ease-linear motion-reduce:transition-opacity dark:border dark:border-slate-50/10 dark:bg-neutral-700/40 dark:shadow-none sm:py-3.5 sm:pl-8 ${
            active || edit ? "ring-4 ring-blue-400 dark:ring-blue-500" : ""
          }`}
        >
          <input
            checked={isCompleted}
            type="checkbox"
            name="complete-todo"
            role="button"
            aria-pressed="false"
            aria-label="Mark completed"
            className="mr-4 h-7 w-7 appearance-none rounded-full border-2 border-slate-400/50 bg-slate-200/25 duration-200 ease-linear focus:border-spacing-0 focus:border-0 focus:outline-0 focus:ring-4 focus:ring-blue-400 focus:ring-offset-0 motion-reduce:transition-opacity dark:border-slate-50/10 dark:bg-neutral-700/40 focus:dark:ring-blue-500 sm:mr-6"
            onChange={handleCheckboxChange}
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
              tabIndex={todo.isCompleted ? -1 : 0}
            >
              <p
                className={`line-clamp-2 ${isCompleted ? "line-through" : ""}`}
              >
                {title}
              </p>
            </div>
          )}
        </div>
      </m.li>
    );
  })
);

export default Todo;
