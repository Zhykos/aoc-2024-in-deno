export function day14part1mini(): number {
  const inputRaw: string = Deno.readTextFileSync(
    "./day/14/input/mini-input.txt",
  );

  const tailsWide = 11;
  const tailsTall = 7;
  const secondsSimulation = 100;

  const robots: Robot[] = [];

  const lines: string[] = inputRaw.split("\n");
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    if (line === "") {
      continue;
    }

    const regex: RegExpExecArray | null = /p=(\d+),(\d+) v=(-?\d+),(-?\d+)/
      .exec(line);
    if (regex === null) {
      throw new Error("Invalid input robot");
    }

    const robot = new Robot(
      Number.parseInt(regex[1]),
      Number.parseInt(regex[2]),
      (Number.parseInt(regex[3]) + tailsWide) % tailsWide,
      (Number.parseInt(regex[4]) + tailsTall) % tailsTall,
    );
    robots.push(robot);
  }

  for (const robot of robots) {
    robot.x = (robot.x + (robot.moveX * secondsSimulation)) % tailsWide;
    robot.y = (robot.y + (robot.moveY * secondsSimulation)) % tailsTall;
    console.log(robot);
  }

  for (let i = 0; i < tailsTall; i++) {
    let line = "";
    for (let j = 0; j < tailsWide; j++) {
      let isRobot = false;
      for (const robot of robots) {
        if (robot.x === j && robot.y === i) {
          isRobot = true;
          break;
        }
      }

      if (isRobot) {
        line += "#";
      } else {
        line += ".";
      }
    }
    console.log(line);
  }

  const mapXseparatation = Math.floor(tailsWide / 2);
  const mapYseparatation = Math.floor(tailsTall / 2);

  const quadranUpLeft: Robot[] = robots.filter(
    (robot) => robot.x < mapXseparatation && robot.y < mapYseparatation,
  );
  const quadranUpRight: Robot[] = robots.filter(
    (robot) => robot.x > mapXseparatation && robot.y < mapYseparatation,
  );
  const quadranDownLeft: Robot[] = robots.filter(
    (robot) => robot.x < mapXseparatation && robot.y > mapYseparatation,
  );
  const quadranDownRight: Robot[] = robots.filter(
    (robot) => robot.x > mapXseparatation && robot.y > mapYseparatation,
  );

  return quadranUpLeft.length * quadranUpRight.length * quadranDownLeft.length *
    quadranDownRight.length;
}

class Robot {
  constructor(
    public x: number,
    public y: number,
    public moveX: number,
    public moveY: number,
  ) {}
}
