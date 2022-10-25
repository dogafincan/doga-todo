import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Todos } from "../utils/xata";

const addTodo = async ({ id, title }: Todos): Promise<Todos> => {
  const response = await fetch("/api/add-todo", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id,
      title,
    }),
  });

  const data = await response.json();

  return data;
};

const useAddTodo = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation(addTodo, {
    onMutate: async (newTodo: Todos) => {
      await queryClient.cancelQueries(["todos"]);
      const previousTodos = queryClient.getQueryData<Todos[]>(["todos"]);

      if (previousTodos) {
        queryClient.setQueryData<Todos[]>(["todos"], (old) => [
          newTodo,
          ...old!,
        ]);
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
