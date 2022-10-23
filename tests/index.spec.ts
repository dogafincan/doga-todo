import { test, expect } from "@playwright/test";

test.describe("index page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("page", async ({ page }) => {
    await expect(page).toHaveTitle("Doga Todo");
  });

  test("hero banner", async ({ page }) => {
    const title = page.getByRole("heading", {
      name: "Doga Todo",
    });

    await expect(title).toBeVisible();

    const subTitle = page.getByRole("heading", {
      name: "A fun way to get things done.",
    });

    await expect(subTitle).toBeVisible();

    const button = page.getByRole("button", {
      name: "Sign in with Github",
    });

    await expect(button).toBeVisible();

    const memoji = page.getByRole("img", {
      name: "Memoji of Doga Fincan",
    });

    await expect(memoji).toBeVisible();
  });

  test("add todo form", async ({ page }) => {
    const addTodoForm = page.getByPlaceholder("Add todo");

    await expect(addTodoForm).toBeVisible();

    const todosBefore = await page
      .getByRole("button", { name: "Mark completed" })
      .count();

    await expect(addTodoForm).not.toHaveCSS("--tw-ring-opacity", /1/);

    await page.getByPlaceholder("Add todo").click();

    await expect(addTodoForm).toHaveCSS("--tw-ring-opacity", /1/);

    await page.getByPlaceholder("Add todo").fill("Test");

    await page.getByPlaceholder("Add todo").press("Enter");

    const todosAfter = await page
      .getByRole("button", { name: "Mark completed" })
      .count();

    expect(todosAfter).toBe(todosBefore + 1);
  });

  test("todos", async ({ page }) => {
    const todos = await page
      .getByRole("button", { name: "Mark completed" })
      .first();

    await expect(todos).toBeVisible();

    const todosCountBeforeAdd = await page
      .getByRole("button", { name: "Mark completed" })
      .count();

    expect(todosCountBeforeAdd).toBe(5);

    await page.getByPlaceholder("Add todo").click();

    await page.getByPlaceholder("Add todo").fill("Test");

    await page.getByPlaceholder("Add todo").press("Enter");

    const todosCountAfterAdd = await page
      .getByRole("button", { name: "Mark completed" })
      .count();

    expect(todosCountAfterAdd).toBe(todosCountBeforeAdd + 1);

    const toBeEdited = page.locator("li > div >> nth=0");

    await page.getByText("Test").click();

    await expect(toBeEdited).toHaveCSS("--tw-ring-opacity", /1/);

    await page.getByPlaceholder("Add title").fill("Test!");

    await page.getByPlaceholder("Add title").press("Enter");

    await expect(toBeEdited).not.toHaveCSS("--tw-ring-opacity", /1/);

    const toBeCompleted = page.getByText("Test!");

    await page
      .getByRole("button", { name: "Mark completed" })
      .nth(0)
      .check({ timeout: 1000 });

    await expect(toBeCompleted).not.toBeVisible();

    const todosCountAfterClear = await page
      .getByRole("button", { name: "Mark completed" })
      .count();

    expect(todosCountAfterClear).toBe(todosCountAfterAdd - 1);
  });
});
