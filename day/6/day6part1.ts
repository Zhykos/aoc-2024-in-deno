export function day6part1(): number {
  const inputRaw: string = Deno.readTextFileSync(
    "./day/6/input/input.txt",
  );

  const split: string[] = inputRaw.split("\n");
  const nbLines: number = split.filter((line) => line !== "").length;
  const nbColumns: number = split[0].length;

  const map = new MapPuzzle(nbLines, nbColumns);
  let guard!: Guard;

  // Initialize the map

  for (let line = 0; line < nbLines; line++) {
    for (let column = 0; column < nbColumns; column++) {
      const char: string = split[line][column];

      if (char === ".") {
        map.matrix[line][column] = new Empty([line, column]);
      } else if (char === "#") {
        map.matrix[line][column] = new Obstacle([line, column]);
      } else if (char === "^") {
        guard = new Guard([line, column]);
        map.matrix[line][column] = guard;
      }
    }
  }

  //map.display();

  // Simulate the path

  //let nbIterations = 0;

  while (!guard.isOutsideMap(map)) {
    const movedInside: boolean = guard.move(map);

    //console.log("Iteration: ", ++nbIterations);
    //map.display();

    if (!movedInside) {
      break;
    }
  }

  return map.matrix.flat().filter((obj) => obj instanceof Visited).length + 1;
}

type Position = [number, number];

class MapPuzzle {
  public matrix: MapObject[][] = [];

  constructor(public nbLines: number, public nbColumns: number) {
    for (let i = 0; i < nbLines; i++) {
      const line: MapObject[] = [];
      this.matrix.push(line);

      for (let j = 0; j < nbColumns; j++) {
        line.push(new Empty([i, j]));
      }
    }
  }

  display() {
    for (let i = 0; i < this.nbLines; i++) {
      let line = "";
      for (let j = 0; j < this.nbColumns; j++) {
        if (this.matrix[i][j] instanceof Empty) {
          line += ".";
        } else if (this.matrix[i][j] instanceof Obstacle) {
          line += "#";
        } else if (this.matrix[i][j] instanceof Guard) {
          const guard = this.matrix[i][j] as Guard;
          if (guard.direction === "up") {
            line += "^";
          } else if (guard.direction === "right") {
            line += ">";
          } else if (guard.direction === "down") {
            line += "v";
          } else {
            line += "<";
          }
        } else if (this.matrix[i][j] instanceof Visited) {
          line += "x";
        }
      }
      console.log(line);
    }
  }
}

abstract class MapObject {
  constructor(public position: Position) {}

  abstract canWalkOn(): boolean;
}

class Guard extends MapObject {
  public direction: "up" | "down" | "left" | "right" = "up";

  canWalkOn(): boolean {
    return false;
  }

  isOutsideMap(map: MapPuzzle): boolean {
    return this.position[0] < 0 || this.position[1] < 0 ||
      this.position[0] >= map.matrix.length ||
      this.position[1] >= map.matrix[0].length;
  }

  move(map: MapPuzzle): boolean {
    const [line, column] = this.position;

    if (this.direction === "up") {
      if (line - 1 < 0) {
        return false;
      }

      if (map.matrix[line - 1][column].canWalkOn()) {
        this.position = [line - 1, column];
        map.matrix[line - 1][column] = this;
        map.matrix[line][column] = new Visited([line, column]);
      } else {
        this.direction = "right";
      }
    } else if (this.direction === "right") {
      if (column + 1 >= map.matrix[0].length) {
        return false;
      }

      if (map.matrix[line][column + 1].canWalkOn()) {
        this.position = [line, column + 1];
        map.matrix[line][column + 1] = this;
        map.matrix[line][column] = new Visited([line, column]);
      } else {
        this.direction = "down";
      }
    } else if (this.direction === "down") {
      if (line + 1 >= map.matrix.length) {
        return false;
      }

      if (map.matrix[line + 1][column].canWalkOn()) {
        this.position = [line + 1, column];
        map.matrix[line + 1][column] = this;
        map.matrix[line][column] = new Visited([line, column]);
      } else {
        this.direction = "left";
      }
    } else {
      if (column - 1 < 0) {
        return false;
      }

      if (map.matrix[line][column - 1].canWalkOn()) {
        this.position = [line, column - 1];
        map.matrix[line][column - 1] = this;
        map.matrix[line][column] = new Visited([line, column]);
      } else {
        this.direction = "up";
      }
    }

    return true;
  }
}

class Obstacle extends MapObject {
  canWalkOn(): boolean {
    return false;
  }
}

class Empty extends MapObject {
  canWalkOn(): boolean {
    return true;
  }
}

class Visited extends MapObject {
  canWalkOn(): boolean {
    return true;
  }
}
