let registerA = 0;
let registerB = 0;
let registerC = 0;
let pointer = 0;

export function day17part1(): string {
  const inputRaw: string = Deno.readTextFileSync(
    "./day/17/input/input.txt",
  );

  let program: string[] = [];

  for (const line of inputRaw.split("\n")) {
    if (line === "") {
      continue;
    }

    if (line.startsWith("Register A:")) {
      registerA = Number.parseInt(line.split(" ")[2]);
    } else if (line.startsWith("Register B:")) {
      registerB = Number.parseInt(line.split(" ")[2]);
    } else if (line.startsWith("Register C:")) {
      registerC = Number.parseInt(line.split(" ")[2]);
    } else if (line.startsWith("Program:")) {
      program = line.split(" ")[1].split(",");
    }
  }

  //console.log(registerA, registerB, registerC, program);

  const output: string[] = [];

  while (pointer < program.length) {
    const opcode: string = program[pointer];
    const operand: string = program[pointer + 1];

    const combo: number = getComboFromOperand(operand);

    /*console.log(
      "code",
      opcode,
      "operand",
      operand,
      "combo",
      combo,
      "reg A",
      registerA,
      "reg B",
      registerB,
      "reg C",
      registerC,
      "pointer",
      pointer,
    );*/
    output.push(executeOperation(opcode, Number.parseInt(operand), combo));
  }

  //console.log(output);
  return output.filter((o) => o.length > 0).join(",");
}

function getComboFromOperand(operand: string): number {
  if (
    operand === "0" || operand === "1" || operand === "2" || operand === "3"
  ) {
    return Number.parseInt(operand);
  }

  if (operand === "4") {
    return registerA;
  }

  if (operand === "5") {
    return registerB;
  }

  if (operand === "6") {
    return registerC;
  }

  throw new Error(`Invalid operand: ${operand}`);
}

function executeOperation(
  opcode: string,
  operand: number,
  combo: number,
): string {
  if (opcode === "0") { // odv
    pointer += 2;
    registerA = Math.floor(registerA / (2 ** combo));
  } else if (opcode === "1") { // bxl
    pointer += 2;
    //const oldRegisterB: number = registerB;
    registerB = xor(operand, registerB);
    //console.log("bxl", operand, "xor reg B into B", oldRegisterB, registerB);
  } else if (opcode === "2") { // bst
    pointer += 2;
    registerB = combo % 8;
    //console.log("bst", combo, "module 8 = reg B ", registerB);
  } else if (opcode === "3") { // jnz
    if (registerA === 0) {
      pointer += 2;
    } else {
      pointer = operand;
    }
  } else if (opcode === "4") { // bxc
    pointer += 2;
    registerB = xor(registerB, registerC);
  } else if (opcode === "5") { // out
    pointer += 2;
    //console.log("out", combo, combo % 8);
    return (combo % 8).toString();
  } else if (opcode === "6") { // bdv
    pointer += 2;
    registerB = Math.floor(registerA / (2 ** combo));
  } else if (opcode === "7") { // cdv
    pointer += 2;
    registerC = Math.floor(registerA / (2 ** combo));
    /*console.log(
      "cdv",
      registerA,
      "reg A div by 2 ** value into reg C",
      combo,
      2 ** combo,
      registerC,
    );*/
  } else {
    throw new Error(`Invalid opcode: ${opcode}`);
  }

  return "";
}

function xor(a: number, b: number): number {
  return a ^ b;
}
