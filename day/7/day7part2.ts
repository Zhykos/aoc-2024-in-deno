export function day7part2(): number {
  const inputRaw: string = Deno.readTextFileSync(
    "./day/7/input/input.txt",
  );

  const equations: Equation[] = [];

  for (const line of inputRaw.split("\n")) {
    if (line === "") {
      continue;
    }

    const split: string[] = line.split(":");
    const equation = new Equation(
      Number.parseInt(split[0].trim()),
      split[1].trim().split(" ").map((x) => Number.parseInt(x.trim())),
    );
    equations.push(equation);
  }

  return equations
    .filter((equation) => equation.canBeSolved())
    .map((equation) => equation.total)
    .reduce((acc, curr) => acc + curr, 0);
}

class Equation {
  constructor(public total: number, public operands: number[]) {}

  canBeSolved(): boolean {
    const combinaisons: string[][] = this.generateCombinations(
      this.operands.length - 1,
    );

    for (const combinaison of combinaisons) {
      let totalTest = this.operands[0];

      for (let i = 1; i < this.operands.length; i++) {
        if (combinaison[i - 1] === "+") {
          totalTest = totalTest + this.operands[i];
        } else if (combinaison[i - 1] === "*") {
          totalTest = totalTest * this.operands[i];
        } else if (combinaison[i - 1] === "||") {
          totalTest = Number.parseInt(
            totalTest.toString() + this.operands[i].toString(),
          );
        }
      }

      if (totalTest === this.total) {
        return true;
      }
    }

    return false;
  }

  private generateCombinations(n: number): string[][] {
    const operators = ["+", "*", "||"];
    const results: string[][] = [];

    const generate = (current: string[], depth: number) => {
      if (depth === n) {
        results.push([...current]);
        return;
      }

      for (const operator of operators) {
        current.push(operator);
        generate(current, depth + 1);
        current.pop();
      }
    };

    generate([], 0);
    return results;
  }
}
