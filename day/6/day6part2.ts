export function day6part2(): number {
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

  // Simulate the path

  let nbLoops = 0;

  for (let line = 0; line < nbLines; line++) {
    for (let column = 0; column < nbColumns; column++) {
      if (map.matrix[line][column] instanceof Obstacle) {
        continue;
      }

      const newMap: MapPuzzle = copyMap(map);
      const newGuard = new Guard(guard.position);
      newGuard.direction = "up";

      newMap.matrix[guard.position[0]][guard.position[1]] = newGuard;
      newMap.matrix[line][column] = new ObstacleForLoop([line, column]);

      if (launchSimulationAndEndsInALoop(newMap, newGuard)) {
        nbLoops++;
      }
    }
  }

  return nbLoops;
}

function copyMap(map: MapPuzzle): MapPuzzle {
  const newMap = new MapPuzzle(map.nbLines, map.nbColumns);

  for (let i = 0; i < map.nbLines; i++) {
    for (let j = 0; j < map.nbColumns; j++) {
      if (map.matrix[i][j] instanceof Empty) {
        newMap.matrix[i][j] = new Empty([i, j]);
      } else if (map.matrix[i][j] instanceof Obstacle) {
        newMap.matrix[i][j] = new Obstacle([i, j]);
      } else if (map.matrix[i][j] instanceof Guard) {
        newMap.matrix[i][j] = new Guard([i, j]);
      } else if (map.matrix[i][j] instanceof Visited) {
        newMap.matrix[i][j] = new Visited([i, j]);
      }
    }
  }

  return newMap;
}

function launchSimulationAndEndsInALoop(
  map: MapPuzzle,
  guard: Guard,
): boolean {
  let movedInside = true;

  while (movedInside) {
    const moveResult: { movedInside: boolean; isLoop: boolean } = guard
      .move(map);

    if (moveResult.isLoop) {
      //map.display();
      return true;
    }

    movedInside = moveResult.movedInside;
  }

  return false;
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
        } else if (this.matrix[i][j] instanceof ObstacleForLoop) {
          line += "O";
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

  move(map: MapPuzzle): { movedInside: boolean; isLoop: boolean } {
    const [line, column] = this.position;

    if (this.direction === "up") {
      if (line - 1 < 0) {
        return { movedInside: false, isLoop: false };
      }

      if (map.matrix[line - 1][column].canWalkOn()) {
        this.position = [line - 1, column];
        map.matrix[line - 1][column] = this;
        map.matrix[line][column] = new Visited([line, column]);
      } else {
        const obstacle = map.matrix[line - 1][column] as Obstacle;
        if (obstacle.hadAlreadyHitOnTheBottom) {
          return { movedInside: false, isLoop: true };
        }

        obstacle.hadAlreadyHitOnTheBottom = true;
        this.direction = "right";
      }
    } else if (this.direction === "right") {
      if (column + 1 >= map.matrix[0].length) {
        return { movedInside: false, isLoop: false };
      }

      if (map.matrix[line][column + 1].canWalkOn()) {
        this.position = [line, column + 1];
        map.matrix[line][column + 1] = this;
        map.matrix[line][column] = new Visited([line, column]);
      } else {
        const obstacle = map.matrix[line][column + 1] as Obstacle;
        if (obstacle.hadAlreadyHitOnTheLeft) {
          return { movedInside: false, isLoop: true };
        }

        obstacle.hadAlreadyHitOnTheLeft = true;
        this.direction = "down";
      }
    } else if (this.direction === "down") {
      if (line + 1 >= map.matrix.length) {
        return { movedInside: false, isLoop: false };
      }

      if (map.matrix[line + 1][column].canWalkOn()) {
        this.position = [line + 1, column];
        map.matrix[line + 1][column] = this;
        map.matrix[line][column] = new Visited([line, column]);
      } else {
        const obstacle = map.matrix[line + 1][column] as Obstacle;
        if (obstacle.hadAlreadyHitOnTheTop) {
          return { movedInside: false, isLoop: true };
        }

        obstacle.hadAlreadyHitOnTheTop = true;
        this.direction = "left";
      }
    } else {
      if (column - 1 < 0) {
        return { movedInside: false, isLoop: false };
      }

      if (map.matrix[line][column - 1].canWalkOn()) {
        this.position = [line, column - 1];
        map.matrix[line][column - 1] = this;
        map.matrix[line][column] = new Visited([line, column]);
      } else {
        const obstacle = map.matrix[line][column - 1] as Obstacle;
        if (obstacle.hadAlreadyHitOnTheRight) {
          return { movedInside: false, isLoop: true };
        }

        obstacle.hadAlreadyHitOnTheRight = true;
        this.direction = "up";
      }
    }

    return { movedInside: true, isLoop: false };
  }
}

class Obstacle extends MapObject {
  public hadAlreadyHitOnTheLeft = false;
  public hadAlreadyHitOnTheRight = false;
  public hadAlreadyHitOnTheTop = false;
  public hadAlreadyHitOnTheBottom = false;

  canWalkOn(): boolean {
    return false;
  }
}

class ObstacleForLoop extends Obstacle {
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
