import { assertEquals } from "jsr:@std/assert";
import { day15part1 } from "./day15part1.ts";
import { day15part2 } from "./day15part2.ts";

Deno.test("Day 15 part 1", () => {
  assertEquals(day15part1(), 1514353);
});

Deno.test("Day 15 part 2", () => {
  assertEquals(day15part2(), 1533076);
});
