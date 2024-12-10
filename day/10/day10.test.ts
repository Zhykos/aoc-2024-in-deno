import { assertEquals } from "jsr:@std/assert";
import { day10part1 } from "./day10part1.ts";
import { day10part2 } from "./day10part2.ts";

Deno.test("Day 10 part 1", () => {
  assertEquals(day10part1(), 512);
});

Deno.test("Day 10 part 2", () => {
  assertEquals(day10part2(), 1045);
});
