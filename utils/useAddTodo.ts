import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Todos } from "./xata";

const addTodo = async ({ id, title }: Todos): Promise<Todos> => {
  const res = await axios.post("/api/add-todo", { id, title });
  return res.data;
};

const useAddTodo = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation(addTodo, {
    onMutate: async (newTodo: Todos) => {
      await queryClient.cancelQueries(["todos"]);
      const previousTodos = queryClient.getQueryData<Todos[]>(["todos"]);

      if (previousTodos) {
        queryClient.setQueryData<Todos[]>(
          ["todos"],
          [newTodo, ...previousTodos]
        );
      }

      return { previousTodos };
    },
    onError: (_err, _newTodo, context) => {
      if (context?.previousTodos) {
        queryClient.setQueryData(["todos"], context.previousTodos);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries(["todos"]);
    },
  });

  return {
    addTodo: mutation,
  };
};

export default useAddTodo;
