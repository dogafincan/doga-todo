import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Todos } from "@utils/xata";
import { useSession } from "next-auth/react";

const addTodo = async ({ id, title }: Todos): Promise<Todos> => {
  const res = await axios.post("/api/add-todo", { id, title });
  return res.data;
};

const useAddTodo = () => {
  const { data: session } = useSession();
  const queryClient = useQueryClient();

  const mutation = useMutation(addTodo, {
    onMutate: async (newTodo: Todos) => {
      await queryClient.cancelQueries(["todos" + session?.user?.email ?? ""]);
      const previousTodos = queryClient.getQueryData<Todos[]>([
        "todos" + session?.user?.email ?? "",
      ]);

      if (previousTodos) {
        queryClient.setQueryData<Todos[]>(
          ["todos" + session?.user?.email ?? ""],
          [newTodo, ...previousTodos]
        );
      }

      return { previousTodos };
    },
    onError: (_err, _newTodo, context) => {
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
    addTodo: mutation,
  };
};

export default useAddTodo;
