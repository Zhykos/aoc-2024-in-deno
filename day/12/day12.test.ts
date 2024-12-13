import { assertEquals } from "jsr:@std/assert";
import { day12part1 } from "./day12part1.ts";
import { day12part2 } from "./day12part2.ts";

Deno.test("Day 12 part 1", () => {
  assertEquals(day12part1(), 1363682);
});

Deno.test.ignore("Day 12 part 2", () => {
  assertEquals(day12part2(), 80);
});
