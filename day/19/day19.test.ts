import { assertEquals } from "jsr:@std/assert";
import { day19part1 } from "./day19part1.ts";
import { day19part2 } from "./day19part2.ts";

Deno.test("Day 19 part 1", () => {
  assertEquals(day19part1(), 6);
});

Deno.test("Day 19 part 2", () => {
  assertEquals(day19part2(), 0);
});
