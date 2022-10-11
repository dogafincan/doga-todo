import { Dispatch, SetStateAction } from "react";

export type LocalTodo = {
  id: string;
  title: string;
};

export type SetLocalTodos = Dispatch<SetStateAction<LocalTodo[]>>;

export type SetIsLoading = Dispatch<SetStateAction<boolean>>;

export type SignInStatus = "authenticated" | "unauthenticated";
