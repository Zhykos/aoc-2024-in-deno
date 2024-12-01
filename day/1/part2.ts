const inputRaw: string = Deno.readTextFileSync("./day/1/input/input.txt");

const columnLeft: number[] = [];
const columnRight = new Map<number, number>();

for (const line of inputRaw.split("\n")) {
  const lineSplit: string[] = line.split(/ +/);
  if (lineSplit.length !== 2) {
    continue;
  }

  columnLeft.push(Number.parseInt(lineSplit[0]));

  const rightKey = Number.parseInt(lineSplit[1]);
  const nbSimilarity: number | undefined = columnRight.get(rightKey);
  if (nbSimilarity) {
    columnRight.set(rightKey, nbSimilarity + 1);
  } else {
    columnRight.set(rightKey, 1);
  }
}

let similarity = 0;

for (let i = 0; i < columnLeft.length; i++) {
  similarity += columnLeft[i] * (columnRight.get(columnLeft[i]) || 0);
}

console.log(`Similarity: ${similarity}`);
