import { assertEquals } from "jsr:@std/assert";
import { day3part1 } from "./day3part1.ts";
import { day3part2 } from "./day3part2.ts";

Deno.test("Day 3 part 1", () => {
  assertEquals(day3part1(), 170778545);
});

Deno.test("Day 3 part 2", () => {
  assertEquals(day3part2(), 82868252);
});
