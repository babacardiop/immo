import { describe, expect, it } from "vitest";

/** Pure helper mirroring swap logic used by reorderListingPhotoAction. */
function swapOrders(
  ids: string[],
  mediaId: string,
  direction: "up" | "down",
): string[] {
  const index = ids.indexOf(mediaId);
  if (index < 0) return ids;
  const swapWith = direction === "up" ? index - 1 : index + 1;
  if (swapWith < 0 || swapWith >= ids.length) return ids;
  const next = [...ids];
  const tmp = next[index]!;
  next[index] = next[swapWith]!;
  next[swapWith] = tmp;
  return next;
}

describe("photo reorder", () => {
  it("moves photo up", () => {
    expect(swapOrders(["a", "b", "c"], "b", "up")).toEqual(["b", "a", "c"]);
  });

  it("moves photo down", () => {
    expect(swapOrders(["a", "b", "c"], "a", "down")).toEqual(["b", "a", "c"]);
  });

  it("no-ops at edges", () => {
    expect(swapOrders(["a", "b"], "a", "up")).toEqual(["a", "b"]);
    expect(swapOrders(["a", "b"], "b", "down")).toEqual(["a", "b"]);
  });
});
