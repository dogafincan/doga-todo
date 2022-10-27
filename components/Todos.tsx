import { memo } from "react";
import { AnimatePresence, m } from "framer-motion";
import Todo from "@/components/Todo";
import AddTodoForm from "@/components/AddTodoForm";
import useGetTodos from "@/utils/useGetTodos";
import { ClearCompleted } from "@/utils/types";

const Todos = memo(function Todos({
  clearCompleted,
}: {
  clearCompleted: ClearCompleted;
}) {
  const { data, isFetched } = useGetTodos();

  return (
    <>
      <AddTodoForm isFetched={isFetched} />
      <m.ul
        layout
        initial={false}
        transition={{ duration: 0.4 }}
        animate={{
          // The height of the unordered list is calculated using a
          // hardcoded number. In the future, it might be better to
          // calculate the height dynamically.
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
