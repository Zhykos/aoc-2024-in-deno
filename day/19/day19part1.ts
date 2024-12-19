export function day19part1(): number {
  const inputRaw: string = Deno.readTextFileSync(
    "./day/19/input/input.txt",
  );

  const towels: string[] = [];
  const designs: string[] = [];

  for (const line of inputRaw.split("\n")) {
    if (line === "") {
      continue;
    }

    if (line.includes(",")) {
      for (const towel of line.split(",")) {
        towels.push(towel.trim());
      }
    } else {
      designs.push(line);
    }
  }

  //console.log(towels);
  //console.log(designs);

  return designs.filter((design) => canBeMade(design, towels)).length;
}

function canBeMade(wantedDesign: string, towels: string[]): boolean {
  console.log("canBeMade", wantedDesign);
  return towels.map((towel) => {
    if (wantedDesign.includes(towel)) {
      return canBeMadeWith(
        towel,
        wantedDesign,
        //towels.filter((x) => x !== towel),
        towels,
      );
    }
    return false;
  }).reduce((acc, curr) => acc || curr, false);
}

function canBeMadeWith(
  pattern: string,
  wantedDesign: string,
  remainingTowels: string[],
): boolean {
  //console.log("canBeMadeWith", pattern, wantedDesign, remainingTowels);
  return remainingTowels.map((towel) => {
    if (pattern + towel === wantedDesign || towel + pattern === wantedDesign) {
      return true;
    }

    if (wantedDesign.includes(pattern + towel)) {
      return canBeMadeWith(
        pattern + towel,
        wantedDesign,
        //remainingTowels.filter((x) => x !== towel),
        remainingTowels,
      );
    }

    if (wantedDesign.includes(towel + pattern)) {
      return canBeMadeWith(
        towel + pattern,
        wantedDesign,
        //remainingTowels.filter((x) => x !== towel),
        remainingTowels,
      );
    }

    return false;
  }).reduce((acc, curr) => acc || curr, false);
}
