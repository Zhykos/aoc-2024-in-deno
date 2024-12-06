export function day3part2(): number {
  const inputRaw: string = Deno.readTextFileSync("./day/3/input/input.txt");

  let memory = 0;

  for (
    const regexArray of inputRaw.matchAll(/mul\((\d+?),(\d+?)\)/g)
  ) {
    if (regexArray) {
      const doIndex: number = inputRaw.lastIndexOf("do()", regexArray.index);
      const dontIndex: number = inputRaw.lastIndexOf(
        "don't()",
        regexArray.index,
      );

      if (doIndex >= dontIndex) {
        const a: number = Number.parseInt(regexArray[1]);
        const b: number = Number.parseInt(regexArray[2]);
        memory += a * b;
      }
    }
  }

  return memory;
}
