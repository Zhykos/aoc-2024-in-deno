import { assertEquals } from "jsr:@std/assert";
import { day5part1 } from "./day5part1.ts";
import { day5part2 } from "./day5part2.ts";

Deno.test("Day 5 part 1", () => {
  assertEquals(day5part1(), 5091);
});

Deno.test("Day 5 part 2", () => {
  assertEquals(day5part2(), 4681);
});
