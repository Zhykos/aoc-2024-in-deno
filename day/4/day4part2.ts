export function day4part2(): number {
  const inputRaw: string = Deno.readTextFileSync("./day/4/input/input.txt");

  let xmasCount = 0;

  const matrix: string[][] = [];

  for (const line of inputRaw.split("\n")) {
    if (line.length === 0) {
      continue;
    }
    matrix.push(line.split(""));
  }

  /*
1.2
.3.
4.5

1.2
.A.
4.5
=> 1 and 5 cannot be the same (M or S)
=> 2 and 4 cannot be the same (M or S)
  */

  for (let line = 0; line < matrix.length; line++) {
    for (let column = 0; column < matrix[line].length; column++) {
      try {
        const cross1 = matrix[line][column];
        const cross2 = matrix[line][column + 2];
        const cross3 = matrix[line + 1][column + 1];
        const cross4 = matrix[line + 2][column];
        const cross5 = matrix[line + 2][column + 2];

        if (cross3 === "A") {
          if (
            (cross1 === "M" && cross2 === "M" && cross4 === "S" &&
              cross5 === "S") ||
            (cross1 === "S" && cross2 === "S" && cross4 === "M" &&
              cross5 === "M") ||
            (cross1 === "S" && cross2 === "M" && cross4 === "S" &&
              cross5 === "M") ||
            (cross1 === "M" && cross2 === "S" && cross4 === "M" &&
              cross5 === "S")
          ) {
            xmasCount++;
          }
        }
      } catch (_) {
        //continue
      }
    }
  }

  return xmasCount;
}
