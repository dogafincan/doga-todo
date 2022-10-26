import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import LocalTodos from "@/components/LocalTodos";
import { useDebouncedCallback } from "use-debounce";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: Infinity,
    },
  },
});

const localTodos = [
  {
    id: "1",
    title: "👋 I've set up a few todos for you to play around with.",
    isCompleted: false,
  },
  {
    id: "2",
    title: "🥥 Write down a new todo using the input field above.",
    isCompleted: false,
  },
  {
    id: "3",
    title: "🥭 Todos are added by pressing the return key.",
    isCompleted: false,
  },
  {
    id: "4",
    title: "🥑 Mark a todo as completed using the checkboxes on the left.",
    isCompleted: false,
  },
  {
    id: "5",
    title: "🚀 Finally, sign in with GitHub to create your own todos!",
    isCompleted: false,
  },
];

describe("Todo", () => {
  it("renders correctly", async () => {
    const localTodosDispatch = jest.fn();
    const clearCompletedTest = jest.fn();

    const Component = () => {
      const clearCompletedDebounced = useDebouncedCallback(clearCompletedTest);

      return (
        <QueryClientProvider client={queryClient}>
          <LocalTodos
            initialVisit={true}
            localTodos={localTodos}
            localTodosDispatch={localTodosDispatch}
            clearCompleted={clearCompletedDebounced}
          />
        </QueryClientProvider>
      );
    };

    render(<Component />);

    const checkBoxes = screen.getAllByRole("button", {
      name: "Mark completed",
    });

    expect(checkBoxes).toHaveLength(5);
  });
});
