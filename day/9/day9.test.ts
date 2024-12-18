import { assertEquals } from "jsr:@std/assert";
import { day9part1 } from "./day9part1.ts";
import { day9part2 } from "./day9part2.ts";

Deno.test("Day 9 part 1 TOO-LONG", () => {
  assertEquals(day9part1(), 6262891638328);
});

Deno.test("Day 9 part 2 TOO-LONG", () => {
  assertEquals(day9part2(), 6287317016845);
});
