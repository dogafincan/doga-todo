import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Todos } from "./xata";

const deleteTodo = ({ id }: { id: string }): Promise<Todos> => {
  return axios.post("/api/delete-todo", { id }).then((res) => res.data);
};

const useDeleteTodo = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation(deleteTodo, {
    onSuccess: () => {
      queryClient.invalidateQueries(["todos"]);
    },
  });

  return {
    deleteTodo: mutation.mutate,
  };
};

export default useDeleteTodo;
