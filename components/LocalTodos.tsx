import { memo } from "react";
import { AnimatePresence, m } from "framer-motion";
import Todo from "@/components/Todo";
import AddTodoForm from "@/components/AddTodoForm";
import { ClearCompleted, LocalTodo, LocalTodosDispatch } from "@/utils/types";

const LocalTodos = memo(function LocalTodos({
  initialVisit,
  clearCompleted,
  localTodos,
  localTodosDispatch,
}: {
  initialVisit: boolean;
  clearCompleted: ClearCompleted;
  localTodos: LocalTodo[];
  localTodosDispatch: LocalTodosDispatch;
}) {
  return (
    <>
      <AddTodoForm
        initialVisit={initialVisit}
        localTodosDispatch={localTodosDispatch}
        isFetched={true}
      />
      <m.ul
        layout
        initial={false}
        transition={{ duration: 0.4 }}
        animate={{
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
                initialVisit={initialVisit}
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
