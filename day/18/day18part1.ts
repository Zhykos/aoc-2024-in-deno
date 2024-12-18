import { GraphNode, type InnerObject } from "./dijkstra.ts";
import { Dijkstra, NodeVertex, Vertex } from "./dijkstra-algorithm.ts";

export function day18part1(): number {
  const inputRaw: string = Deno.readTextFileSync(
    "./day/18/input/input.txt",
  );

  const limit = 1024;
  const width = 71;
  const height = width;

  const corruptedMemories: Position[] = [];

  for (const line of inputRaw.split("\n")) {
    if (line === "") {
      continue;
    }

    const split: string[] = line.split(",");
    const x = Number.parseInt(split[0]);
    const y = Number.parseInt(split[1]);
    corruptedMemories.push(new Position(x, y));

    if (corruptedMemories.length === limit) {
      break;
    }
  }

  const graphMatrix: (GraphNode<Position> | null)[][] = [];

  for (let i = 0; i < width; i++) {
    graphMatrix[i] = [];

    for (let j = 0; j < height; j++) {
      if (
        corruptedMemories.some((x) => x.x === j && x.y === i)
      ) {
        graphMatrix[i].push(null);
      } else {
        const position = new Position(i, j);
        graphMatrix[i].push(new GraphNode<Position>(position));
      }
    }
  }

  //console.log(corruptedMemories);
  //console.log(matrixToString(graphMatrix));

  // Connect nodes with its direct neighbors
  for (let i = 0; i < width; i++) {
    for (let j = 0; j < height; j++) {
      if (graphMatrix[j][i] === null) {
        continue;
      }

      const node = graphMatrix[j][i] as GraphNode<Position>;

      if (i > 0 && graphMatrix[j][i - 1] !== null) {
        node.neighbors.push(graphMatrix[j][i - 1] as GraphNode<Position>);
      }

      if (i < width - 1 && graphMatrix[j][i + 1] !== null) {
        node.neighbors.push(graphMatrix[j][i + 1] as GraphNode<Position>);
      }

      if (j > 0 && graphMatrix[j - 1][i] !== null) {
        node.neighbors.push(graphMatrix[j - 1][i] as GraphNode<Position>);
      }

      if (j < height - 1 && graphMatrix[j + 1][i] !== null) {
        node.neighbors.push(graphMatrix[j + 1][i] as GraphNode<Position>);
      }
    }
  }

  const dijkstra = new Dijkstra();
  for (let i = 0; i < height; i++) {
    for (let j = 0; j < width; j++) {
      if (graphMatrix[j][i] === null) {
        continue;
      }

      const node = graphMatrix[j][i] as GraphNode<Position>;

      dijkstra.addVertex(
        new Vertex(
          node.innerObject.toString(),
          node.neighbors.map((neighbor) =>
            new NodeVertex(neighbor.innerObject.toString(), 1)
          ),
          1,
        ),
      );
    }
  }

  const result: string[] = dijkstra.findShortestWay(
    graphMatrix[0][0]?.innerObject.toString() as string,
    graphMatrix[height - 1][width - 1]?.innerObject.toString() as string,
  );

  return Number.parseInt(result[result.length - 1]);
}

/*function matrixToString(
  graphMatrix: (GraphNode<Position> | null)[][],
): string {
  let result = "";
  for (let i = 0; i < graphMatrix.length; i++) {
    for (let j = 0; j < graphMatrix[i].length; j++) {
      if (graphMatrix[j][i] === null) {
        result += "#";
      } else {
        result += ".";
      }
    }
    result += "\n";
  }

  return result;
}*/

class Position implements InnerObject {
  constructor(public x: number, public y: number) {}

  toString(): string {
    return `(${this.x}, ${this.y})`;
  }

  equals(other: Position): boolean {
    return this.x === other.x && this.y === other.y;
  }
}
