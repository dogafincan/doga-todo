import { Dispatch, SetStateAction } from "react";
import { Session } from "next-auth";

export type LocalTodo = {
  id: string;
  title: string;
};

export type SetLocalTodos = Dispatch<SetStateAction<LocalTodo[]>>;

export type SetIsLoading = Dispatch<SetStateAction<boolean>>;

export type SessionStatus = "loading" | "authenticated" | "unauthenticated";

export type SessionContextType = {
  session: Session | null | undefined;
  status: SessionStatus;
};
