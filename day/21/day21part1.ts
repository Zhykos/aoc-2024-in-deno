//import { Dijkstra, NodeVertex, Vertex } from "../21/dijkstra-algorithm.ts";

export function day21part1(): number {
  const _: string = Deno.readTextFileSync(
    "./day/21/input/input.txt",
  );

  //const numericKeypad: Dijkstra = dijNumericKeypad();
  const directionCache: Map<string, string[]> = getAllDirectionPaths();
  const numericCache: Map<string, string[]> = getAllNumericPaths();

  let score = 0;
  //const codes = ["029A", "980A", "179A", "456A", "379A"];
  const codes = ["379A"];

  for (const code of codes) {
    let numericStart = "A";
    let d1start = "A";
    let d2start = "A";
    const humanPath: string[] = [];

    for (let i = 0; i < code.length; i++) {
      const codeTarget: string = code[i];

      const numPath: string[] = findShortestWay(
        numericStart,
        codeTarget,
        numericCache,
      );

      numericStart = codeTarget;

      if (i >= 2) {
        //console.log(`Numeric path: ${numPath}`);
      }

      const dir1: string[] = getDirectionsForNumericKeypad(numPath);

      //console.log(`Directional keypad 1: ${dir1}`);

      for (const d1 of dir1) {
        const dir1Path: string[] = findShortestWay(
          d1start,
          d1,
          directionCache,
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
            directionCache,
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
          directionCache,
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
        directionCache,
      );
      d1start = "A";

      const dir1Back: string[] = getDirectionsForDirectionalKeypad(
        dir1PathBack,
      );

      for (const d2 of dir1Back) {
        const dir2Path: string[] = findShortestWay(
          d2start,
          d2,
          directionCache,
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
        directionCache,
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

    const codeNumeric: number = Number.parseInt(
      (/(\d+)/.exec(code) as RegExpExecArray)[0],
    );
    console.log(
      `code: ${code}, codeNumeric: ${codeNumeric}, humanPath: ${humanPath.length}`,
      humanPath.join(""),
    );

    score += codeNumeric * humanPath.length;
  }

  return score;
}

/*function dijNumericKeypad(): Dijkstra {
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
}*/

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

function findShortestWay(
  start: string,
  end: string,
  cache: Map<string, string[]>,
): string[] {
  if (start === end) {
    return [];
  }

  const key: string = `${start}${end}`;
  if (cache.has(key)) {
    return cache.get(key) as string[];
  }

  throw new Error(`No path from ${start} to ${end}`);
}

function getAllDirectionPaths(): Map<string, string[]> {
  /*  +---+---+
      | ^ | A |
  +---+---+---+
  | < | v | > |
  +---+---+---+
  */
  const paths = new Map<string, string[]>();

  paths.set("A^", ["A", "^"]);
  paths.set("A>", ["A", ">"]);
  paths.set("Av", ["A", ">", "v"]);
  paths.set("A<", ["A", ">", "v", "<"]);

  paths.set("^A", ["^", "A"]);
  paths.set("^>", ["^", "v", ">"]);
  paths.set("^v", ["^", "v"]);
  paths.set("^<", ["^", "v", "<"]);

  paths.set(">A", [">", "A"]);
  paths.set(">v", [">", "v"]);
  paths.set(">^", [">", "v", "^"]);
  paths.set("><", [">", "v", "<"]);

  paths.set("vA", ["v", ">", "A"]);
  paths.set("v>", ["v", ">"]);
  paths.set("v^", ["v", "^"]);
  paths.set("v<", ["v", "<"]);

  paths.set("<A", ["<", "v", ">", "A"]);
  paths.set("<v", ["<", "v"]);
  paths.set("<^", ["<", "v", "^"]);
  paths.set("<>", ["<", "v", ">"]);

  return paths;
}

function getAllNumericPaths(): Map<string, string[]> {
  /*
  +---+---+---+
  | 7 | 8 | 9 |
  +---+---+---+
  | 4 | 5 | 6 |
  +---+---+---+
  | 1 | 2 | 3 |
  +---+---+---+
      | 0 | A |
      +---+---+
  */
  const paths = new Map<string, string[]>();

  paths.set("A0", ["A", "0"]);
  paths.set("A1", ["A", "3", "2", "1"]);
  paths.set("A2", ["A", "3", "2"]);
  paths.set("A3", ["A", "3"]);
  paths.set("A4", ["A", "3", "6", "5", "4"]);
  paths.set("A5", ["A", "3", "6", "5"]);
  paths.set("A6", ["A", "3", "6"]);
  paths.set("A7", ["A", "3", "6", "9", "8", "7"]);
  paths.set("A8", ["A", "3", "6", "9", "8"]);
  paths.set("A9", ["A", "3", "6", "9"]);

  paths.set("0A", ["0", "A"]);
  paths.set("01", ["0", "2", "1"]);
  paths.set("02", ["0", "2"]);
  paths.set("03", ["0", "2", "3"]);
  paths.set("04", ["0", "2", "5", "4"]);
  paths.set("05", ["0", "2", "5"]);
  paths.set("06", ["0", "2", "5", "6"]);
  paths.set("07", ["0", "2", "5", "8", "7"]);
  paths.set("08", ["0", "2", "5", "8"]);
  paths.set("09", ["0", "2", "5", "8", "9"]);

  paths.set("1A", ["1", "2", "3", "A"]);
  paths.set("10", ["1", "2", "0"]);
  paths.set("12", ["1", "2"]);
  paths.set("13", ["1", "2", "3"]);
  paths.set("14", ["1", "4"]);
  paths.set("15", ["1", "4", "5"]);
  paths.set("16", ["1", "4", "5", "6"]);
  paths.set("17", ["1", "4", "7"]);
  paths.set("18", ["1", "4", "7", "8"]);
  paths.set("19", ["1", "4", "7", "8", "9"]);

  paths.set("2A", ["2", "3", "A"]);
  paths.set("20", ["2", "0"]);
  paths.set("21", ["2", "1"]);
  paths.set("23", ["2", "3"]);
  paths.set("24", ["2", "5", "4"]);
  paths.set("25", ["2", "5"]);
  paths.set("26", ["2", "5", "6"]);
  paths.set("27", ["2", "5", "8", "7"]);
  paths.set("28", ["2", "5", "8"]);
  paths.set("29", ["2", "5", "8", "9"]);

  paths.set("3A", ["3", "A"]);
  paths.set("30", ["3", "A", "0"]);
  paths.set("31", ["3", "2", "1"]);
  paths.set("32", ["3", "2"]);
  paths.set("34", ["3", "6", "5", "4"]);
  paths.set("35", ["3", "6", "5"]);
  paths.set("36", ["3", "6"]);
  paths.set("37", ["3", "6", "9", "8", "7"]);
  paths.set("38", ["3", "6", "9", "8"]);
  paths.set("39", ["3", "6", "9"]);

  paths.set("4A", ["4", "5", "6", "3", "A"]);
  paths.set("40", ["4", "5", "2", "0"]);
  paths.set("41", ["4", "1"]);
  paths.set("42", ["4", "5", "2"]);
  paths.set("43", ["4", "5", "6", "3"]);
  paths.set("45", ["4", "5"]);
  paths.set("46", ["4", "5", "6"]);
  paths.set("47", ["4", "7"]);
  paths.set("48", ["4", "7", "8"]);
  paths.set("49", ["4", "7", "8", "9"]);

  paths.set("5A", ["5", "6", "3", "A"]);
  paths.set("50", ["5", "2", "0"]);
  paths.set("51", ["5", "4", "1"]);
  paths.set("52", ["5", "2"]);
  paths.set("53", ["5", "6", "3"]);
  paths.set("54", ["5", "4"]);
  paths.set("56", ["5", "6"]);
  paths.set("57", ["5", "8", "7"]);
  paths.set("58", ["5", "8"]);
  paths.set("59", ["5", "8", "9"]);

  paths.set("6A", ["6", "3", "A"]);
  paths.set("60", ["6", "3", "A", "0"]);
  paths.set("61", ["6", "5", "4", "1"]);
  paths.set("62", ["6", "5", "2"]);
  paths.set("63", ["6", "3"]);
  paths.set("64", ["6", "5", "4"]);
  paths.set("65", ["6", "5"]);
  paths.set("67", ["6", "9", "8", "7"]);
  paths.set("68", ["6", "9", "8"]);
  paths.set("69", ["6", "9"]);

  paths.set("7A", ["7", "8", "9", "6", "3", "A"]);
  paths.set("70", ["7", "8", "5", "2", "0"]);
  paths.set("71", ["7", "4", "1"]);
  paths.set("72", ["7", "8", "5", "2"]);
  paths.set("73", ["7", "8", "9", "6", "3"]);
  paths.set("74", ["7", "4"]);
  paths.set("75", ["7", "8", "5"]);
  paths.set("76", ["7", "8", "9", "6"]);
  paths.set("78", ["7", "8"]);
  paths.set("79", ["7", "8", "9"]);

  paths.set("8A", ["8", "9", "6", "3", "A"]);
  paths.set("80", ["8", "5", "2", "0"]);
  paths.set("81", ["8", "7", "4", "1"]);
  paths.set("82", ["8", "5", "2"]);
  paths.set("83", ["8", "9", "6", "3"]);
  paths.set("84", ["8", "7", "4"]);
  paths.set("85", ["8", "5"]);
  paths.set("86", ["8", "9", "6"]);
  paths.set("87", ["8", "7"]);
  paths.set("89", ["8", "9"]);

  paths.set("9A", ["9", "6", "3", "A"]);
  paths.set("90", ["9", "6", "3", "A", "0"]);
  paths.set("91", ["9", "8", "7", "4", "1"]);
  paths.set("92", ["9", "8", "5", "2"]);
  paths.set("93", ["9", "6", "3"]);
  paths.set("94", ["9", "8", "7", "4"]);
  paths.set("95", ["9", "8", "5"]);
  paths.set("96", ["9", "6"]);
  paths.set("97", ["9", "8", "7"]);
  paths.set("98", ["9", "8"]);

  return paths;
}
