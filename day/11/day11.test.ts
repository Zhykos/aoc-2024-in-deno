import { assertEquals } from "jsr:@std/assert";
import { day11part1 } from "./day11part1.ts";
import { day11part2a } from "./day11part2a.ts";

Deno.test("Day 11 part 1", () => {
  assertEquals(day11part1(), 182081);
});

Deno.test("Day 11 part 2a", () => {
  assertEquals(day11part2a(), 0);
});
