import { memo } from "react";
import { AnimatePresence, m } from "framer-motion";
import Todo from "@/components/Todo";
import AddTodoForm from "@/components/AddTodoForm";
import { ClearCompleted, LocalTodo, LocalTodosDispatch } from "@/utils/types";

const LocalTodos = memo(function LocalTodos({
  clearCompleted,
  localTodos,
  localTodosDispatch,
}: {
  clearCompleted: ClearCompleted;
  localTodos: LocalTodo[];
  localTodosDispatch: LocalTodosDispatch;
}) {
  return (
    <>
      <AddTodoForm localTodosDispatch={localTodosDispatch} isFetched={true} />
      <m.ul
        layout
        initial={false}
        transition={{ duration: 0.4 }}
        animate={{
          // The height of the unordered list is calculated using a
          // hardcoded number. In the future, it might be better to
          // calculate the height dynamically.
          height: `calc(96px*${localTodos.length})`,
        }}
        className="space-y-4"
      >
        <AnimatePresence mode="popLayout">
          {localTodos.map((localTodo) => {
            return (
              <Todo
                key={localTodo.id}
                todo={localTodo}
                localTodosDispatch={localTodosDispatch}
                clearCompleted={clearCompleted}
              />
            );
          })}
        </AnimatePresence>
      </m.ul>
    </>
  );
});

export default LocalTodos;
