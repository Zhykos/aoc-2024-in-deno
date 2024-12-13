export function day13part2(): number {
  const inputRaw: string = Deno.readTextFileSync(
    "./day/13/input/input.txt",
  );

  const machines: Machine[] = [];

  const lines: string[] = inputRaw.split("\n");
  for (let i = 0; i < lines.length; i += 4) {
    const regex1: RegExpExecArray | null = /Button A: X\+(\d+), Y\+(\d+)/.exec(
      lines[i],
    );
    if (regex1 === null) {
      throw new Error("Invalid input for button A");
    }

    const buttonA = new Button({
      x: Number.parseInt(regex1[1]),
      y: Number.parseInt(regex1[2]),
    });

    const regex2: RegExpExecArray | null = /Button B: X\+(\d+), Y\+(\d+)/.exec(
      lines[i + 1],
    );
    if (regex2 === null) {
      throw new Error("Invalid input for button B");
    }

    const buttonB = new Button({
      x: Number.parseInt(regex2[1]),
      y: Number.parseInt(regex2[2]),
    });

    const regex3: RegExpExecArray | null = /Prize: X=(\d+), Y=(\d+)/.exec(
      lines[i + 2],
    );
    if (regex3 === null) {
      throw new Error("Invalid input for prize");
    }

    const prize = new Prize({
      x: Number.parseInt(regex3[1]) + 10000000000000,
      y: Number.parseInt(regex3[2]) + 10000000000000,
    });

    const machine = new Machine(buttonA, buttonB, prize);
    machines.push(machine);
    console.log(machine);
  }

  let minTokens = 0;
  for (const machine of machines) {
    // a * machine.buttonA.move.x + b * machine.buttonB.move.x = machine.prize.position.x
    // a * machine.buttonA.move.y + b * machine.buttonB.move.y = machine.prize.position.y

    const result = solveLinearEquation(
      machine.buttonA.move.x,
      machine.buttonB.move.x,
      machine.prize.position.x,
      machine.buttonA.move.y,
      machine.buttonB.move.y,
      machine.prize.position.y,
    );

    if (result !== null) {
      const { a, b } = result;
      if (Number.isInteger(a) && Number.isInteger(b)) {
        minTokens += a * 3 + b;
      }
    }
  }

  return minTokens;
}

function solveLinearEquation(
  buttonAx: number,
  buttonBx: number,
  prizeX: number,
  buttonAy: number,
  buttonBy: number,
  prizeY: number,
): { a: number; b: number } | null {
  const determinant: number = buttonAx * buttonBy - buttonAy * buttonBx;
  if (determinant === 0) {
    return null; // No unique solution
  }

  const a: number = (prizeX * buttonBy - prizeY * buttonBx) / determinant;
  const b: number = (buttonAx * prizeY - buttonAy * prizeX) / determinant;
  return { a, b };
}

class Machine {
  constructor(
    public buttonA: Button,
    public buttonB: Button,
    public prize: Prize,
  ) {}
}

class Button {
  constructor(public move: XY) {}
}

class Prize {
  constructor(public position: XY) {}
}

type XY = {
  x: number;
  y: number;
};
