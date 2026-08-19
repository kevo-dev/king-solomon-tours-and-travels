import { readFile } from "node:fs/promises";
import { describe, expect, it } from "vitest";

describe("Next.js migration", () => {
  it("uses Next.js for the production build and keeps the custom server bundle", async () => {
    const packageJson = JSON.parse(await readFile(new URL("../package.json", import.meta.url), "utf8")) as {
      dependencies: Record<string, string>;
      scripts: Record<string, string>;
    };

    expect(packageJson.dependencies.next).toBeDefined();
    expect(packageJson.scripts.build).toContain("next build");
    expect(packageJson.scripts.build).toContain("server/_core/index.ts");
    expect(packageJson.scripts.build).toContain("dist/public/next-runtime.txt");
  });
});
