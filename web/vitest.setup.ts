import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach, vi } from "vitest";

afterEach(() => {
  cleanup();
});

Object.defineProperty(URL, "createObjectURL", {
  writable: true,
  configurable: true,
  value: vi.fn(() => "blob:mock"),
});
Object.defineProperty(URL, "revokeObjectURL", {
  writable: true,
  configurable: true,
  value: vi.fn(),
});
