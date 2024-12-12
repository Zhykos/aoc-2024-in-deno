export function day11part2(): number {
  const inputRaw: string = Deno.readTextFileSync(
    "./day/11/input/input.txt",
  );

  const line: string = inputRaw.split("\n")[0];
  const stones: Stone[] = line.trim().split(" ").map((x) =>
    new Stone(Number.parseInt(x.trim()))
  );

  for (let i = 0; i < 75; i++) {
    for (let j = 0; j < stones.length; j++) {
      if (stones[j].value === 0) {
        stones[j].value = 1;
      } else if (stones[j].value.toString().length % 2 === 0) {
        const valueStr: string = stones[j].value.toString();
        const length = valueStr.length;
        const stone1 = new Stone(
          Number.parseInt(valueStr.substring(0, length / 2)),
        );
        const stone2 = new Stone(
          Number.parseInt(valueStr.substring(length / 2, length)),
        );
        stones[j] = stone1;
        stones.splice(j + 1, 0, stone2);
        j++;
      } else {
        stones[j].value = stones[j].value * 2024;
      }
    }
  }

  return stones.length;
}

class Stone {
  constructor(public value: number) {}
}
