import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Todos } from "./xata";

const deleteTodo = async ({ id }: { id: string }): Promise<Todos> => {
  const res = await axios.post("/api/delete-todo", { id });
  return res.data;
};

const useDeleteTodo = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation(deleteTodo, {
    onMutate: async (deletedTodo: Todos) => {
      await queryClient.cancelQueries(["todos"]);
      const previousTodos = queryClient.getQueryData<Todos[]>(["todos"]);

      if (previousTodos) {
        queryClient.setQueryData<Todos[]>(
          ["todos"],
          previousTodos.filter((todo) => todo.id !== deletedTodo.id)
        );
      }

      return { previousTodos };
    },
    onError: (_err, _deletedTodo, context) => {
      if (context?.previousTodos) {
        queryClient.setQueryData(["todos"], context.previousTodos);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries(["todos"]);
    },
  });

  return {
    deleteTodo: mutation,
  };
};

export default useDeleteTodo;
