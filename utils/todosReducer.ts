import { v4 as uuid } from "uuid";
import { LocalTodo, LocalTodosReducerActions } from "@/utils/types";

function localTodosReducer(
  localTodos: LocalTodo[],
  action: LocalTodosReducerActions
) {
  switch (action.type) {
    case "added": {
      return [
        { id: "todo" + uuid(), title: action.title, isCompleted: false },
        ...localTodos,
      ];
    }
    case "filtered": {
      return localTodos.filter((localTodo) => !localTodo.isCompleted);
    }
    case "edited": {
      return localTodos.map((localTodo) => {
        if (localTodo.id === action.id) {
          return {
            id: action.id,
            title: action.title,
            isCompleted: action.isCompleted,
          };
        } else {
          return localTodo;
        }
      });
    }
  }
}

export default localTodosReducer;
