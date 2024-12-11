import { assertEquals } from "jsr:@std/assert";
import { day11part1 } from "./day11part1.ts";
import { day11part2 } from "./day11part2.ts";

Deno.test("Day 11 part 1", () => {
  assertEquals(day11part1(), 182081);
});

Deno.test("Day 11 part 2", () => {
  assertEquals(day11part2(), 0);
});
