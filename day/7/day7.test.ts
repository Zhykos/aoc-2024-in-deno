import { assertEquals } from "jsr:@std/assert";
import { day7part1 } from "./day7part1.ts";
import { day7part2 } from "./day7part2.ts";

Deno.test("Day 7 part 1", () => {
  assertEquals(day7part1(), 2437272016585);
});

Deno.test.ignore("Day 7 part 2", () => {
  assertEquals(day7part2(), 0);
});
