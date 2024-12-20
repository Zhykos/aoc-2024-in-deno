import { assertEquals } from "jsr:@std/assert";
import { day6part1 } from "./day6part1.ts";
import { day6part2 } from "./day6part2.ts";

Deno.test("Day 6 part 1", () => {
  assertEquals(day6part1(), 4758);
});

Deno.test("Day 6 part 2 TOO-LONG", () => {
  assertEquals(day6part2(), 1670);
});
