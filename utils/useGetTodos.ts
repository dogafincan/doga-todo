import { useQuery } from "@tanstack/react-query";
import { Todos } from "@/utils/xata";

const getTodos = async (): Promise<Todos[]> => {
  const response = await fetch("/api/get-todos", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();

  return data;
};

const useGetTodos = () => {
  const { status, data, isFetched } = useQuery<Todos[], Error>(
    ["todos"],
    getTodos
  );

  return {
    status,
    data,
    isFetched,
  };
};

export default useGetTodos;
