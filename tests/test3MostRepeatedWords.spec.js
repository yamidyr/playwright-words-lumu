// @ts-check
import { test, expect } from "@playwright/test";

const url = "https://wordcounter.net/";


test("most repeated in normal text", async ({ page }) => {
  await page.goto(url);
  const input = page.locator("#box");

  const text =
    `lumu lumu lumu lumu lumu illuminates illuminates attacks and adversaries
lumu illuminates all attacks and adversaries`;

  await input.fill(text);

  const wordsInSection = page.locator("div#kwd-accordion-data a:nth-child(-n+3) .word");
  const densityOfWords = page.locator("div#kwd-accordion-data a:nth-child(-n+3) .badge");

  // Expect the correct number of words in text
  await expect(wordsInSection).toHaveText(["lumu","illuminates","attacks"]);

  //Expect the correct densities of words in the order of appearance
  await expect(densityOfWords).toHaveText([/^\s*6\b/,/^\s*3\b/,/^\s*2\b/]);
});

test("No text in the box", async ({ page }) => {
  await page.goto(url);
  const input = page.locator("#box");

  const wordsInSection = page.locator("div#kwd-accordion-data a:nth-child(-n+3) .word");

  // Expect the correct number of words in text
  await expect(wordsInSection).toHaveText([]);

});

test("most repeated if just one alphanumeric keywords", async ({ page }) => {
  await page.goto(url);
  const input = page.locator("#box");

  const text =
    `lumu1`;

  await input.fill(text);

  const wordsInSection = page.locator("div#kwd-accordion-data a:nth-child(-n+3) .word");
  const densityOfWords = page.locator("div#kwd-accordion-data a:nth-child(-n+3) .badge");

  // Expect the correct number of words in text
  await expect(wordsInSection).toHaveText(["lumu1"]);

  //Expect the correct densities of words in the order of appearance
  await expect(densityOfWords).toHaveText([/^\s*1\b/]);
});

test("most repeated if just one alphanumeric keywords repeated", async ({ page }) => {
  await page.goto(url);
  const input = page.locator("#box");

  const text =
    `lumu1 lumu1 lumu1 lumu1`;

  await input.fill(text);

  const wordsInSection = page.locator("div#kwd-accordion-data a:nth-child(-n+3) .word");
  const densityOfWords = page.locator("div#kwd-accordion-data a:nth-child(-n+3) .badge");

  // Expect the correct number of words in text
  await expect(wordsInSection).toHaveText(["lumu1"]);

  //Expect the correct densities of words in the order of appearance
  await expect(densityOfWords).toHaveText([/^\s*4\b/]);
});


test("most repeated if just two alphanumeric keywords repeated", async ({ page }) => {
  await page.goto(url);
  const input = page.locator("#box");

  const text =
    `lumu3 lumu3 bug5 bug5`;

  await input.fill(text);

  const wordsInSection = page.locator("div#kwd-accordion-data a:nth-child(-n+3) .word");
  const densityOfWords = page.locator("div#kwd-accordion-data a:nth-child(-n+3) .badge");

  // Expect the correct number of words in text
  await expect(wordsInSection).toHaveText(["lumu3","bug5"]);

  //Expect the correct densities of words in the order of appearance
  await expect(densityOfWords).toHaveText([/^\s*2\b/,/^\s*2\b/]);
});

test("One repeated keyword with special characters", async ({ page }) => {
  await page.goto(url);
  const input = page.locator("#box");

  const text =
    `lu$mu lu$mu`;

  await input.fill(text);

  const wordsInSection = page.locator("div#kwd-accordion-data a:nth-child(-n+3) .word");
  const densityOfWords = page.locator("div#kwd-accordion-data a:nth-child(-n+3) .badge");

  // Expect the correct number of words in text
  await expect(wordsInSection).toHaveText(["lu$mu"]);

  //Expect the correct densities of words in the order of appearance
  await expect(densityOfWords).toHaveText([/^\s*2\b/]);
});

test("special character &", async ({ page }) => {
  await page.goto(url);
  const input = page.locator("#box");

  const text =
    `& & &`;

  await input.fill(text);

  const wordsInSection = page.locator("div#kwd-accordion-data a:nth-child(-n+3) .word");
  const densityOfWords = page.locator("div#kwd-accordion-data a:nth-child(-n+3) .badge");

  // Expect the correct number of words in text
  await expect(wordsInSection).toHaveText(["&"]);

  //Expect the correct densities of words in the order of appearance
  await expect(densityOfWords).toHaveText([/^\s*3\b/]);
});

test("If there are hyphenated keywords in more than one line", async ({ page }) => {
  await page.goto(url);
  const input = page.locator("#box");

  const text =
    `lumu lumu lu-\nmu`;

  await input.fill(text);

  const wordsInSection = page.locator("div#kwd-accordion-data a:nth-child(-n+3) .word");
  const densityOfWords = page.locator("div#kwd-accordion-data a:nth-child(-n+3) .badge");

  // Expect the correct number of words in text
  await expect(wordsInSection).toHaveText(["lumu"]);

  //Expect the correct densities of words in the order of appearance
  await expect(densityOfWords).toHaveText([/^\s*3\b/]);
});


test("Not case-sensitive words", async ({ page }) => {
  await page.goto(url);
  const input = page.locator("#box");

  const text =
    `Lumu LuMu lumu bUg Bug Case case`;

  await input.fill(text);

  const wordsInSection = page.locator("div#kwd-accordion-data a:nth-child(-n+3) .word");
  const densityOfWords = page.locator("div#kwd-accordion-data a:nth-child(-n+3) .badge");

  // Expect the correct number of words in text
  await expect(wordsInSection).toHaveText(["lumu","bug","case"]);

  //Expect the correct densities of words in the order of appearance
  await expect(densityOfWords).toHaveText([/^\s*3\b/,/^\s*2\b/,/^\s*2\b/]);
});


test("If there are non-keywords (english)", async ({ page }) => {
  await page.goto(url);
  const input = page.locator("#box");

  const text =
    `and and`;

  await input.fill(text);

  const wordsInSection = page.locator("div#kwd-accordion-data a:nth-child(-n+3) .word");
  const densityOfWords = page.locator("div#kwd-accordion-data a:nth-child(-n+3) .badge");

  // Expect the correct number of words in text
  await expect(wordsInSection).toHaveText(["and"]);

  //Expect the correct densities of words in the order of appearance
  await expect(densityOfWords).toHaveText([/^\s*2\b/]);
});
