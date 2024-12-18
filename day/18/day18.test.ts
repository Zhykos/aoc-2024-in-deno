import { assertEquals } from "jsr:@std/assert";
import { day18part1 } from "./day18part1.ts";
import { day18part2 } from "./day18part2.ts";

Deno.test("Day 18 part 1", () => {
  assertEquals(day18part1(), 320);
});

Deno.test("Day 18 part 2", () => {
  assertEquals(day18part2(), 0);
});
