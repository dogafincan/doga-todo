import { Dispatch, memo, SetStateAction } from "react";
import { AnimatePresence } from "framer-motion";
import Todo from "@components/Todo";
import InvisibleDiv from "@components/InvisibleDiv";
import {
  ClearCompleted,
  LocalTodo,
  SetInvisibleDivs,
  SetLocalTodos,
} from "@utils/types";

const LocalTodos = memo(function LocalTodos({
  localTodos,
  setLocalTodos,
  initialVisit,
  clearCompleted,
  invisibleDivs,
  setInvisibleDivs,
}: {
  localTodos: LocalTodo[];
  setLocalTodos: SetLocalTodos;
  initialVisit: boolean;
  clearCompleted: ClearCompleted;
  invisibleDivs: string[];
  setInvisibleDivs: SetInvisibleDivs;
}) {
  return (
    <>
      <AnimatePresence>
        {localTodos.map((localTodo) => {
          return (
            <Todo
              key={localTodo.id}
              todo={localTodo}
              localTodos={localTodos}
              setLocalTodos={setLocalTodos}
              initialVisit={initialVisit}
              clearCompleted={clearCompleted}
              invisibleDivs={invisibleDivs}
              setInvisibleDivs={setInvisibleDivs}
            />
          );
        })}
      </AnimatePresence>
      <AnimatePresence>
        {invisibleDivs.map((key) => {
          return (
            <InvisibleDiv
              key={key}
              invisibleDivs={invisibleDivs}
              setInvisibleDivs={setInvisibleDivs}
            />
          );
        })}
      </AnimatePresence>
    </>
  );
});

export default LocalTodos;
