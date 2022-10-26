import { memo } from "react";
import { AnimatePresence, m } from "framer-motion";
import Todo from "@/components/Todo";
import AddTodoForm from "@/components/AddTodoForm";
import useGetTodos from "@/utils/useGetTodos";
import { ClearCompleted } from "@/utils/types";

const Todos = memo(function Todos({
  initialVisit,
  clearCompleted,
}: {
  initialVisit: boolean;
  clearCompleted: ClearCompleted;
}) {
  const { data, isFetched } = useGetTodos();

  return (
    <>
      <AddTodoForm initialVisit={initialVisit} isFetched={isFetched} />
      <m.ul
        layout
        initial={false}
        transition={{ duration: 0.4 }}
        animate={{
          height: `calc(96px*${data ? data.length : 0})`,
        }}
        className="space-y-4"
      >
        <AnimatePresence mode="popLayout">
          {data &&
            data?.map((todo) => {
              return (
                <Todo
                  key={todo.id}
                  todo={todo}
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

export default Todos;
