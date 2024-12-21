import { Dijkstra, NodeVertex, Vertex } from "../18/dijkstra-algorithm.ts";

export function day20part1(): number {
  const inputRaw: string = Deno.readTextFileSync(
    "./day/20/input/input.txt",
  );

  const graphMatrix: GraphNodePosition[][] = [];
  let startNode: GraphNodePosition | null = null;
  let endNode: GraphNodePosition | null = null;
  const walls: GraphNodePosition[] = [];
  const paths: GraphNodePosition[] = [];

  const lineSplit: string[] = inputRaw.split("\n");
  for (let i = 0; i < lineSplit.length; i++) {
    const line: string = lineSplit[i];
    if (line === "") {
      continue;
    }

    graphMatrix[i] = [];

    for (let j = 0; j < line.length; j++) {
      const graphNodePosition = new GraphNodePosition(line[j], j, i);
      graphMatrix[i].push(graphNodePosition);

      if (line[j] === "S") {
        startNode = graphNodePosition;
      } else if (line[j] === "E") {
        endNode = graphNodePosition;
      } else if (
        line[j] === "#" && i !== 0 && i !== lineSplit.length - 1 && j !== 0 &&
        j !== line.length - 1
      ) {
        walls.push(graphNodePosition);
      } else if (line[j] === ".") {
        paths.push(graphNodePosition);
      }
    }
  }

  //console.log(matrixToString(graphMatrix));

  const dijResultMaxPath: { path: string[]; score: number } = computeDijkstra(
    graphMatrix,
    startNode as GraphNodePosition,
    endNode as GraphNodePosition,
  );

  //console.log(dijResultMaxPath);
  console.log(`Max path: ${dijResultMaxPath.score}`);

  // Only keep walls that are adjacent to the path
  const wallsAdjacentToPath: GraphNodePosition[] = walls.filter((wall) =>
    paths.some((path) =>
      (path.x === wall.x && (path.y === wall.y - 1 || path.y === wall.y + 1)) ||
      (path.y === wall.y && (path.x === wall.x - 1 || path.x === wall.x + 1))
    )
  );

  let cheats = 0;

  const doubleWallsCache: string[] = [];

  console.log(`Walls adjacent to path: ${wallsAdjacentToPath.length}`);
  let i = 0;

  for (const wall of wallsAdjacentToPath) {
    i++;
    console.log(`Wall ${i}/${wallsAdjacentToPath.length} ; Cheats: ${cheats}`);

    let atLeastOneDeactivated = false;

    // Deactivate wall and the one on the left
    if (wallsAdjacentToPath.some((w) => w.x === wall.x - 1 && w.y === wall.y)) {
      const cacheKey: string = [
        `(${wall.x}, ${wall.y})`,
        `(${wall.x - 1}, ${wall.y})`,
      ].sort().join(
        ",",
      );

      if (!doubleWallsCache.includes(cacheKey)) {
        atLeastOneDeactivated = true;
        doubleWallsCache.push(cacheKey);

        const newMatrix: GraphNodePosition[][] = cloneGraphMatrix(graphMatrix);
        newMatrix[wall.y][wall.x].element = ".";
        newMatrix[wall.y][wall.x - 1].element = ".";

        const dijResultMaxPathCheat: { path: string[]; score: number } =
          computeDijkstra(
            newMatrix,
            startNode as GraphNodePosition,
            endNode as GraphNodePosition,
          );

        if (dijResultMaxPathCheat.score < dijResultMaxPath.score) {
          /*console.log(
            `Cheated by deactivating wall and the one on the left: (${wall.x}, ${wall.y}) and (${
              wall.x - 1
            }, ${wall.y})`,
            );*/
          cheats++;
        }
      }
    }

    // Deactivate wall and the one on the right
    if (wallsAdjacentToPath.some((w) => w.x === wall.x + 1 && w.y === wall.y)) {
      const cacheKey: string = [
        `(${wall.x}, ${wall.y})`,
        `(${wall.x + 1}, ${wall.y})`,
      ].sort().join(
        ",",
      );

      if (!doubleWallsCache.includes(cacheKey)) {
        atLeastOneDeactivated = true;
        doubleWallsCache.push(cacheKey);

        const newMatrix: GraphNodePosition[][] = cloneGraphMatrix(graphMatrix);
        newMatrix[wall.y][wall.x].element = ".";
        newMatrix[wall.y][wall.x + 1].element = ".";

        const dijResultMaxPathCheat: { path: string[]; score: number } =
          computeDijkstra(
            newMatrix,
            startNode as GraphNodePosition,
            endNode as GraphNodePosition,
          );

        if (dijResultMaxPathCheat.score < dijResultMaxPath.score) {
          /*console.log(
            `Cheated by deactivating wall and the one on the right: (${wall.x}, ${wall.y}) and (${
              wall.x + 1
            }, ${wall.y})`,
            );*/
          cheats++;
        }
      }
    }

    // Deactivate wall and the one on the top
    if (wallsAdjacentToPath.some((w) => w.x === wall.x && w.y === wall.y - 1)) {
      const cacheKey: string = [
        `(${wall.x}, ${wall.y})`,
        `(${wall.x}, ${wall.y - 1})`,
      ].sort().join(
        ",",
      );

      if (!doubleWallsCache.includes(cacheKey)) {
        atLeastOneDeactivated = true;
        doubleWallsCache.push(cacheKey);

        const newMatrix: GraphNodePosition[][] = cloneGraphMatrix(graphMatrix);
        newMatrix[wall.y][wall.x].element = ".";
        newMatrix[wall.y - 1][wall.x].element = ".";

        const dijResultMaxPathCheat: { path: string[]; score: number } =
          computeDijkstra(
            newMatrix,
            startNode as GraphNodePosition,
            endNode as GraphNodePosition,
          );

        if (dijResultMaxPathCheat.score < dijResultMaxPath.score) {
          /*console.log(
            `Cheated by deactivating wall and the one on the top: (${wall.x}, ${wall.y}) and (${wall.x}, ${
              wall.y - 1
            })`,
          );*/
          cheats++;
        }
      }
    }

    // Deactivate wall and the one on the bottom
    if (wallsAdjacentToPath.some((w) => w.x === wall.x && w.y === wall.y + 1)) {
      const cacheKey: string = [
        `(${wall.x}, ${wall.y})`,
        `(${wall.x}, ${wall.y + 1})`,
      ].sort().join(
        ",",
      );

      if (!doubleWallsCache.includes(cacheKey)) {
        atLeastOneDeactivated = true;
        doubleWallsCache.push(cacheKey);

        const newMatrix: GraphNodePosition[][] = cloneGraphMatrix(graphMatrix);
        newMatrix[wall.y][wall.x].element = ".";
        newMatrix[wall.y + 1][wall.x].element = ".";

        const dijResultMaxPathCheat: { path: string[]; score: number } =
          computeDijkstra(
            newMatrix,
            startNode as GraphNodePosition,
            endNode as GraphNodePosition,
          );

        if (dijResultMaxPathCheat.score < dijResultMaxPath.score) {
          /*console.log(
            `Cheated by deactivating wall and the one on the bottom: (${wall.x}, ${wall.y}) and (${wall.x}, ${
              wall.y + 1
            })`,
            );*/
          cheats++;
        }
      }
    }

    if (!atLeastOneDeactivated) {
      if (
        doubleWallsCache.some((cache) =>
          cache.includes(`(${wall.x}, ${wall.y})`)
        )
      ) {
        continue;
      }

      const newMatrix: GraphNodePosition[][] = cloneGraphMatrix(graphMatrix);
      newMatrix[wall.y][wall.x].element = ".";

      const dijResultMaxPathCheat: { path: string[]; score: number } =
        computeDijkstra(
          newMatrix,
          startNode as GraphNodePosition,
          endNode as GraphNodePosition,
        );

      if (dijResultMaxPathCheat.score < dijResultMaxPath.score) {
        /*console.log(doubleWallsCache);
        console.log(
          `Cheated by deactivating wall: (${wall.x}, ${wall.y})`,
          );*/
        cheats++;
      }
    }
  }

  return cheats;
}

function cloneGraphMatrix(
  graphMatrix: GraphNodePosition[][],
): GraphNodePosition[][] {
  const clone: GraphNodePosition[][] = [];

  for (let i = 0; i < graphMatrix.length; i++) {
    clone[i] = [];

    for (let j = 0; j < graphMatrix[i].length; j++) {
      clone[i][j] = new GraphNodePosition(
        graphMatrix[i][j].element,
        graphMatrix[i][j].x,
        graphMatrix[i][j].y,
      );
    }
  }

  return clone;
}

class GraphNodePosition {
  constructor(public element: string, public x: number, public y: number) {}

  toString(): string {
    return `${this.x},${this.y}`;
  }
}

/*function matrixToString(graphMatrix: GraphNodePosition[][]): string {
  let result = "";

  for (let i = 0; i < graphMatrix.length; i++) {
    for (let j = 0; j < graphMatrix[i].length; j++) {
      result += graphMatrix[i][j].element;
    }

    result += "\n";
  }

  return result;
}*/

function computeDijkstra(
  graphMatrix: GraphNodePosition[][],
  startNode: GraphNodePosition,
  endNode: GraphNodePosition,
): { path: string[]; score: number } {
  const dijkstra = new Dijkstra();
  for (let i = 0; i < graphMatrix.length; i++) {
    for (let j = 0; j < graphMatrix[0].length; j++) {
      const node: GraphNodePosition = graphMatrix[j][i];

      if (node.element === "#") {
        continue;
      }

      // Get neighbors
      const neighbors: GraphNodePosition[] = [];
      if (i > 0) {
        neighbors.push(graphMatrix[j][i - 1]);
      }
      if (i < graphMatrix[0].length - 1) {
        neighbors.push(graphMatrix[j][i + 1]);
      }
      if (j > 0) {
        neighbors.push(graphMatrix[j - 1][i]);
      }
      if (j < graphMatrix.length - 1) {
        neighbors.push(graphMatrix[j + 1][i]);
      }

      dijkstra.addVertex(
        new Vertex(
          node.toString(),
          neighbors.filter((neighbor) => neighbor.element !== "#").map((
            neighbor,
          ) =>
            new NodeVertex(
              neighbor.toString(),
              neighbor.element === "#" ? Number.MAX_SAFE_INTEGER : 1,
            )
          ),
          1,
        ),
      );
    }
  }

  const result: string[] = dijkstra.findShortestWay(
    startNode.toString(),
    endNode.toString(),
  );

  return {
    path: result.splice(0, result.length - 1),
    score: Number.parseInt(result[result.length - 1]),
  };
}
