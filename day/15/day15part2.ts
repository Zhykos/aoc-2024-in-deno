import { distinctBy } from "@std/collections/distinct-by";

export function day15part2(): number {
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

      for (let j = 0, x = 0; j < line.length; j++, x += 2) {
        const char = line[j];

        const position1 = new Position(x, i);
        const position2 = new Position(x + 1, i);

        if (char === "O") {
          const boxLeftPart = new BoxLeftPart(position1);
          const boxRightPart = new BoxRightPart(position2);
          boxLeftPart.rightPart = boxRightPart;
          boxRightPart.leftPart = boxLeftPart;
          warehouseObjects.push(boxLeftPart);
          warehouseObjects.push(boxRightPart);
        } else if (char === "@") {
          robot = new Robot(position1);
          warehouseObjects.push(robot);
          warehouseObjects.push(new Empty(position2));
        } else if (char === "#") {
          warehouseObjects.push(new Wall(position1));
          warehouseObjects.push(new Wall(position2));
        } else {
          warehouseObjects.push(new Empty(position1));
          warehouseObjects.push(new Empty(position2));
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
  }

  //console.log("FINISH", "\n", map.toString());

  return map.matrix
    .flat()
    .filter((object) => object instanceof BoxLeftPart)
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

class Box {
  constructor(public left: BoxLeftPart, public right: BoxRightPart) {}

  get position(): Position {
    return this.left.position;
  }

  move(direction: Direction): void {
    this.left.move(direction);
    this.right.move(direction);
  }

  toJSONstr(): string {
    return `Box { left: ${this.left.position.x}, ${this.left.position.y}, right: ${this.right.position.x}, ${this.right.position.y} }`;
  }
}

class BoxLeftPart extends WarehouseObject {
  public rightPart: BoxRightPart | null = null;

  override toString(): string {
    return "[";
  }

  get box(): Box {
    return new Box(this, this.rightPart as BoxRightPart);
  }

  gpsScore(): number {
    return this.position.x + (100 * this.position.y);
  }
}

class BoxRightPart extends WarehouseObject {
  public leftPart: BoxLeftPart | null = null;

  override toString(): string {
    return "]";
  }

  get box(): Box {
    return new Box(this.leftPart as BoxLeftPart, this);
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

    if (direction === Direction.UP) {
      boxes = boxes.sort((a, b) => a.position.y - b.position.y);
    } else if (direction === Direction.DOWN) {
      boxes = boxes.sort((a, b) => b.position.y - a.position.y);
    } else if (direction === Direction.LEFT) {
      boxes = boxes.sort((a, b) => a.position.x - b.position.x);
    } else {
      boxes = boxes.sort((a, b) => b.position.x - a.position.x);
    }

    /*console.log(
      "moveRobotAndBoxes",
      direction,
      boxes.map((b) => b.toJSONstr()),
      this.robot,
    );*/

    // Swap boxes
    for (let i = 0; i < boxes.length; i++) {
      const box: Box = boxes[i];
      this.matrix[box.left.position.y][box.left.position.x] = new Empty(
        new Position(box.left.position.x, box.left.position.y),
      );
      this.matrix[box.right.position.y][box.right.position.x] = new Empty(
        new Position(box.right.position.x, box.right.position.y),
      );
      box.move(direction);
      this.matrix[box.left.position.y][box.left.position.x] = box.left;
      this.matrix[box.right.position.y][box.right.position.x] = box.right;
    }

    // Swap robot
    this.matrix[this.robot.position.y][this.robot.position.x] = new Empty(
      new Position(this.robot.position.x, this.robot.position.y),
    );
    this.robot.move(direction);
    this.matrix[this.robot.position.y][this.robot.position.x] = this.robot;
  }

  private getHorizontalCellsFromRobotToMapLimit(
    direction: Direction,
  ): WarehouseObject[] {
    /*if (direction === Direction.UP) {
      return this.matrix
        .slice(0, this.robot.position.y)
        .map((row) => row[this.robot.position.x]);
    }

    if (direction === Direction.DOWN) {
      return this.matrix
        .slice(this.robot.position.y + 1)
        .map((row) => row[this.robot.position.x]);
    }*/

    if (direction === Direction.LEFT) {
      return this.matrix[this.robot.position.y]
        .slice(0, this.robot.position.x);
    }

    return this.matrix[this.robot.position.y]
      .slice(this.robot.position.x + 1);
  }

  private canRobotMove(direction: Direction): boolean {
    if (direction === Direction.UP) {
      if (
        this.matrix[this.robot.position.y - 1][this.robot.position.x] instanceof
          Empty
      ) {
        return true;
      }

      if (
        this.matrix[this.robot.position.y - 1][this.robot.position.x] instanceof
          Wall
      ) {
        return false;
      }

      // Check if all upper boxes can be moved up
      const boxes: Box[] = [];
      this.getBoxesToMoveUp(
        new Position(this.robot.position.x, this.robot.position.y - 1),
        boxes,
      );

      for (const box of boxes) {
        if (
          this.matrix[box.left.position.y - 1][box.left.position.x] instanceof
            Wall ||
          this.matrix[box.right.position.y - 1][box.right.position.x] instanceof
            Wall
        ) {
          /*console.log(
            "canRobotMove",
            direction,
            false,
            boxes.map((b) => b.toJSONstr()),
          );*/
          return false;
        }
      }

      /*console.log(
        "canRobotMove",
        direction,
        true,
        boxes.map((b) => b.toJSONstr()),
      );*/
      return true;
    }

    if (direction === Direction.DOWN) {
      if (
        this.matrix[this.robot.position.y + 1][this.robot.position.x] instanceof
          Empty
      ) {
        return true;
      }

      if (
        this.matrix[this.robot.position.y + 1][this.robot.position.x] instanceof
          Wall
      ) {
        return false;
      }

      // Check if all lower boxes can be moved down
      const boxes: Box[] = [];
      this.getBoxesToMoveDown(
        new Position(this.robot.position.x, this.robot.position.y + 1),
        boxes,
      );

      for (const box of boxes) {
        if (
          this.matrix[box.right.position.y + 1][box.right.position.x] instanceof
            Wall ||
          this.matrix[box.left.position.y + 1][box.left.position.x] instanceof
            Wall
        ) {
          return false;
        }
      }

      return true;
    }

    if (direction === Direction.LEFT) {
      // Has at least one empty cell on the left before a wall

      const possiblePlaces: WarehouseObject[] = this
        .getHorizontalCellsFromRobotToMapLimit(direction);

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

    const possiblePlaces: WarehouseObject[] = this
      .getHorizontalCellsFromRobotToMapLimit(direction);

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

  private getBoxesToMoveUp(position: Position, boxesToMove: Box[]): void {
    const obj: WarehouseObject = this.matrix[position.y][position.x];

    if (obj instanceof BoxLeftPart) {
      const box: Box = obj.box;
      boxesToMove.push(box);

      if (box.left.position.y > 0) {
        this.getBoxesToMoveUp(
          new Position(box.left.position.x, box.left.position.y - 1),
          boxesToMove,
        );
        this.getBoxesToMoveUp(
          new Position(box.right.position.x, box.right.position.y - 1),
          boxesToMove,
        );
      }
    } else if (obj instanceof BoxRightPart) {
      const box: Box = obj.box;
      boxesToMove.push(box);

      if (box.left.position.y > 0) {
        this.getBoxesToMoveUp(
          new Position(box.left.position.x, box.left.position.y - 1),
          boxesToMove,
        );
        this.getBoxesToMoveUp(
          new Position(box.right.position.x, box.right.position.y - 1),
          boxesToMove,
        );
      }
    }
  }

  private getBoxesToMoveDown(position: Position, boxesToMove: Box[]): void {
    const obj: WarehouseObject = this.matrix[position.y][position.x];

    if (obj instanceof BoxLeftPart) {
      const box: Box = obj.box;
      boxesToMove.push(box);

      if (box.right.position.y < this.matrix.length - 1) {
        this.getBoxesToMoveDown(
          new Position(box.left.position.x, box.left.position.y + 1),
          boxesToMove,
        );
        this.getBoxesToMoveDown(
          new Position(box.right.position.x, box.right.position.y + 1),
          boxesToMove,
        );
      }
    } else if (obj instanceof BoxRightPart) {
      const box: Box = obj.box;
      boxesToMove.push(box);

      if (box.right.position.y < this.matrix.length - 1) {
        this.getBoxesToMoveDown(
          new Position(box.left.position.x, box.left.position.y + 1),
          boxesToMove,
        );
        this.getBoxesToMoveDown(
          new Position(box.right.position.x, box.right.position.y + 1),
          boxesToMove,
        );
      }
    }
  }

  private getBoxesToMove(direction: Direction): Box[] {
    const boxes: Box[] = [];

    if (direction === Direction.UP) {
      // Get all boxes that can be moved up due to the new size of boxes
      this.getBoxesToMoveUp(
        new Position(this.robot.position.x, this.robot.position.y - 1),
        boxes,
      );
    }

    if (direction === Direction.DOWN) {
      // Get all boxes that can be moved down due to the new size of boxes
      this.getBoxesToMoveDown(
        new Position(this.robot.position.x, this.robot.position.y + 1),
        boxes,
      );
    }

    if (direction === Direction.LEFT) {
      // Get all boxes directly on the left of the robot
      const possiblePlaces: WarehouseObject[] = this
        .getHorizontalCellsFromRobotToMapLimit(direction);

      for (let i = possiblePlaces.length - 1; i >= 0; i--) {
        const place: WarehouseObject = possiblePlaces[i];
        if (place instanceof BoxLeftPart || place instanceof BoxRightPart) {
          boxes.push(place.box);
        } else {
          break;
        }
      }
    }

    if (direction === Direction.RIGHT) {
      // Get all boxes directly on the right of the robot
      const possiblePlaces: WarehouseObject[] = this
        .getHorizontalCellsFromRobotToMapLimit(direction);

      for (let i = 0; i < possiblePlaces.length; i++) {
        const place: WarehouseObject = possiblePlaces[i];
        if (place instanceof BoxLeftPart || place instanceof BoxRightPart) {
          boxes.push(place.box);
        } else {
          break;
        }
      }
    }

    const cleanBoxes: Box[] = distinctBy(boxes, (box) => box.left.position);
    /*console.log(
      "getBoxesToMove",
      direction,
      boxes.map((b) => b.toJSONstr()),
      cleanBoxes.map((b) => b.toJSONstr()),
    );*/
    return cleanBoxes;
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
