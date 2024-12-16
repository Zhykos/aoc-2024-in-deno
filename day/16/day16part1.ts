export function day16part1(): number {
  const inputRaw: string = Deno.readTextFileSync(
    "./day/16/input/input.txt",
  );

  let startPosition: Position | null = null;
  let endPosition: Position | null = null;

  const maze: string[][] = [];
  const lines: string[] = inputRaw.split("\n");
  for (let i = 0; i < lines.length; i++) {
    const line: string = lines[i];
    if (line === "") {
      continue;
    }

    maze[i] = [];

    for (let j = 0; j < line.length; j++) {
      maze[i][j] = line[j];
      if (line[j] === "S") {
        startPosition = new Position(j, i);
      } else if (line[j] === "E") {
        endPosition = new Position(j, i);
      }
    }
  }

  //displayMaze(maze);

  const scores: number[] = [];

  recursiveSolveMaze(
    maze,
    startPosition as Position,
    endPosition as Position,
    Direction.RIGHT,
    [],
    0,
    scores,
  );

  console.log("SCORES", scores);

  // Return minimum score
  return scores.reduce(
    (acc, curr) => Math.min(acc, curr),
    Number.MAX_SAFE_INTEGER,
  );
}

function displayMaze(
  maze: string[][],
  myPosition?: Position,
  visited?: Position[],
): void {
  for (let i = 0; i < maze.length; i++) {
    let line = "";
    for (let j = 0; j < maze[i].length; j++) {
      if (myPosition && myPosition.x === j && myPosition.y === i) {
        line += "0";
      } else if (
        visited?.find((position) => position.x === j && position.y === i)
      ) {
        line += "x";
      } else {
        line += maze[i][j];
      }
    }
    console.log(line);
  }
}

class Position {
  constructor(public x: number, public y: number) {}
}

enum Direction {
  UP = "UP",
  DOWN = "DOWN",
  LEFT = "LEFT",
  RIGHT = "RIGHT",
}

function recursiveSolveMaze(
  maze: string[][],
  myPosition: Position,
  end: Position,
  orientation: Direction,
  visited: Position[],
  score: number,
  finalScores: number[],
): void {
  //console.log(myPosition, end, orientation, score);
  //displayMaze(maze, myPosition, visited);

  if (myPosition.x === end.x && myPosition.y === end.y) {
    console.log("Solved with score", score);
    finalScores.push(score);
    displayMaze(maze, myPosition, visited);
    return;
  }

  if (finalScores.find((s) => s <= score)) {
    return;
  }

  if (
    visited.find((position) =>
      position.x === myPosition.x && position.y === myPosition.y
    )
  ) {
    return;
  }

  // Go right
  if (
    (maze[myPosition.y][myPosition.x + 1] === "." ||
      maze[myPosition.y][myPosition.x + 1] === "E") &&
    !visited.some((position) =>
      position.x === myPosition.x + 1 && position.y === myPosition.y
    )
  ) {
    recursiveSolveMaze(
      maze,
      new Position(myPosition.x + 1, myPosition.y),
      end,
      Direction.RIGHT,
      [...visited, myPosition],
      orientation === Direction.RIGHT ? score + 1 : score + 1001,
      finalScores,
    );
  }

  // Go left
  if (
    (maze[myPosition.y][myPosition.x - 1] === "." ||
      maze[myPosition.y][myPosition.x - 1] === "E") && !visited.some(
        (position) =>
          position.x === myPosition.x - 1 && position.y === myPosition.y,
      )
  ) {
    recursiveSolveMaze(
      maze,
      new Position(myPosition.x - 1, myPosition.y),
      end,
      Direction.LEFT,
      [...visited, myPosition],
      orientation === Direction.LEFT ? score + 1 : score + 1001,
      finalScores,
    );
  }

  // Go down
  if (
    (maze[myPosition.y + 1][myPosition.x] === "." ||
      maze[myPosition.y + 1][myPosition.x] === "E") && !visited.some(
        (position) =>
          position.x === myPosition.x && position.y === myPosition.y + 1,
      )
  ) {
    recursiveSolveMaze(
      maze,
      new Position(myPosition.x, myPosition.y + 1),
      end,
      Direction.DOWN,
      [...visited, myPosition],
      orientation === Direction.DOWN ? score + 1 : score + 1001,
      finalScores,
    );
  }

  // Go up
  if (
    (maze[myPosition.y - 1][myPosition.x] === "." ||
      maze[myPosition.y - 1][myPosition.x] === "E") && !visited.some(
        (position) =>
          position.x === myPosition.x && position.y === myPosition.y - 1,
      )
  ) {
    recursiveSolveMaze(
      maze,
      new Position(myPosition.x, myPosition.y - 1),
      end,
      Direction.UP,
      [...visited, myPosition],
      orientation === Direction.UP ? score + 1 : score + 1001,
      finalScores,
    );
  }

  //console.log(myPosition, end, orientation, score);
  //displayMaze(maze, myPosition, visited);
}
