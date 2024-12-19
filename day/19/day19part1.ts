export function day19part1(): number {
  const inputRaw: string = Deno.readTextFileSync(
    "./day/19/input/input.txt",
  );

  const towels: string[] = [];
  const designs: string[] = [];

  let maxDesignLength = Number.MIN_SAFE_INTEGER;

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
      maxDesignLength = Math.max(maxDesignLength, line.length);
    }
  }

  const cache = new Map<string, boolean>();
  return designs.filter((design) => {
    cache.clear();
    return canBeMade(design, towels, maxDesignLength, cache);
  })
    .length;
}

function canBeMade(
  wantedDesign: string,
  towels: string[],
  maxDesignLength: number,
  cache: Map<string, boolean>,
): boolean {
  //console.log("canBeMade", wantedDesign);
  return towels.map((towel) => {
    if (wantedDesign.includes(towel)) {
      if (cache.has(towel)) {
        return cache.get(towel) as boolean;
      }

      return canBeMadeWith(
        towel,
        wantedDesign,
        //towels.filter((x) => x !== towel),
        towels,
        maxDesignLength,
        cache,
      );
    }
    return false;
  }).reduce((acc, curr) => acc || curr, false);
}

function canBeMadeWith(
  pattern: string,
  wantedDesign: string,
  remainingTowels: string[],
  maxDesignLength: number,
  cache: Map<string, boolean>,
): boolean {
  if (pattern.length > maxDesignLength) {
    cache.set(pattern, false);
    return false;
  }

  //console.log("canBeMadeWith", pattern, wantedDesign, remainingTowels);
  return remainingTowels.map((towel) => {
    if (pattern + towel === wantedDesign || towel + pattern === wantedDesign) {
      cache.set(pattern, true); // Well...
      return true;
    }

    if (wantedDesign.includes(pattern + towel)) {
      if (cache.has(pattern + towel)) {
        return cache.get(pattern + towel) as boolean;
      }

      return canBeMadeWith(
        pattern + towel,
        wantedDesign,
        //remainingTowels.filter((x) => x !== towel),
        remainingTowels,
        maxDesignLength,
        cache,
      );
    }

    if (wantedDesign.includes(towel + pattern)) {
      if (cache.has(towel + pattern)) {
        return cache.get(towel + pattern) as boolean;
      }

      return canBeMadeWith(
        towel + pattern,
        wantedDesign,
        //remainingTowels.filter((x) => x !== towel),
        remainingTowels,
        maxDesignLength,
        cache,
      );
    }

    cache.set(pattern, false);
    return false;
  }).reduce((acc, curr) => acc || curr, false);
}

/*function generateDesigns(towels: string[], maxDesignLength: number): string[] {
  console.log("generateDesigns", towels, maxDesignLength);
  const designs = new Set<string>();

  // Towels can be used multiple times

  const severalTowels: string[] = [];
  for (let i = 0; i < 3; i++) { // 3 is arbitrary
    severalTowels.push(...towels);
  }

  for (let i = 0; i < severalTowels.length; i++) {
    for (let j = 0; j < severalTowels.length; j++) {
      const design: string = severalTowels[i] + severalTowels[j];
      if (design.length <= maxDesignLength) {
        designs.add(design);
      }
    }
  }

  return Array.from(designs);
}*/
