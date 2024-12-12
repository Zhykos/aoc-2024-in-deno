export function day11part2a(): number {
  const inputRaw: string = Deno.readTextFileSync(
    "./day/11/input/input.txt",
  );

  const line: string = inputRaw.split("\n")[0];

  let stones = 0;

  for (const x of line.trim().split(" ")) {
    const value = Number.parseInt(x.trim());
    stones += blink(value, 1);
  }

  return stones;
}

function blink(value: number, iteration: number): number {
  if (iteration >= 75) {
    if (value === 0 || value.toString().length % 2 === 1) {
      return 1;
    }
    return 2;
  }

  if (value === 0) {
    return blink(1, iteration + 1);
  }

  if (value.toString().length % 2 === 0) {
    const valueStr: string = value.toString();
    const length = valueStr.length;
    return blink(
      Number.parseInt(valueStr.substring(0, length / 2)),
      iteration + 1,
    ) +
      blink(
        Number.parseInt(valueStr.substring(length / 2, length)),
        iteration + 1,
      );
  }

  return blink(value * 2024, iteration + 1);
}
