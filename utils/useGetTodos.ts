import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Todos } from "@utils/xata";
import { useSession } from "next-auth/react";

const getTodos = async (): Promise<Todos[]> => {
  const res = await axios.get("/api/get-todos");
  return res.data;
};

const useGetTodos = () => {
  const { data: session } = useSession();

  const { status, data, isFetched } = useQuery<Todos[], Error>(
    ["todos" + session?.user?.email ?? ""],
    getTodos
  );

  return {
    status,
    data,
    isFetched,
  };
};

export default useGetTodos;
