import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Todos } from "@utils/xata";
import { useSession } from "next-auth/react";

const deleteTodo = async ({ id }: { id: string }): Promise<Todos> => {
  const res = await axios.post("/api/delete-todo", { id });
  return res.data;
};

const useDeleteTodo = () => {
  const { data: session } = useSession();
  const queryClient = useQueryClient();

  const mutation = useMutation(deleteTodo, {
    onMutate: async (deletedTodo: Todos) => {
      await queryClient.cancelQueries(["todos" + session?.user?.email ?? ""]);
      const previousTodos = queryClient.getQueryData<Todos[]>(["todos"]);

      if (previousTodos) {
        queryClient.setQueryData<Todos[]>(
          ["todos" + session?.user?.email ?? ""],
          previousTodos.filter((todo) => todo.id !== deletedTodo.id)
        );
      }

      return { previousTodos };
    },
    onError: (_err, _deletedTodo, context) => {
      if (context?.previousTodos) {
        queryClient.setQueryData(
          ["todos" + session?.user?.email ?? ""],
          context.previousTodos
        );
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries(["todos" + session?.user?.email ?? ""]);
    },
  });

  return {
    deleteTodo: mutation,
  };
};

export default useDeleteTodo;
