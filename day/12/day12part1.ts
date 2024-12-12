export function day12part1(): number {
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

  const regions: Map<string, FlowerPot[]> = computeRegions(garden);
  const scores = computeAreasAndPerimeters(
    regions,
    garden.length,
    garden[0].length,
  );
  return scores.reduce((acc, curr) => acc + curr, 0);
}

function computeRegions(garden: FlowerPot[][]): Map<string, FlowerPot[]> {
  const regions = new Map<string, FlowerPot[]>();

  for (let i = 0; i < garden.length; i++) {
    for (let j = 0; j < garden[i].length; j++) {
      const flowerPot: FlowerPot = garden[i][j];
      const flower: string = flowerPot.flower;
      regions.has(flower)
        ? regions.get(flower)?.push(flowerPot)
        : regions.set(flower, [flowerPot]);
    }
  }

  return regions;
}

function computeAreasAndPerimeters(
  regions: Map<string, FlowerPot[]>,
  lines: number,
  columns: number,
): number[] {
  return regions.values().toArray().map((region) =>
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

  console.log(perimeter, region);

  return perimeter;
}

class FlowerPot {
  isAlreadyInArea = false;

  constructor(
    public flower: string,
    public line: number,
    public column: number,
  ) {}
}
