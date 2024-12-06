import { assertEquals } from "jsr:@std/assert";
import { day2part1 } from "./day2part1.ts";
import { day2part2 } from "./day2part2.ts";

Deno.test("Day 2 part 1", () => {
  assertEquals(day2part1(), 287);
});

Deno.test("Day 2 part 2", () => {
  assertEquals(day2part2(), 354);
});
