import { assertEquals } from "jsr:@std/assert";
import { day17part1 } from "./day17part1.ts";
import { day17part2 } from "./day17part2.ts";

Deno.test("Day 17 part 1", () => {
  assertEquals(day17part1(), "7,4,2,5,1,4,6,0,4");
});

Deno.test("Day 17 part 2", () => {
  assertEquals(day17part2(), 0);
});
