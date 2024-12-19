# aoc-2024-in-deno

My 2024 Advent of Code made with Deno: https://adventofcode.com/2024.

My results:

⭐️⭐️ ; ⭐️⭐️ ; ⭐️⭐️ ; ⭐️⭐️ ; ⭐️⭐️ ; ⭐️⭐️ ; ⭐️⭐️ ; ⭐️⭐️ ; ⭐️⭐️ ; ⭐️⭐️ (1st december to 10th)

⭐️🚫 ; ⭐️⭐️ ; ⭐️⭐️ ; ⭐️⭐️ ; ⭐️⭐️ ; 🚫🚫 ; ⭐️🚫 ; ⭐️⭐️ ; ⭐️❓ ; ❓❓ (11th december to 20th)

❓❓ ; ❓❓ ; ❓❓ ; ❓❓ ; ❓❓ (21st december to 25th)

Meaning (each problem is divided into two parts):
* **15** days done with 2 golden stars (both parts done): show with ⭐️⭐️
* **3** days done with only 1 golden star: show with one ⭐️
* **1** day done with no golden star: show with 🚫
* If 🚫 is shown, it means that I didn't succeed to solve the problem
* If ❓ is shown, it means that I didn't try to solve the problem yet

So, I have 33 golden stars ⭐️ out of 50.

Made with Deno: https://deno.com/.

Deno contest for Advent of Code: https://deno.com/blog/advent-of-code-2024.

Launch a specific test, for instance: `deno test --allow-read --allow-write --filter "Day 6 part 1"`.

Some tests are ignored because they are too slow.
You can run all of them with `deno task test`, but it will not run the slow ones.

To run all tests, even the slow ones, use `deno task test-even-long`.
The ones that are ignored are not resolved yet or don't have a solution.

All my solutions are checked with test units.

Clues for not resolved problems:
* Day 11 part 2: I have to find a way to optimize the algorithm, it's too slow.
* Day 16 part 1: I need to implement Dijkstra's algorithm to solve the problem.
* Day 17 part 2: I need to reverse compute all operations to find the initial value.
