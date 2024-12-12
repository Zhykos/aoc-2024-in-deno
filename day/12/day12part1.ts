export function day12part1(): number {
  const inputRaw: string = Deno.readTextFileSync(
    "./day/12/input/input.txt",
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
  const scores = computeAreasAndPerimeters(
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

function computeAreasAndPerimeters(
  regions: FlowerPot[][],
  lines: number,
  columns: number,
): number[] {
  return regions.map((region) =>
    computePerimeter(region, lines, columns) * region.length
  );
}

function computePerimeter(
  region: FlowerPot[],
  lines: number,
  columns: number,
): number {
  let perimeter = 0;

  for (const flowerPot of region) {
    const i = flowerPot.line;
    const j = flowerPot.column;

    if (
      i === 0 ||
      !region.find((flowerPot) =>
        flowerPot.line === i - 1 && flowerPot.column === j
      )
    ) {
      perimeter++;
    }

    if (
      i + 1 > lines ||
      !region.find((flowerPot) =>
        flowerPot.line === i + 1 && flowerPot.column === j
      )
    ) {
      perimeter++;
    }

    if (
      j === 0 ||
      !region.find((flowerPot) =>
        flowerPot.column === j - 1 && flowerPot.line === i
      )
    ) {
      perimeter++;
    }

    if (
      j + 1 > columns ||
      !region.find((flowerPot) =>
        flowerPot.column === j + 1 && flowerPot.line === i
      )
    ) {
      perimeter++;
    }
  }

  return perimeter;
}

class FlowerPot {
  constructor(
    public flower: string,
    public line: number,
    public column: number,
  ) {}
}
