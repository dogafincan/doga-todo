import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Todos } from "@utils/xata";

const clearCompletedTodos = async (): Promise<Todos[]> => {
  const res = await axios.post("/api/clear-completed-todos");
  return res.data;
};

const useClearCompletedTodos = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation(clearCompletedTodos, {
    onMutate: async () => {
      await queryClient.cancelQueries(["todos"]);
      const previousTodos = queryClient.getQueryData<Todos[]>(["todos"]);

      if (previousTodos) {
        queryClient.setQueryData<Todos[]>(["todos"], (old) =>
          old!.filter((oldTodo) => !oldTodo.isCompleted)
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
    clearCompletedTodos: mutation,
  };
};

export default useClearCompletedTodos;
