const inputRaw: string = Deno.readTextFileSync("./day/3/input/input.txt");

let memory = 0;

for (const line of inputRaw.split("\n")) {
  if (line.length === 0) {
    continue;
  }

  for (
    const regexArray of line.matchAll(
      /mul\s*?\(\s*?(\d+?)\s*?,\s*?(\d+?)\s*?\)/g,
    )
  ) {
    if (regexArray) {
      const a: number = Number.parseInt(regexArray[1]);
      const b: number = Number.parseInt(regexArray[2]);
      memory += a * b;
    }
  }
}

console.log(`Memory: ${memory}`);
