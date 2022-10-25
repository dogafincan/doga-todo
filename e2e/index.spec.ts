import { test, expect } from "@playwright/test";

test.describe("index page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("renders", async ({ page }) => {
    await expect(page).toHaveTitle("Doga Todo");
  });

  test("adds, edits, and marks todos as completed", async ({ page }) => {
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

    await page.getByText("Test").click();

    await page.getByPlaceholder("Add title").fill("Test!");

    await page.getByPlaceholder("Add title").press("Enter");

    const toBeCompleted = page.getByText("Test!");

    await page.getByRole("button", { name: "Mark completed" }).nth(0).check();

    await expect(toBeCompleted).not.toBeVisible();

    const todosCountAfterClear = await page
      .getByRole("button", { name: "Mark completed" })
      .count();

    expect(todosCountAfterClear).toBe(todosCountAfterAdd - 1);
  });
});
