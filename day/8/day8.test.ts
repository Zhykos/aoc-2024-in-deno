import { assertEquals } from "jsr:@std/assert";
import { day8part1 } from "./day8part1.ts";
import { day8part2 } from "./day8part2.ts";

Deno.test("Day 8 part 1", () => {
  assertEquals(day8part1(), 269);
});

Deno.test("Day 8 part 2", () => {
  assertEquals(day8part2(), 0);
});
