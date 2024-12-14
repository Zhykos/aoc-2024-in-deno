import { assertEquals } from "jsr:@std/assert";
import { day14part1 } from "./day14part1.ts";
import { day14part2 } from "./day14part2.ts";

Deno.test("Day 14 part 1", () => {
  assertEquals(day14part1(), 211692000);
});

Deno.test("Day 14 part 2 TOO LONG", () => {
  assertEquals(day14part2(), 6587);
});
