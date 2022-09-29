import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Todos } from "./xata";

const editTodo = ({
  id,
  title,
}: {
  id: string;
  title: string;
}): Promise<Todos> => {
  return axios.patch("/api/edit-todo", { id, title }).then((res) => res.data);
};

const useEditTodo = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation(editTodo, {
    onSuccess: () => {
      queryClient.invalidateQueries(["todos"]);
    },
  });

  return {
    editTodo: mutation.mutate,
  };
};

export default useEditTodo;
