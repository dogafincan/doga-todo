import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Todos } from "@utils/xata";

const editTodo = async ({
  id,
  title,
}: {
  id: string;
  title: string;
}): Promise<Todos> => {
  const res = await axios.patch("/api/edit-todo", { id, title });
  return res.data;
};

const useEditTodo = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation(editTodo, {
    onMutate: async (newTodo: Todos) => {
      await queryClient.cancelQueries(["todos"]);
      const previousTodo = queryClient.getQueryData<Todos>(["todos"]);

      if (previousTodo) {
        queryClient.setQueryData<Todos>(["todos"], newTodo);
      }

      return { previousTodo, newTodo };
    },
    onError: (_err, newTodo, context) => {
      if (context?.previousTodo) {
        queryClient.setQueryData(["todos"], context.previousTodo);
      }
    },
    onSettled: (newTodo) => {
      if (newTodo) {
        queryClient.invalidateQueries(["todos"]);
      }
    },
  });

  return {
    editTodo: mutation,
  };
};

export default useEditTodo;
