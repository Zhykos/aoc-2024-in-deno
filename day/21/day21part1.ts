import { Dijkstra, NodeVertex, Vertex } from "../21/dijkstra-algorithm.ts";

export function day21part1(): number {
  const inputRaw: string = Deno.readTextFileSync(
    "./day/21/input/input.txt",
  );

  const numericKeypad: Dijkstra = dijNumericKeypad();
  const directionalKeypad: Dijkstra = dijDirectionalKeypad();

  let score = 0;
  const codes: string[] = ["029A", "980A", "179A", "456A", "379A"];

  for (const code of codes) {
    let numericStart = "A";
    let d1start = "A";
    let d2start = "A";
    const humanPath: string[] = [];

    for (let i = 0; i < code.length; i++) {
      const codeTarget: string = code[i];

      const { path: numPath }: { path: string[] } = numericKeypad
        .findShortestWay(numericStart, codeTarget);
      numericStart = codeTarget;

      if (i >= 2) {
        //console.log(`Numeric path: ${numPath}`);
      }

      const dir1: string[] = getDirectionsForNumericKeypad(numPath);
      if (i >= 2) {
        //console.log(`Directional keypad 1: ${dir1}`);
      }

      for (const d1 of dir1) {
        const dir1Path: string[] = findShortestWay(
          d1start,
          d1,
          directionalKeypad,
        );

        /*console.log(
          `Directional path 1: ${dir1Path} `,
        );*/
        d1start = d1;

        const dir2: string[] = getDirectionsForDirectionalKeypad(dir1Path);
        //if (i >= 2) console.log(`Directional keypad 2: ${dir2}`);

        if (dir2.length === 0) {
          // humanPath.push("A");
        }

        for (const d2 of dir2) {
          const dir2Path: string[] = findShortestWay(
            d2start,
            d2,
            directionalKeypad,
          );
          /*if (i >= 2) {
          console.log(
            `Directional path 2: ${dir2Path}`,
          );
        }*/
          d2start = d2;
          //console.log(`Directional path 2: ${dir2Path}`);

          const dirHuman: string[] = getDirectionsForDirectionalKeypad(
            dir2Path,
          );
          //console.log(`Directional keypad human: ${dirHuman}`);

          humanPath.push(...dirHuman);
          humanPath.push("A");
          // if (i >= 2) console.log("=====", dirHuman);
        }

        // Go back to A for d2 to execute d1 action

        const dir2PathBack: string[] = findShortestWay(
          d2start,
          "A",
          directionalKeypad,
        );
        d2start = "A";

        const dir2Back: string[] = getDirectionsForDirectionalKeypad(
          dir2PathBack,
        );
        //console.log(`Directional keypad 2 back: ${dir2Back}`);

        humanPath.push(...dir2Back);
        humanPath.push("A");
        //if (i >= 2) console.log("===== back", dir2Back);
      }

      // Go back to A for d1 to execute numeric keyboard action

      const dir1PathBack: string[] = findShortestWay(
        d1start,
        "A",
        directionalKeypad,
      );
      d1start = "A";

      const dir1Back: string[] = getDirectionsForDirectionalKeypad(
        dir1PathBack,
      );

      for (const d2 of dir1Back) {
        const dir2Path: string[] = findShortestWay(
          d2start,
          d2,
          directionalKeypad,
        );
        d2start = d2;
        //console.log(`Directional path 2: ${dir2Path}`);

        const dirHuman: string[] = getDirectionsForDirectionalKeypad(dir2Path);
        //console.log(`Directional keypad human: ${dirHuman}`);

        humanPath.push(...dirHuman);
        humanPath.push("A");
      }

      // Go back to A for d1 to execute numeric keyboard action

      const dir2PathBack2: string[] = findShortestWay(
        d2start,
        "A",
        directionalKeypad,
      );
      d2start = "A";

      const dir2Back2: string[] = getDirectionsForDirectionalKeypad(
        dir2PathBack2,
      );

      humanPath.push(...dir2Back2);
      humanPath.push("A");

      /*console.log(
      `code validé ${codeTarget}`,
      humanPath.join(""),
      numericStart,
      d1start,
      d2start,
    );*/
    }

    console.log(`final path human: ${humanPath}`);
    const codeNumeric: number = Number.parseInt(
      (/(\d+)/.exec(code) as RegExpExecArray)[0],
    );
    console.log(`codeNumeric: ${codeNumeric}, humanPath: ${humanPath.length}`);

    score += codeNumeric * humanPath.length;
  }

  return score;
}

function dijNumericKeypad(): Dijkstra {
  const dijkstra = new Dijkstra();

  dijkstra.addVertex(
    new Vertex(
      "A",
      [
        new NodeVertex("0", 1),
        new NodeVertex("3", 1),
      ],
      1,
    ),
  );

  dijkstra.addVertex(
    new Vertex(
      "0",
      [
        new NodeVertex("2", 1),
        new NodeVertex("A", 1),
      ],
      1,
    ),
  );

  dijkstra.addVertex(
    new Vertex(
      "1",
      [
        new NodeVertex("4", 1),
        new NodeVertex("2", 1),
      ],
      1,
    ),
  );

  dijkstra.addVertex(
    new Vertex(
      "2",
      [
        new NodeVertex("0", 1),
        new NodeVertex("1", 1),
        new NodeVertex("3", 1),
        new NodeVertex("5", 1),
      ],
      1,
    ),
  );

  dijkstra.addVertex(
    new Vertex(
      "3",
      [
        new NodeVertex("A", 1),
        new NodeVertex("2", 1),
        new NodeVertex("6", 1),
      ],
      1,
    ),
  );

  dijkstra.addVertex(
    new Vertex(
      "4",
      [
        new NodeVertex("1", 1),
        new NodeVertex("5", 1),
        new NodeVertex("7", 1),
      ],
      1,
    ),
  );

  dijkstra.addVertex(
    new Vertex(
      "5",
      [
        new NodeVertex("2", 1),
        new NodeVertex("4", 1),
        new NodeVertex("6", 1),
        new NodeVertex("8", 1),
      ],
      1,
    ),
  );

  dijkstra.addVertex(
    new Vertex(
      "6",
      [
        new NodeVertex("3", 1),
        new NodeVertex("5", 1),
        new NodeVertex("9", 1),
      ],
      1,
    ),
  );

  dijkstra.addVertex(
    new Vertex(
      "7",
      [
        new NodeVertex("4", 1),
        new NodeVertex("8", 1),
      ],
      1,
    ),
  );

  dijkstra.addVertex(
    new Vertex(
      "8",
      [
        new NodeVertex("5", 1),
        new NodeVertex("7", 1),
        new NodeVertex("9", 1),
      ],
      1,
    ),
  );

  dijkstra.addVertex(
    new Vertex(
      "9",
      [
        new NodeVertex("6", 1),
        new NodeVertex("8", 1),
      ],
      1,
    ),
  );

  return dijkstra;
}

function dijDirectionalKeypad(): Dijkstra {
  const dijkstra = new Dijkstra();

  dijkstra.addVertex(
    new Vertex(
      "A",
      [
        new NodeVertex("^", 1),
        new NodeVertex(">", 1),
      ],
      1,
    ),
  );

  dijkstra.addVertex(
    new Vertex(
      "^",
      [
        new NodeVertex("A", 1),
        new NodeVertex("v", 1),
      ],
      1,
    ),
  );

  dijkstra.addVertex(
    new Vertex(
      "<",
      [
        new NodeVertex("v", 1),
      ],
      1,
    ),
  );

  dijkstra.addVertex(
    new Vertex(
      "v",
      [
        new NodeVertex("<", 1),
        new NodeVertex("^", 1),
        new NodeVertex(">", 1),
      ],
      1,
    ),
  );

  dijkstra.addVertex(
    new Vertex(
      ">",
      [
        new NodeVertex("A", 1),
        new NodeVertex("v", 1),
      ],
      1,
    ),
  );

  return dijkstra;
}

function getDirectionsForNumericKeypad(path: string[]): string[] {
  const directions: string[] = [];

  for (let i = 0; i < path.length - 1; i++) {
    const currentVertex: string = path[i];
    const nextVertex: string = path[i + 1];

    if (currentVertex === "A" && nextVertex === "0") {
      directions.push("<");
    } else if (currentVertex === "A" && nextVertex === "3") {
      directions.push("^");
    } else if (currentVertex === "0" && nextVertex === "A") {
      directions.push(">");
    } else if (currentVertex === "0" && nextVertex === "2") {
      directions.push("^");
    } else if (currentVertex === "1" && nextVertex === "2") {
      directions.push(">");
    } else if (currentVertex === "1" && nextVertex === "4") {
      directions.push("^");
    } else if (currentVertex === "2" && nextVertex === "0") {
      directions.push("v");
    } else if (currentVertex === "2" && nextVertex === "1") {
      directions.push("<");
    } else if (currentVertex === "2" && nextVertex === "3") {
      directions.push(">");
    } else if (currentVertex === "2" && nextVertex === "5") {
      directions.push("^");
    } else if (currentVertex === "3" && nextVertex === "A") {
      directions.push("v");
    } else if (currentVertex === "3" && nextVertex === "2") {
      directions.push("<");
    } else if (currentVertex === "3" && nextVertex === "6") {
      directions.push("^");
    } else if (currentVertex === "4" && nextVertex === "1") {
      directions.push("v");
    } else if (currentVertex === "4" && nextVertex === "5") {
      directions.push(">");
    } else if (currentVertex === "4" && nextVertex === "7") {
      directions.push("^");
    } else if (currentVertex === "5" && nextVertex === "2") {
      directions.push("v");
    } else if (currentVertex === "5" && nextVertex === "4") {
      directions.push("<");
    } else if (currentVertex === "5" && nextVertex === "6") {
      directions.push(">");
    } else if (currentVertex === "5" && nextVertex === "8") {
      directions.push("^");
    } else if (currentVertex === "6" && nextVertex === "3") {
      directions.push("v");
    } else if (currentVertex === "6" && nextVertex === "5") {
      directions.push("<");
    } else if (currentVertex === "6" && nextVertex === "9") {
      directions.push("^");
    } else if (currentVertex === "7" && nextVertex === "4") {
      directions.push("v");
    } else if (currentVertex === "7" && nextVertex === "8") {
      directions.push(">");
    } else if (currentVertex === "8" && nextVertex === "5") {
      directions.push("v");
    } else if (currentVertex === "8" && nextVertex === "7") {
      directions.push("<");
    } else if (currentVertex === "8" && nextVertex === "9") {
      directions.push(">");
    } else if (currentVertex === "9" && nextVertex === "6") {
      directions.push("v");
    } else if (currentVertex === "9" && nextVertex === "8") {
      directions.push("<");
    } else {
      throw new Error(`Invalid path from ${currentVertex} to ${nextVertex}`);
    }
  }

  return directions;
}

function getDirectionsForDirectionalKeypad(path: string[]): string[] {
  const directions: string[] = [];

  for (let i = 0; i < path.length - 1; i++) {
    const currentVertex: string = path[i];
    const nextVertex: string = path[i + 1];

    if (currentVertex === "A" && nextVertex === "^") {
      directions.push("<");
    } else if (currentVertex === "A" && nextVertex === ">") {
      directions.push("v");
    } else if (currentVertex === "^" && nextVertex === "A") {
      directions.push(">");
    } else if (currentVertex === "^" && nextVertex === "v") {
      directions.push("v");
    } else if (currentVertex === "<" && nextVertex === "v") {
      directions.push(">");
    } else if (currentVertex === "v" && nextVertex === "<") {
      directions.push("<");
    } else if (currentVertex === "v" && nextVertex === "^") {
      directions.push("^");
    } else if (currentVertex === "v" && nextVertex === ">") {
      directions.push(">");
    } else if (currentVertex === ">" && nextVertex === "A") {
      directions.push("^");
    } else if (currentVertex === ">" && nextVertex === "v") {
      directions.push("<");
    } else {
      throw new Error(`Invalid path from ${currentVertex} to ${nextVertex}`);
    }
  }

  return directions;
}

function findShortestWay(start: string, end: string, dij: Dijkstra): string[] {
  if (start === "A" && end === "<") {
    return ["A", ">", "v", "<"];
  }

  if (start === "<" && end === "A") {
    return ["<", "v", ">", "A"];
  }

  return dij.findShortestWay(start, end).path;
}
