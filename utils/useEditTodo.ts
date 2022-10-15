import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Todos } from "@utils/xata";

const editTodo = async ({
  id,
  title,
  isCompleted,
}: {
  id: string;
  title: string;
  isCompleted: boolean;
}): Promise<Todos> => {
  const res = await axios.patch("/api/edit-todo", { id, title, isCompleted });
  return res.data;
};

const useEditTodo = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation(editTodo, {
    onMutate: async (newTodo: Todos) => {
      await queryClient.cancelQueries(["todos"]);
      const previousTodos = queryClient.getQueryData<Todos[]>(["todos"]);

      if (previousTodos) {
        queryClient.setQueryData<Todos[]>(["todos"], (old) => {
          return old?.map((oldTodo) => {
            if (oldTodo.id === newTodo.id) {
              return newTodo;
            } else {
              return oldTodo;
            }
          });
        });
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
    editTodo: mutation,
  };
};

export default useEditTodo;
