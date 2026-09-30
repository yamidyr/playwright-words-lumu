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

  // Expect the correct number of words in text
  await expect(wordsInSection).toHaveText(["lumu","illuminates","attacks"]);
});
