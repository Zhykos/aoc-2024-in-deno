export function day8part1(): number {
  const inputRaw: string = Deno.readTextFileSync(
    "./day/8/input/input.txt",
  );

  const mapPuzzle = new MapPuzzle([]);

  const lines: string[] = inputRaw.split("\n");

  for (let line = 0; line < lines.length; line++) {
    if (lines[line] === "") {
      continue;
    }

    const maxtrixLine: MapObject[] = [];
    mapPuzzle.matrix.push(maxtrixLine);

    for (let column = 0; column < lines[line].length; column++) {
      const char = lines[line][column];

      if (char === ".") {
        maxtrixLine.push(new Empty([line, column]));
      } else {
        maxtrixLine.push(new Antenna(char, [line, column]));
      }
    }
  }

  //console.log(mapPuzzle.display());

  // Find antinodes

  const frequenciesMap: Map<string, Antenna[]> = new Map();

  for (
    const antenna of mapPuzzle.matrix.flat().filter((x) => x instanceof Antenna)
  ) {
    let antennas: Antenna[] | undefined = frequenciesMap.get(antenna.frequency);

    if (!antennas) {
      antennas = [];
      frequenciesMap.set(antenna.frequency, antennas);
    }

    antennas.push(antenna);
  }

  for (const frequencyEntry of frequenciesMap) {
    const antennas: Antenna[] = frequencyEntry[1];

    for (let i = 0; i < antennas.length; i++) {
      for (let j = 0; j < antennas.length; j++) {
        if (i === j) {
          continue;
        }

        const locationDiff = [
          antennas[i].location[0] - antennas[j].location[0],
          antennas[i].location[1] - antennas[j].location[1],
        ];

        const antinodeLocation: Location = [
          antennas[i].location[0] + locationDiff[0],
          antennas[i].location[1] + locationDiff[1],
        ];

        if (
          antinodeLocation[0] < 0 ||
          antinodeLocation[1] < 0 ||
          antinodeLocation[0] >= mapPuzzle.matrix.length ||
          antinodeLocation[1] >= mapPuzzle.matrix[0].length
        ) {
          continue;
        }

        if (
          mapPuzzle.matrix[antinodeLocation[0]][antinodeLocation[1]] instanceof
            Antenna
        ) {
          (mapPuzzle
            .matrix[antinodeLocation[0]][antinodeLocation[1]] as Antenna)
            .hasAntinode = true;
        } else {
          mapPuzzle.matrix[antinodeLocation[0]][antinodeLocation[1]] =
            new Antinode(
              antinodeLocation,
            );
        }
      }
    }
  }

  //console.log(mapPuzzle.display());

  return mapPuzzle.matrix.flat().filter((x) => x instanceof Antinode).length +
    mapPuzzle.matrix.flat().filter((x) => x instanceof Antenna).filter((x) =>
      (x as Antenna).hasAntinode
    ).length;
}

class MapPuzzle {
  constructor(public matrix: MapObject[][]) {}

  display(): string {
    let result = "";

    for (const line of this.matrix) {
      for (const cell of line) {
        if (cell instanceof Empty) {
          result += ".";
        } else if (cell instanceof Antenna) {
          result += cell.frequency;
        } else if (cell instanceof Antinode) {
          result += "#";
        }
      }

      result += "\n";
    }

    return result;
  }
}

type Location = [number, number];

abstract class MapObject {
  constructor(public location: Location) {}
}

class Antenna extends MapObject {
  hasAntinode = false;

  constructor(public frequency: string, location: Location) {
    super(location);
  }
}

class Antinode extends MapObject {
}

class Empty extends MapObject {
}
