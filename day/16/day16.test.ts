import { assertEquals } from "jsr:@std/assert";
import { day16part1 } from "./day16part1.ts";
import { day16part2 } from "./day16part2.ts";

Deno.test("Day 16 part 1", () => {
  assertEquals(day16part1(), 7036);
});

Deno.test("Day 16 part 2", () => {
  assertEquals(day16part2(), 0);
});
