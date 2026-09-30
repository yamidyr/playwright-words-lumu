// @ts-check
import { test, expect } from "@playwright/test";

const url = "https://wordcounter.net/";


test("chars in normal text", async ({ page }) => {
  await page.goto(url);
  const input = page.locator("#box");
  const wordCounter = page.locator("span#word_count");

  const text =
    `Lorem ipsum dolor sit amet, consectetur
    adipiscing elit, sed do eiusmod tempor incididunt
    ut labore et dolore magna aliqua.`;

  await input.fill(text);

  // Expect the correct number of words in text
  await expect(wordCounter).toHaveText("19");
});

test("empty text", async ({ page }) => {
  await page.goto(url);
  const input = page.locator("#box");
  const wordCounter = page.locator("span#word_count");

  const text =``;

  await input.fill(text);

  // Expect 0
  await expect(wordCounter).toHaveText("0");
});

