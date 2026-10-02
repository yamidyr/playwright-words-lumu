// @ts-check
import { test, expect } from "@playwright/test";

const url = "https://wordcounter.net/";


test("Count words in normal text", async ({ page }) => {
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

test("empty text has 0 words", async ({ page }) => {
  await page.goto(url);
  const input = page.locator("#box");
  const wordCounter = page.locator("span#word_count");

  const text =``;

  await input.fill(text);

  // Expect 0
  await expect(wordCounter).toHaveText("0");
});

test("Char '&' is a word", async ({ page }) => {
  await page.goto(url);
  const input = page.locator("#box");
  const wordCounter = page.locator("span#word_count");

  const text =`&`;

  await input.fill(text);

  // Expect 0
  await expect(wordCounter).toHaveText("1");
});

test("Numbers are words", async ({ page }) => {
  await page.goto(url);
  const input = page.locator("#box");
  const wordCounter = page.locator("span#word_count");

  const text =`5 1980 35`;

  await input.fill(text);

  // Expect 0
  await expect(wordCounter).toHaveText("3");
});

test("Words with special char $ in between", async ({ page }) => {
  await page.goto(url);
  const input = page.locator("#box");
  const wordCounter = page.locator("span#word_count");

  const text =`Hello$world`;

  await input.fill(text);

  // Expect 0
  await expect(wordCounter).toHaveText("1");
});

test("Dates with format like dd/mm/aaaa are just one word", async ({ page }) => {
  await page.goto(url);
  const input = page.locator("#box");
  const wordCounter = page.locator("span#word_count");

  const text =`01/10/2016`;

  await input.fill(text);

  // Expect 0
  await expect(wordCounter).toHaveText("1");
});

test("hyphenated words in two lines must be counted only one", async ({ page }) => {
  await page.goto(url);
  const input = page.locator("#box");
  const wordCounter = page.locator("span#word_count");

  const text =`Wel-\ncome`;

  await input.fill(text);

  // Expect 0
  await expect(wordCounter).toHaveText("1");
});


//There are special characters that works:
test("Words with special chars ° - @ . in between", async ({ page }) => {
  await page.goto(url);
  const input = page.locator("#box");
  const wordCounter = page.locator("span#word_count");

  const text =`Lu°mu Lu-mu lu@mu lu.mu `;

  await input.fill(text);

  // Expect 0
  await expect(wordCounter).toHaveText("4");
});

