import { describe, expect, it } from "vitest";
import { isTheme, logoSrcForTheme, THEMES } from "./theme";

describe("theme", () => {
  it("lists three themes", () => {
    expect(THEMES).toEqual(["light", "dark", "green"]);
  });

  it("validates theme ids", () => {
    expect(isTheme("light")).toBe(true);
    expect(isTheme("purple")).toBe(false);
  });

  it("picks logo lockup per theme", () => {
    expect(logoSrcForTheme("light")).toBe("/brand/logo-full.png");
    expect(logoSrcForTheme("dark")).toContain("on-dark");
    expect(logoSrcForTheme("green")).toContain("on-green");
  });
});
