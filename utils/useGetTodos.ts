import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Todos } from "./xata";

const getTodos = (): Promise<Todos[]> => {
  return axios.get("/api/get-todos").then((res) => res.data);
};

const useGetTodos = () => {
  const { status, data, error } = useQuery<Todos[], Error>(["todos"], getTodos);

  if (status === "success")
    localStorage.setItem("todosCount", String(data.length));

  return {
    status,
    data,
    error,
  };
};

export default useGetTodos;
