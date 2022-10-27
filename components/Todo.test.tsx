import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useDebouncedCallback } from "use-debounce";
import Todo from "@/components/Todo";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: Infinity,
    },
  },
});

const todo = {
  id: "1",
  title: "Test Todo",
  createdBy: "email@example.com",
  isCompleted: false,
};

describe("Todo", () => {
  it("renders correctly", async () => {
    const localTodosDispatch = jest.fn();
    const clearCompletedTest = jest.fn();

    const Component = () => {
      const clearCompletedDebounced = useDebouncedCallback(clearCompletedTest);

      return (
        <QueryClientProvider client={queryClient}>
          <Todo
            todo={todo}
            localTodosDispatch={localTodosDispatch}
            clearCompleted={clearCompletedDebounced}
          />
        </QueryClientProvider>
      );
    };

    render(<Component />);

    const todoDiv = screen.getByTestId("todo-div");

    expect(todoDiv).toBeInTheDocument();

    const todoLi = screen.getByRole("listitem");

    expect(todoLi).toBeInTheDocument();

    expect(todoDiv).not.toHaveClass("ring-4");

    await userEvent.click(todoLi);

    expect(todoDiv).toHaveClass("ring-4");

    const checkbox = screen.getByRole("button", { name: "Mark completed" });

    expect(checkbox).toBeInTheDocument();

    await userEvent.click(checkbox);

    expect(checkbox).toBeChecked();
  });
});
