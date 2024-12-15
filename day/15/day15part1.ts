export function day15part1(): number {
  const inputRaw: string = Deno.readTextFileSync(
    "./day/15/input/input.txt",
  );

  const matrix: WarehouseObject[][] = [];
  const moves: string[] = [];
  let robot: Robot | null = null;

  const lines: string[] = inputRaw.split("\n");

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    if (line === "") {
      continue;
    }

    // map
    if (line.startsWith("#")) {
      const warehouseObjects: WarehouseObject[] = [];
      matrix.push(warehouseObjects);

      for (let j = 0; j < line.length; j++) {
        const char = line[j];

        const position = new Position(j, i);

        if (char === "O") {
          warehouseObjects.push(new Box(position));
        } else if (char === "@") {
          robot = new Robot(position);
          warehouseObjects.push(robot);
        } else if (char === "#") {
          warehouseObjects.push(new Wall(position));
        } else {
          warehouseObjects.push(new Empty(position));
        }
      }
    } else {
      // moves
      moves.push(...line);
    }
  }

  if (robot === null) {
    throw new Error("Robot not found");
  }

  const map = new WarehouseMap(matrix, robot);
  //console.log(map.toString());
  //console.log(moves);

  //let iteration = 0;

  for (const move of moves) {
    if (move === "<") {
      map.moveRobot(Direction.LEFT);
    } else if (move === ">") {
      map.moveRobot(Direction.RIGHT);
    } else if (move === "v") {
      map.moveRobot(Direction.DOWN);
    } else if (move === "^") {
      map.moveRobot(Direction.UP);
    }

    /*iteration++;
    if (iteration >= 60) {
      console.log("iteration", iteration, move, "\n", map.toString());
    }
    if (iteration === 64) {
      // break;
    }*/
  }

  //console.log("FINISH", "\n", map.toString());

  return map.matrix
    .flat()
    .filter((object) => object instanceof Box)
    .map((box) => box.gpsScore())
    .reduce((acc, curr) => acc + curr, 0);
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

abstract class WarehouseObject {
  constructor(public position: Position) {}

  move(direction: Direction): void {
    if (direction === Direction.UP) {
      this.position.y--;
    } else if (direction === Direction.DOWN) {
      this.position.y++;
    } else if (direction === Direction.LEFT) {
      this.position.x--;
    } else {
      this.position.x++;
    }
  }
}

class Robot extends WarehouseObject {
  override toString(): string {
    return "@";
  }
}

class Box extends WarehouseObject {
  override toString(): string {
    return "O";
  }

  gpsScore(): number {
    return this.position.x + (100 * this.position.y);
  }
}

class Wall extends WarehouseObject {
  override move(): void {
    // Do nothing
  }

  override toString(): string {
    return "#";
  }
}

class Empty extends WarehouseObject {
  override move(): void {
    // Do nothing
  }

  override toString(): string {
    return ".";
  }
}

class WarehouseMap {
  constructor(public matrix: WarehouseObject[][], public robot: Robot) {}

  moveRobot(direction: Direction): void {
    if (this.canRobotMove(direction)) {
      this.moveRobotAndBoxes(direction);
    }
  }

  private moveRobotAndBoxes(direction: Direction): void {
    // Always swap with an empty cell
    let boxes: Box[] = this.getBoxesToMove(direction);

    /*if (direction === Direction.UP) {
      // Swap boxes
      for (let i = 0; i < boxes.length; i++) {
        const box = boxes[i];
        this.matrix[box.position.y][box.position.x] = new Empty(
          new Position(box.position.x, box.position.y),
        );
        box.move(direction);
        this.matrix[box.position.y - 1][box.position.x] = box;
      }

      // Swap robot
      this.matrix[this.robot.position.y][this.robot.position.x] = new Empty(
        this.robot.position,
      );
      this.robot.move(direction);
      this.matrix[this.robot.position.y][this.robot.position.x] = this.robot;
    } else if (direction === Direction.DOWN) {
      // Swap boxes
      for (let i = 0; i < boxes.length; i++) {
        const box = boxes[i];
        this.matrix[box.position.y][box.position.x] = new Empty(
          new Position(box.position.x, box.position.y),
        );
        box.move(direction);
        this.matrix[box.position.y + 1][box.position.x] = box;
      }

      // Swap robot
      this.matrix[this.robot.position.y][this.robot.position.x] = new Empty(
        this.robot.position,
      );
      this.robot.move(direction);
      this.matrix[this.robot.position.y][this.robot.position.x] = this.robot;
    } else if (direction === Direction.LEFT) {
      //console.log("moveRobotAndBoxes", direction, boxes);

      // Swap boxes
      for (let i = 0; i < boxes.length; i++) {
        const box = boxes[i];
        this.matrix[box.position.y][box.position.x] = new Empty(
          new Position(box.position.x, box.position.y),
        );
        box.move(direction);
        this.matrix[box.position.y][box.position.x] = box;
      }

      // Swap robot
      this.matrix[this.robot.position.y][this.robot.position.x] = new Empty(
        new Position(this.robot.position.x, this.robot.position.y),
      );
      this.robot.move(direction);
      this.matrix[this.robot.position.y][this.robot.position.x] = this.robot;
    } else {
      //if (direction === Direction.RIGHT) {
      // Swap boxes
      for (let i = 0; i < boxes.length; i++) {
        const box = boxes[i];
        this.matrix[box.position.y][box.position.x] = new Empty(
          new Position(box.position.x, box.position.y),
        );
        box.move(direction);
        this.matrix[box.position.y][box.position.x] = box;
      }

      // Swap robot
      this.matrix[this.robot.position.y][this.robot.position.x] = new Empty(
        new Position(this.robot.position.x, this.robot.position.y),
      );
      this.robot.move(direction);
      this.matrix[this.robot.position.y][this.robot.position.x] = this.robot;
    }*/

    if (direction === Direction.RIGHT || direction === Direction.UP) {
      // boxes = boxes.reverse();
    }

    if (direction === Direction.UP) {
      boxes = boxes.sort((a, b) => a.position.y - b.position.y);
    } else if (direction === Direction.DOWN) {
      boxes = boxes.sort((a, b) => b.position.y - a.position.y);
    } else if (direction === Direction.LEFT) {
      boxes = boxes.sort((a, b) => a.position.x - b.position.x);
    } else {
      boxes = boxes.sort((a, b) => b.position.x - a.position.x);
    }

    //console.log("moveRobotAndBoxes", direction, boxes, this.robot);

    // Swap boxes
    for (let i = 0; i < boxes.length; i++) {
      const box = boxes[i];
      this.matrix[box.position.y][box.position.x] = new Empty(
        new Position(box.position.x, box.position.y),
      );
      box.move(direction);
      this.matrix[box.position.y][box.position.x] = box;
    }

    // Swap robot
    this.matrix[this.robot.position.y][this.robot.position.x] = new Empty(
      new Position(this.robot.position.x, this.robot.position.y),
    );
    this.robot.move(direction);
    this.matrix[this.robot.position.y][this.robot.position.x] = this.robot;
  }

  private getCellsFromRobotToMapLimit(direction: Direction): WarehouseObject[] {
    if (direction === Direction.UP) {
      return this.matrix
        .slice(0, this.robot.position.y)
        .map((row) => row[this.robot.position.x]);
    }

    if (direction === Direction.DOWN) {
      return this.matrix
        .slice(this.robot.position.y + 1)
        .map((row) => row[this.robot.position.x]);
    }

    if (direction === Direction.LEFT) {
      return this.matrix[this.robot.position.y]
        .slice(0, this.robot.position.x);
    }

    return this.matrix[this.robot.position.y]
      .slice(this.robot.position.x + 1);
  }

  private canRobotMove(direction: Direction): boolean {
    const possiblePlaces: WarehouseObject[] = this
      .getCellsFromRobotToMapLimit(direction);

    if (direction === Direction.UP) {
      // Has at least one empty cell above before a wall

      const firstEmpty: number = possiblePlaces.findLastIndex((place) =>
        place instanceof Empty
      );

      const firstWall: number = possiblePlaces.findLastIndex((place) =>
        place instanceof Wall
      );

      /*console.log(
        "canRobotMove",
        possiblePlaces,
        direction,
        "firstEmpty",
        firstEmpty,
        "firstWall",
        firstWall,
        "canMove",
        firstEmpty >= 0 && firstEmpty > firstWall,
      );*/

      return firstEmpty >= 0 && firstEmpty > firstWall;
    }

    if (direction === Direction.DOWN) {
      // Has at least one empty cell below before a wall

      const firstEmpty: number = possiblePlaces.findIndex((place) =>
        place instanceof Empty
      );

      const firstWall: number = possiblePlaces.findIndex((place) =>
        place instanceof Wall
      );

      /*console.log(
        "canRobotMove",
        possiblePlaces,
        direction,
        "firstEmpty",
        firstEmpty,
        "firstWall",
        firstWall,
        "canMove",
        firstEmpty >= 0 && firstEmpty < firstWall,
      );*/

      return firstEmpty >= 0 && firstEmpty < firstWall;
    }

    if (direction === Direction.LEFT) {
      // Has at least one empty cell on the left before a wall

      const firstEmpty: number = possiblePlaces.findLastIndex((place) =>
        place instanceof Empty
      );

      const firstWall: number = possiblePlaces.findLastIndex((place) =>
        place instanceof Wall
      );

      /*console.log(
        "canRobotMove",
        possiblePlaces,
        direction,
        "firstEmpty",
        firstEmpty,
        "firstWall",
        firstWall,
        "canMove",
        firstEmpty >= 0 &&firstEmpty > firstWall,
      );*/

      return firstEmpty >= 0 && firstEmpty > firstWall;
    }

    // if (direction === Direction.RIGHT) {
    // Has at least one empty cell on the right before a wall

    const firstEmpty: number = possiblePlaces.findIndex((place) =>
      place instanceof Empty
    );

    const firstWall: number = possiblePlaces.findIndex((place) =>
      place instanceof Wall
    );

    /*console.log(
      "canRobotMove",
      possiblePlaces,
      direction,
      "firstEmpty",
      firstEmpty,
      "firstWall",
      firstWall,
      "canMove",
      firstEmpty >= 0 && firstEmpty < firstWall,
    );*/

    return firstEmpty >= 0 && firstEmpty < firstWall;
  }

  private getBoxesToMove(direction: Direction): Box[] {
    const boxes: Box[] = [];

    const possiblePlaces: WarehouseObject[] = this
      .getCellsFromRobotToMapLimit(direction);

    if (direction === Direction.UP) {
      // Get all boxes directly above the robot
      for (let i = possiblePlaces.length - 1; i >= 0; i--) {
        if (possiblePlaces[i] instanceof Box) {
          boxes.push(possiblePlaces[i] as Box);
        } else {
          break;
        }
      }
    }

    if (direction === Direction.DOWN) {
      // Get all boxes directly below the robot
      for (let i = 0; i < possiblePlaces.length; i++) {
        if (possiblePlaces[i] instanceof Box) {
          boxes.push(possiblePlaces[i] as Box);
        } else {
          break;
        }
      }
    }

    if (direction === Direction.LEFT) {
      // Get all boxes directly on the left of the robot
      for (let i = possiblePlaces.length - 1; i >= 0; i--) {
        if (possiblePlaces[i] instanceof Box) {
          boxes.push(possiblePlaces[i] as Box);
        } else {
          break;
        }
      }
    }

    if (direction === Direction.RIGHT) {
      // Get all boxes directly on the right of the robot
      for (let i = 0; i < possiblePlaces.length; i++) {
        if (possiblePlaces[i] instanceof Box) {
          boxes.push(possiblePlaces[i] as Box);
        } else {
          break;
        }
      }
    }

    return boxes;
  }

  toString(): string {
    let result = "";
    for (let i = 0; i < this.matrix.length; i++) {
      for (let j = 0; j < this.matrix[i].length; j++) {
        result += this.matrix[i][j].toString();
      }
      result += "\n";
    }
    return result;
  }
}
