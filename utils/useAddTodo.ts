import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Todos } from "./xata";

const addTodo = ({ title }: { title: string }): Promise<Todos> => {
  return axios.post("/api/add-todo", { title }).then((res) => res.data);
};

const useAddTodo = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation(addTodo, {
    onSuccess: () => {
      queryClient.invalidateQueries(["todos"]);
    },
  });

  return {
    addTodo: mutation.mutate,
  };
};

export default useAddTodo;
