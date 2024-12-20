import { Dijkstra, NodeVertex, Vertex } from "../18/dijkstra-algorithm.ts";

export function day20part1(): number {
  const inputRaw: string = Deno.readTextFileSync(
    "./day/20/input/input.txt",
  );

  const graphMatrix: GraphNodePosition[][] = [];
  let startNode: GraphNodePosition | null = null;
  let endNode: GraphNodePosition | null = null;

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
      }
    }
  }

  console.log(matrixToString(graphMatrix));

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
    startNode?.toString() as string,
    endNode?.toString() as string,
  );

  console.log(result);
  console.log(result[result.length - 1]);

  return 0;
}

class GraphNodePosition {
  constructor(public element: string, public x: number, public y: number) {}

  toString(): string {
    return `${this.x},${this.y}`;
  }
}

function matrixToString(graphMatrix: GraphNodePosition[][]): string {
  let result = "";

  for (let i = 0; i < graphMatrix.length; i++) {
    for (let j = 0; j < graphMatrix[i].length; j++) {
      result += graphMatrix[i][j].element;
    }

    result += "\n";
  }

  return result;
}
