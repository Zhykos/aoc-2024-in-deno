export function day11part2b(): number {
  const inputRaw: string = Deno.readTextFileSync(
    "./day/11/input/input.txt",
  );

  const line: string = inputRaw.split("\n")[0];

  let stones = 0;

  for (const x of line.trim().split(" ")) {
    const value = Number.parseInt(x.trim());
    console.log(`Value: ${value} / ${x}`);
    const newStones: number = blink(value, 1);
    console.log(`Value: ${value} / ${x} -> ${newStones}`);
    stones += newStones;
  }

  return stones;
}

const cache = new Map<number, number>();

function blink(value: number, iteration: number): number {
  if (cache.has(value)) {
    return cache.get(value) as number;
  }

  if (iteration >= 75) {
    console.log(`Iteration limit reached: ${value}`);
    if (value === 0 || value.toString().length % 2 === 1) {
      return 1;
    }
    return 2;
  }

  if (value === 0) {
    const result: number = blink(1, iteration + 1);
    cache.set(value, result);
    return result;
  }

  if (value.toString().length % 2 === 0) {
    const valueStr: string = value.toString();
    const length: number = valueStr.length;

    const value1: number = Number.parseInt(valueStr.substring(0, length / 2));
    const result1: number = blink(value1, iteration + 1);
    cache.set(value1, result1);

    const value2: number = Number.parseInt(
      valueStr.substring(length / 2, length),
    );
    const result2: number = blink(value2, iteration + 1);
    cache.set(value2, result2);

    return result1 + result2;
  }

  const result: number = blink(value * 2024, iteration + 1);
  cache.set(value, result);
  return result;
}
