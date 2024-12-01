const inputRaw: string = Deno.readTextFileSync("./day/1/input/input.txt");

const columnLeft: number[] = [];
const columnRight: number[] = [];

for (const line of inputRaw.split("\n")) {
  const lineSplit: string[] = line.split(/ +/);
  if (lineSplit.length !== 2) {
    continue;
  }

  columnLeft.push(Number.parseInt(lineSplit[0]));
  columnRight.push(Number.parseInt(lineSplit[1]));
}

columnLeft.sort();
columnRight.sort();

let distance = 0;

for (let i = 0; i < columnLeft.length; i++) {
  distance += Math.abs(columnRight[i] - columnLeft[i]);
}

console.log(`Distance: ${distance}`);
