import { assertEquals } from "jsr:@std/assert";
import { day11part1 } from "./day11part1.ts";
import { day11part2 } from "./day11part2.ts";
import { day11part2a } from "./day11part2a.ts";
import { day11part2b } from "./day11part2b.ts";

Deno.test("Day 11 part 1 TOO-LONG", () => {
  assertEquals(day11part1(), 182081);
});

Deno.test.ignore("Day 11 part 2", () => {
  assertEquals(day11part2(), 0);
});

Deno.test.ignore("Day 11 part 2a", () => {
  assertEquals(day11part2a(), 0);
});

Deno.test.ignore("Day 11 part 2b", () => {
  assertEquals(day11part2b(), 0);
});
