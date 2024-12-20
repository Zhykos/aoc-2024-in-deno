export function day5part2(): number {
  const inputRaw: string = Deno.readTextFileSync("./day/5/input/input.txt");

  const rules: Rule[] = [];
  const updates: Update[] = [];

  for (const line of inputRaw.split("\n")) {
    if (line.length === 0) {
      continue;
    }

    if (line.includes("|")) {
      const [a, b] = line.split("|");
      rules.push(
        {
          pageXmustBeBeforeY: Number.parseInt(a),
          pageY: Number.parseInt(b),
        } satisfies Rule,
      );
    }

    if (line.includes(",")) {
      const pages: number[] = line.split(",").map((x) => Number.parseInt(x));
      updates.push(
        {
          pages,
        } satisfies Update,
      );
    }
  }

  const incorrectUpdates: Update[] = updates
    .filter((update) => !isCorrectUpdate(update, rules))
    .map((update) => sort(update, rules));

  const middle: number = incorrectUpdates.map((update) =>
    update.pages[Math.floor(update.pages.length / 2)]
  ).reduce((acc, curr) => acc + curr, 0);

  return middle;
}

type Rule = {
  pageXmustBeBeforeY: number;
  pageY: number;
};

type Update = {
  pages: number[];
};

function isCorrectUpdate(update: Update, rules: Rule[]): boolean {
  for (const rule of rules) {
    const indexX: number = update.pages.indexOf(rule.pageXmustBeBeforeY);
    const indexY: number = update.pages.indexOf(rule.pageY);
    if (indexX >= 0 && indexY >= 0 && indexX > indexY) {
      return false;
    }
  }

  return true;
}

function sort(update: Update, rules: Rule[]): Update {
  const newUpdate = { pages: [...update.pages] } satisfies Update;

  for (
    let combinaison = 0;
    combinaison < newUpdate.pages.length * newUpdate.pages.length;
    combinaison++
  ) {
    for (const rule of rules) {
      const indexX: number = newUpdate.pages.indexOf(rule.pageXmustBeBeforeY);
      const indexY: number = newUpdate.pages.indexOf(rule.pageY);
      if (indexX >= 0 && indexY >= 0) {
        if (indexX > indexY) {
          newUpdate.pages[indexX] = rule.pageY;
          newUpdate.pages[indexY] = rule.pageXmustBeBeforeY;
        }
      }
    }
  }

  return newUpdate;
}
