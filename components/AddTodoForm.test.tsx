import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AddTodoForm from "@/components/AddTodoForm";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: Infinity,
    },
  },
});

describe("HeroBanner", () => {
  it("renders correctly", async () => {
    const localTodosDispatch = jest.fn();

    render(
      <QueryClientProvider client={queryClient}>
        <AddTodoForm
          initialVisit={true}
          localTodosDispatch={localTodosDispatch}
          isFetched={true}
        />
      </QueryClientProvider>
    );

    const input = screen.getByPlaceholderText("Add todo");

    expect(input).toBeInTheDocument();
  });

  it("behaves correctly when entering a todo title", async () => {
    const localTodosDispatch = jest.fn();

    render(
      <QueryClientProvider client={queryClient}>
        <AddTodoForm
          initialVisit={true}
          localTodosDispatch={localTodosDispatch}
          isFetched={true}
        />
      </QueryClientProvider>
    );

    const input = screen.getByPlaceholderText("Add todo");

    await userEvent.type(input, "Test");

    expect(input).toHaveValue("Test");

    await userEvent.keyboard("{enter}");

    expect(input).toHaveValue("");

    expect(localTodosDispatch).toHaveBeenCalled();
  });
});
