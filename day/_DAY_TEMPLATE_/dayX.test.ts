import { assertEquals } from "jsr:@std/assert";
import { dayXpart1 } from "./dayXpart1.ts";
import { dayXpart2 } from "./dayXpart2.ts";

Deno.test("Day X part 1", () => {
  assertEquals(dayXpart1(), 0);
});

Deno.test.ignore("Day X part 2", () => {
  assertEquals(dayXpart2(), 0);
});
