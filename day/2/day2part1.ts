type Level = {
  value: number;
};

class Report {
  levels: Level[] = [];

  isSafe(): boolean {
    return (this.areAllLevelsDecrease() ||
      this.areAllLevelsIncrease()) && this.areMaxDifferenceLessThan3();
  }

  private areAllLevelsIncrease(): boolean {
    for (let i = 1; i < this.levels.length; i++) {
      if (this.levels[i - 1].value > this.levels[i].value) {
        return false;
      }
    }
    return true;
  }

  private areAllLevelsDecrease(): boolean {
    for (let i = 1; i < this.levels.length; i++) {
      if (this.levels[i - 1].value < this.levels[i].value) {
        return false;
      }
    }
    return true;
  }

  private areMaxDifferenceLessThan3(): boolean {
    for (let i = 1; i < this.levels.length; i++) {
      const diff: number = Math.abs(
        this.levels[i].value - this.levels[i - 1].value,
      );
      if (diff > 3 || diff === 0) {
        return false;
      }
    }
    return true;
  }
}

export function day2part1(): number {
  const inputRaw: string = Deno.readTextFileSync("./day/2/input/input.txt");

  const reports: Report[] = [];

  for (const line of inputRaw.split("\n")) {
    if (line.length === 0) {
      continue;
    }

    const lineSplit: string[] = line.split(/ +/);

    const report = new Report();
    reports.push(report);

    for (const level of lineSplit) {
      report.levels.push({ value: Number.parseInt(level) });
    }
  }

  return reports.filter((report) => report.isSafe()).length;
}
