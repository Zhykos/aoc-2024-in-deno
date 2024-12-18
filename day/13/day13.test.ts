import { assertEquals } from "jsr:@std/assert";
import { day13part1 } from "./day13part1.ts";
import { day13part2 } from "./day13part2.ts";

Deno.test("Day 13 part 1", () => {
  assertEquals(day13part1(), 27105);
});

Deno.test("Day 13 part 2", () => {
  assertEquals(day13part2(), 101726882250942);
});
