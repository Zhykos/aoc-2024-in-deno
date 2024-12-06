import { assertEquals } from "jsr:@std/assert";
import { day1part1 } from "./day1part1.ts";
import { day1part2 } from "./day1part2.ts";

Deno.test("Day 1 part 1", () => {
  assertEquals(day1part1(), 2113135);
});

Deno.test("Day 1 part 2", () => {
  assertEquals(day1part2(), 19097157);
});
