// ---------------------------------------------------------------------------
// build_pronunciations CLI Test (build_pronunciations.test.ts)
// ---------------------------------------------------------------------------
// Validates that the pronunciation generation script accepts custom input and
// output paths and produces the expected JSON shape.
import { describe, it, expect } from "vitest";
import { execFileSync } from "child_process";
import fs from "fs";

const INPUT = "./test_words.json";
const OUTPUT = "./test_output.json";

describe("build_pronunciations CLI", () => {
  it("creates pronunciation file from the provided list", () => {
    if (fs.existsSync(OUTPUT)) fs.unlinkSync(OUTPUT);

    execFileSync("python3", [
      "build_pronunciations.py",
      "--input",
      INPUT,
      "--output",
      OUTPUT,
    ]);

    const data = JSON.parse(fs.readFileSync(OUTPUT, "utf8"));
    expect(data.length).toBe(2);
    expect(data[0]).toHaveProperty("word");
    expect(data[0]).toHaveProperty("pronunciation");

    fs.unlinkSync(OUTPUT);
  });
});
