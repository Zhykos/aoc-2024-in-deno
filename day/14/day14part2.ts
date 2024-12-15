export function day14part2(): number {
  const inputRaw: string = Deno.readTextFileSync(
    "./day/14/input/input.txt",
  );

  const tailsWide = 101;
  const tailsTall = 103;

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
      Number.parseInt(regex[3]),
      Number.parseInt(regex[4]),
    );
    robots.push(robot);
  }

  try {
    Deno.removeSync("./day/14/output/", { recursive: true });
  } catch (err) {
    if (!(err instanceof Deno.errors.NotFound)) {
      throw err;
    }
  }

  try {
    Deno.mkdirSync("./day/14/output/");
  } catch (err) {
    if (!(err instanceof Deno.errors.AlreadyExists)) {
      throw err;
    }
  }

  for (let i = 0; i < 10_000; i++) {
    const text: string = display(tailsWide, tailsTall, robots);
    if (text.includes("#########")) {
      Deno.writeTextFileSync(`./day/14/output/output-${i}.txt`, text);
      return i;
    }
    simulate(tailsWide, tailsTall, robots);
  }

  return -1;
}

class Robot {
  constructor(
    public x: number,
    public y: number,
    public moveX: number,
    public moveY: number,
  ) {}
}

function simulate(tailsWide: number, tailsTall: number, robots: Robot[]): void {
  for (const robot of robots) {
    robot.x += robot.moveX;

    if (robot.x < 0) {
      robot.x += tailsWide;
    } else if (robot.x >= tailsWide) {
      robot.x -= tailsWide;
    }

    robot.y += robot.moveY;

    if (robot.y < 0) {
      robot.y += tailsTall;
    } else if (robot.y >= tailsTall) {
      robot.y -= tailsTall;
    }
  }
}

function display(
  tailsWide: number,
  tailsTall: number,
  robots: Robot[],
): string {
  let text = "";

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

    text += `${line}\n`;
  }

  return text;
}
