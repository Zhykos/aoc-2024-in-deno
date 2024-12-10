export function day10part2(): number {
  const inputRaw: string = Deno.readTextFileSync(
    "./day/10/input/input.txt",
  );

  const heightMapMatrix: HeightMap[][] = [];

  const lines: string[] = inputRaw.split("\n");

  for (let line = 0; line < lines.length; line++) {
    const lineString: string = lines[line];
    if (lineString === "") {
      continue;
    }

    const heightMapLine: HeightMap[] = [];
    heightMapMatrix.push(heightMapLine);

    for (let i = 0; i < lineString.length; i++) {
      const heightMap = new HeightMap(Number.parseInt(lineString[i]), i, line);
      heightMapLine.push(heightMap);
    }
  }

  const map = new TopographicMap(heightMapMatrix);
  return map.searchAllTrails();
}

class TopographicMap {
  constructor(public heightMapMatrix: HeightMap[][]) {}

  searchAllTrails(): number {
    let score = 0;

    for (let i = 0; i < this.heightMapMatrix.length; i++) {
      for (let j = 0; j < this.heightMapMatrix[i].length; j++) {
        if (this.heightMapMatrix[i][j].height === 0) {
          const finalVisitedHeights: HeightMap[] = TopographicMap.searchTrail(
            i,
            j,
            0,
            this.clone(),
          );

          score += finalVisitedHeights.length;
        }
      }
    }

    return score;
  }

  static searchTrail(
    i: number,
    j: number,
    currentHeight: number,
    map: TopographicMap,
  ): HeightMap[] {
    if (
      i < 0 ||
      i >= map.heightMapMatrix.length ||
      j < 0 ||
      j >= map.heightMapMatrix[i].length ||
      map.heightMapMatrix[i][j].alreadyVisited ||
      map.heightMapMatrix[i][j].height !== currentHeight
    ) {
      return [];
    }

    map.heightMapMatrix[i][j].alreadyVisited = true;

    if (currentHeight === 9) {
      return [map.heightMapMatrix[i][j]];
    }

    return [
      ...TopographicMap.searchTrail(i - 1, j, currentHeight + 1, map.clone()),
      ...TopographicMap.searchTrail(i + 1, j, currentHeight + 1, map.clone()),
      ...TopographicMap.searchTrail(i, j - 1, currentHeight + 1, map.clone()),
      ...TopographicMap.searchTrail(i, j + 1, currentHeight + 1, map.clone()),
    ];
  }

  clone(): TopographicMap {
    const heightMapMatrixClone: HeightMap[][] = [];

    for (const heightMapLine of this.heightMapMatrix) {
      const heightMapLineClone: HeightMap[] = [];
      heightMapMatrixClone.push(heightMapLineClone);

      for (const heightMap of heightMapLine) {
        heightMapLineClone.push(
          new HeightMap(heightMap.height, heightMap.x, heightMap.y),
        );
      }
    }

    return new TopographicMap(heightMapMatrixClone);
  }
}

class HeightMap {
  alreadyVisited = false;

  constructor(public height: number, public x: number, public y: number) {}
}
