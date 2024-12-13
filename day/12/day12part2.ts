export function day12part2(): number {
  const inputRaw: string = Deno.readTextFileSync(
    "./day/12/input/mini1-input.txt",
  );

  const garden: FlowerPot[][] = [];

  const lineSplit: string[] = inputRaw.split("\n");
  for (let i = 0; i < lineSplit.length; i++) {
    const line: string = lineSplit[i];
    if (line === "") {
      continue;
    }

    garden[i] = [];

    for (let j = 0; j < line.length; j++) {
      const flowerPot = new FlowerPot(line[j], i, j);
      garden[i][j] = flowerPot;
    }
  }

  const regions: FlowerPot[][] = computeRegions(garden);
  const scores = computeAreasAndSides(
    regions,
    garden.length,
    garden[0].length,
  );
  return scores.reduce((acc, curr) => acc + curr, 0);
}

function computeRegions(garden: FlowerPot[][]): FlowerPot[][] {
  const regions: FlowerPot[][] = [];

  const visited: boolean[][] = Array.from(
    { length: garden.length },
    () => Array(garden[0].length).fill(false),
  );

  function deepFirstSearch(
    i: number,
    j: number,
    flower: string,
    region: FlowerPot[],
  ) {
    if (
      i < 0 ||
      i >= garden.length ||
      j < 0 ||
      j >= garden[0].length ||
      visited[i][j] ||
      garden[i][j].flower !== flower
    ) {
      return;
    }

    visited[i][j] = true;
    region.push(garden[i][j]);

    deepFirstSearch(i - 1, j, flower, region);
    deepFirstSearch(i + 1, j, flower, region);
    deepFirstSearch(i, j - 1, flower, region);
    deepFirstSearch(i, j + 1, flower, region);
  }

  for (let i = 0; i < garden.length; i++) {
    for (let j = 0; j < garden[i].length; j++) {
      if (!visited[i][j]) {
        const region: FlowerPot[] = [];
        deepFirstSearch(i, j, garden[i][j].flower, region);
        if (region.length > 0) {
          regions.push(region);
        }
      }
    }
  }

  return regions;
}

function computeAreasAndSides(
  regions: FlowerPot[][],
  lines: number,
  columns: number,
): number[] {
  return regions.map((region) =>
    computeSides(region, lines, columns) * region.length
  );
}

function computeSides(
  region: FlowerPot[],
  lines: number,
  columns: number,
): number {
  let sides = 0;

  for (const flowerPot of region) {
    const i = flowerPot.line;
    const j = flowerPot.column;

    // if upper left corner is connected to another flower pot
    if (
      !region.find((flowerPot) =>
        flowerPot.line === i - 1 && flowerPot.column === j &&
        flowerPot.line === i && flowerPot.column === j - 1
      )
    ) {
      sides += 2;
    }

    // if upper right corner is connected to another flower pot
    if (
      !region.find((flowerPot) =>
        flowerPot.line === i - 1 && flowerPot.column === j &&
        flowerPot.line === i && flowerPot.column === j + 1
      )
    ) {
      sides += 2;
    }

    // if lower left corner is connected to another flower pot
    if (
      !region.find((flowerPot) =>
        flowerPot.line === i + 1 && flowerPot.column === j &&
        flowerPot.line === i && flowerPot.column === j - 1
      )
    ) {
      sides += 2;
    }

    // if lower right corner is connected to another flower pot
    if (
      !region.find((flowerPot) =>
        flowerPot.line === i + 1 && flowerPot.column === j &&
        flowerPot.line === i && flowerPot.column === j + 1
      )
    ) {
      sides += 2;
    }
  }
  console.log("sides", sides, region);

  return sides;
}

class FlowerPot {
  constructor(
    public flower: string,
    public line: number,
    public column: number,
  ) {}
}
