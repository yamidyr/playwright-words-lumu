// @ts-check
import { test, expect } from "@playwright/test";

const url = "https://wordcounter.net/";


test("chars in normal text", async ({ page }) => {
  await page.goto(url);
  const input = page.locator("#box");
  const charCounter = page.locator("span#character_count");

  const text =
    `Lorem ipsum dolor sit amet, consectetur
    adipiscing elit, sed do eiusmod tempor incididunt
    ut labore et dolore magna aliqua.
    Ut enim ad minim veniam, quis nostrud
    exercitation ullamco laboris nisi ut aliquip
    ex ea commodo consequat. Duis aute irure
    dolor in reprehenderit in voluptate velit
    esse cillum dolore eu fugiat nulla pariatur.
    Excepteur sint occaecat cupidatat non proident,
    sunt in culpa qui officia deserunt mollit anim id est laborum.`;

  await input.fill(text);

  // Expect the correct number of characters in text
  await expect(charCounter).toHaveText("472");
});

test("empty text", async ({ page }) => {
  await page.goto(url);
  const input = page.locator("#box");
  const charCounter = page.locator("span#character_count");

  const text =``;

  await input.fill(text);

  // Expect 0
  await expect(charCounter).toHaveText("0");
});

test("counting tabulation correctly", async ({ page }) => {
  await page.goto(url);
  const input = page.locator("#box");
  const charCounter = page.locator("span#character_count");

  const text =`	  lorem ipsum `; //text with tabulations

  await input.fill(text);

  // Expect the correct number of spaces + tabulations + chars
  await expect(charCounter).toHaveText("15");
});

test("counting with special chars", async ({ page }) => {
  await page.goto(url);
  const input = page.locator("#box");
  const charCounter = page.locator("span#character_count");

  const text =`@ + $lorem ipsum * $ #" "!.?¿%&<>-_:;,{}()`; //text with tabulations

  await input.fill(text);

  // Expect the correct number of spaces + tabulations + chars + special chars
  await expect(charCounter).toHaveText("42");
});

