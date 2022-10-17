import { Dispatch, SetStateAction } from "react";
import { Session } from "next-auth";
import { DebouncedState } from "use-debounce";

export type LocalTodo = {
  id: string;
  title: string;
  isCompleted: boolean;
};

export type SetLocalTodos = Dispatch<SetStateAction<LocalTodo[]>>;

export type SetIsLoading = Dispatch<SetStateAction<boolean>>;

export type SessionStatus = "loading" | "authenticated" | "unauthenticated";

export type SessionContextType = {
  session: Session | null | undefined;
  status: SessionStatus;
};

export type ClearCompleted = DebouncedState<() => void>;
