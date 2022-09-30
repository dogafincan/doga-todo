import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Todos } from "./xata";

const getTodos = async (): Promise<Todos[]> => {
  const res = await axios.get("/api/get-todos");
  return res.data;
};

const useGetTodos = () => {
  const { status, data, error } = useQuery<Todos[], Error>(["todos"], getTodos);

  return {
    status,
    data,
    error,
  };
};

export default useGetTodos;
