import { assertEquals } from "jsr:@std/assert";
import { day4part1 } from "./day4part1.ts";
import { day4part2 } from "./day4part2.ts";

Deno.test("Day 4 part 1", () => {
  assertEquals(day4part1(), 2662);
});

Deno.test("Day 4 part 2", () => {
  assertEquals(day4part2(), 2034);
});
