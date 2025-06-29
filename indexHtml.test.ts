// ---------------------------------------------------------------------------
// index.html Regression Tests (indexHtml.test.ts)
// ---------------------------------------------------------------------------
// Ensures the root HTML file references the correct favicon so that
// browsers display the themed icon rather than the Vite default.
import { describe, it, expect } from "vitest";
import fs from "fs";
import { JSDOM } from "jsdom";

describe("index.html", () => {
  it("uses the Pokéball icon as the favicon", () => {
    const html = fs.readFileSync("index.html", "utf8");
    const dom = new JSDOM(html);
    const link = dom.window.document.querySelector("link[rel='icon']");
    expect(link?.getAttribute("href")).toBe("/assets/icons/pokeball_icon.svg");
  });
});
