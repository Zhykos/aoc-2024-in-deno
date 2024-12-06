export function day4part1(): number {
  const inputRaw: string = Deno.readTextFileSync("./day/4/input/input.txt");

  let xmasCount = 0;

  const matrix: string[][] = [];

  for (const line of inputRaw.split("\n")) {
    if (line.length === 0) {
      continue;
    }
    matrix.push(line.split(""));
  }

  for (let line = 0; line < matrix.length; line++) {
    for (let column = 0; column < matrix[line].length; column++) {
      if (matrix[line][column] === "X") {
        if (isXmasHorizontalToRight(matrix, line, column)) {
          xmasCount++;
        }
        if (isXmasHorizontalToLeft(matrix, line, column)) {
          xmasCount++;
        }
        if (isXmasVerticalDown(matrix, line, column)) {
          xmasCount++;
        }
        if (isXmasVerticalUp(matrix, line, column)) {
          xmasCount++;
        }
        if (isXmasDiagonalDownRight(matrix, line, column)) {
          xmasCount++;
        }
        if (isXmasDiagonalDownLeft(matrix, line, column)) {
          xmasCount++;
        }
        if (isXmasDiagonalUpRight(matrix, line, column)) {
          xmasCount++;
        }
        if (isXmasDiagonalUpLeft(matrix, line, column)) {
          xmasCount++;
        }
      }
    }
  }

  function isXmasHorizontalToRight(
    matrix: string[][],
    line: number,
    column: number,
  ): boolean {
    if (column + 3 > matrix[line].length) {
      return false;
    }

    return matrix[line][column] === "X" && matrix[line][column + 1] === "M" &&
      matrix[line][column + 2] === "A" && matrix[line][column + 3] === "S";
  }

  function isXmasHorizontalToLeft(
    matrix: string[][],
    line: number,
    column: number,
  ): boolean {
    if (column - 3 < 0) {
      return false;
    }

    return matrix[line][column] === "X" && matrix[line][column - 1] === "M" &&
      matrix[line][column - 2] === "A" && matrix[line][column - 3] === "S";
  }

  function isXmasVerticalDown(
    matrix: string[][],
    line: number,
    column: number,
  ): boolean {
    if (line + 3 >= matrix.length) {
      return false;
    }

    return matrix[line][column] === "X" && matrix[line + 1][column] === "M" &&
      matrix[line + 2][column] === "A" && matrix[line + 3][column] === "S";
  }

  function isXmasVerticalUp(
    matrix: string[][],
    line: number,
    column: number,
  ): boolean {
    if (line - 3 < 0) {
      return false;
    }

    return matrix[line][column] === "X" && matrix[line - 1][column] === "M" &&
      matrix[line - 2][column] === "A" && matrix[line - 3][column] === "S";
  }

  function isXmasDiagonalDownRight(
    matrix: string[][],
    line: number,
    column: number,
  ): boolean {
    if (line + 3 > matrix.length || column + 3 > matrix[line].length) {
      return false;
    }

    return matrix[line][column] === "X" &&
      matrix[line + 1][column + 1] === "M" &&
      matrix[line + 2][column + 2] === "A" &&
      matrix[line + 3][column + 3] === "S";
  }

  function isXmasDiagonalDownLeft(
    matrix: string[][],
    line: number,
    column: number,
  ): boolean {
    if (line + 3 >= matrix.length || column - 3 < 0) {
      return false;
    }

    return matrix[line][column] === "X" &&
      matrix[line + 1][column - 1] === "M" &&
      matrix[line + 2][column - 2] === "A" &&
      matrix[line + 3][column - 3] === "S";
  }

  function isXmasDiagonalUpRight(
    matrix: string[][],
    line: number,
    column: number,
  ): boolean {
    if (line - 3 < 0 || column + 3 > matrix[line].length) {
      return false;
    }

    return matrix[line][column] === "X" &&
      matrix[line - 1][column + 1] === "M" &&
      matrix[line - 2][column + 2] === "A" &&
      matrix[line - 3][column + 3] === "S";
  }

  function isXmasDiagonalUpLeft(
    matrix: string[][],
    line: number,
    column: number,
  ): boolean {
    if (line - 3 < 0 || column - 3 < 0) {
      return false;
    }

    return matrix[line][column] === "X" &&
      matrix[line - 1][column - 1] === "M" &&
      matrix[line - 2][column - 2] === "A" &&
      matrix[line - 3][column - 3] === "S";
  }

  return xmasCount;
}
