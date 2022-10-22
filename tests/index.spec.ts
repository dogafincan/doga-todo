import { test, expect } from "@playwright/test";

test.describe("index page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("hero banner loads correctly", async ({ page }) => {
    await expect(page).toHaveTitle("Doga Todo");

    const subTitle = page.getByRole("heading", {
      name: "A fun way to get things done.",
    });

    await expect(subTitle).toBeVisible();

    const button = page.getByRole("button", { name: "Sign in with Github" });

    await expect(button).toBeVisible();

    const memoji = page.getByRole("img", { name: "Memoji of Doga Fincan" });

    await expect(memoji).toBeVisible();
  });

  test("add todo form loads correctly", async ({ page }) => {
    const addTodoForm = page.getByPlaceholder("Add todo");

    await expect(addTodoForm).toBeVisible();
  });
});
