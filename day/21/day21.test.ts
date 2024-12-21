import { assertEquals } from "jsr:@std/assert";
import { day21part1 } from "./day21part1.ts";
import { day21part2 } from "./day21part2.ts";

Deno.test("Day 21 part 1", () => {
  assertEquals(day21part1(), 126384);
});

Deno.test.ignore("Day 21 part 2", () => {
  assertEquals(day21part2(), 0);
});
