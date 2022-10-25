import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import HeroBanner from "../components/HeroBanner";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: Infinity,
    },
  },
});

describe("HeroBanner", () => {
  it("renders correctly", () => {
    render(
      <QueryClientProvider client={queryClient}>
        <HeroBanner initialVisit={true} />
      </QueryClientProvider>
    );

    const heading = screen.getByRole("heading", {
      name: /Doga Todo/i,
    });

    expect(heading).toBeInTheDocument();

    const SubHeading = screen.getByRole("heading", {
      name: /A fun way to get things done./i,
    });

    expect(SubHeading).toBeInTheDocument();

    const button = screen.getByRole("button", { name: "Sign in with GitHub" });

    expect(button).toBeInTheDocument();

    const memoji = screen.getByRole("img", { name: "Memoji of Doga Fincan" });

    expect(memoji).toBeInTheDocument();
  });
});
