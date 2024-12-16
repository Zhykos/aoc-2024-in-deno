export function day12part2(): number {
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
  const scores: number[] = computeAreasAndSides(regions);
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
): number[] {
  return regions.map((region) => computeSides(region) * region.length);
}

function computeSides(
  region: FlowerPot[],
): number {
  // A side is also a corner, so compute the number of sides by checking if the corner is connected to another flower pot

  const corners: number = computeNumberOfConcaveCorners(region) +
    computeNumberOfConvexCorners(region);
  //console.log(corners, region);
  return corners;
}

class FlowerPot {
  constructor(
    public flower: string,
    public line: number,
    public column: number,
  ) {}
}

function computeNumberOfConcaveCorners(pots: FlowerPot[]): number {
  let corners = 0;

  for (const flowerPot of pots) {
    const hasPotOnTop: boolean = pots.some(
      (pot) =>
        pot.line === flowerPot.line - 1 && pot.column === flowerPot.column,
    );

    const hasPotOnBottom: boolean = pots.some(
      (pot) =>
        pot.line === flowerPot.line + 1 && pot.column === flowerPot.column,
    );

    const hasPotOnLeft: boolean = pots.some(
      (pot) =>
        pot.line === flowerPot.line && pot.column === flowerPot.column - 1,
    );

    const hasPotOnRight: boolean = pots.some(
      (pot) =>
        pot.line === flowerPot.line && pot.column === flowerPot.column + 1,
    );

    if (!hasPotOnTop && !hasPotOnLeft) {
      corners++;
    }

    if (!hasPotOnTop && !hasPotOnRight) {
      corners++;
    }

    if (!hasPotOnBottom && !hasPotOnLeft) {
      corners++;
    }

    if (!hasPotOnBottom && !hasPotOnRight) {
      corners++;
    }
  }

  return corners;
}

function computeNumberOfConvexCorners(pots: FlowerPot[]): number {
  let corners = 0;

  for (const flowerPot of pots) {
    const hasPotOnTop: boolean = pots.some(
      (pot) =>
        pot.line === flowerPot.line - 1 && pot.column === flowerPot.column,
    );

    const hasPotOnBottom: boolean = pots.some(
      (pot) =>
        pot.line === flowerPot.line + 1 && pot.column === flowerPot.column,
    );

    const hasPotOnLeft: boolean = pots.some(
      (pot) =>
        pot.line === flowerPot.line && pot.column === flowerPot.column - 1,
    );

    const hasPotOnRight: boolean = pots.some(
      (pot) =>
        pot.line === flowerPot.line && pot.column === flowerPot.column + 1,
    );

    if (hasPotOnTop && hasPotOnLeft) {
      const hasPotOnTopLeft: boolean = pots.some(
        (pot) =>
          pot.line === flowerPot.line - 1 &&
          pot.column === flowerPot.column - 1,
      );

      if (!hasPotOnTopLeft) {
        corners++;
      }
    }

    if (hasPotOnTop && hasPotOnRight) {
      const hasPotOnTopRight: boolean = pots.some(
        (pot) =>
          pot.line === flowerPot.line - 1 &&
          pot.column === flowerPot.column + 1,
      );

      if (!hasPotOnTopRight) {
        corners++;
      }
    }

    if (hasPotOnBottom && hasPotOnLeft) {
      const hasPotOnBottomLeft: boolean = pots.some(
        (pot) =>
          pot.line === flowerPot.line + 1 &&
          pot.column === flowerPot.column - 1,
      );

      if (!hasPotOnBottomLeft) {
        corners++;
      }
    }

    if (hasPotOnBottom && hasPotOnRight) {
      const hasPotOnBottomRight: boolean = pots.some(
        (pot) =>
          pot.line === flowerPot.line + 1 &&
          pot.column === flowerPot.column + 1,
      );

      if (!hasPotOnBottomRight) {
        corners++;
      }
    }
  }

  return corners;
}
