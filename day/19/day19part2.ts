import { distinct } from "@std/collections/distinct";

export function day19part2(): number {
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
  return designs
    .map((design) => {
      cache.clear();
      return canBeMade(design, towels, maxDesignLength, cache);
    })
    .map((x) => distinct(x))
    .map((x) => {
      //console.log(x);
      return x.length;
    })
    .reduce((acc, curr) => acc + curr, 0);
}

function canBeMade(
  wantedDesign: string,
  towels: string[],
  maxDesignLength: number,
  cache: Map<string, boolean>,
): string[] {
  console.log("canBeMade", wantedDesign);
  return (towels.flatMap((towel) => {
    if (wantedDesign.includes(towel)) {
      if (cache.has(towel)) {
        if (cache.get(towel)) {
          return [towel];
        }
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
    return "";
  }).filter((x) => x !== ""));
}

function canBeMadeWith(
  patternParts: string,
  wantedDesign: string,
  remainingTowels: string[],
  maxDesignLength: number,
  cache: Map<string, boolean>,
): string[] {
  const result: string[] = [];

  const pattern: string = patternParts.replace(/,/g, "");
  //console.log(patternParts, pattern);

  if (pattern.length > maxDesignLength) {
    cache.set(pattern, false);
    return [];
  }

  //console.log("canBeMadeWith", pattern, wantedDesign);
  //console.log(cache);
  for (const towel of remainingTowels) {
    if (pattern + towel === wantedDesign) {
      cache.set(patternParts + "," + towel, true);
      result.push(patternParts + "," + towel);
      //return result;
      //break;
      console.log("FOUND", pattern + towel);
    }

    if (towel + pattern === wantedDesign) {
      cache.set(towel + "," + patternParts, true);
      result.push(towel + "," + patternParts);
      //return result;
      //break;
      console.log("FOUND 2", towel + pattern);
    }

    if (pattern + towel === wantedDesign || towel + pattern === wantedDesign) {
      return result;
    }

    if (wantedDesign.includes(pattern + towel)) {
      /*if (cache.has(pattern + towel)) {
        result.push(cache.get(pattern + towel) as string);
        return result;
      }*/

      if (cache.has(patternParts + "," + towel)) {
        //result.push(cache.get(pattern + towel) as string);
        if (cache.get(patternParts + "," + towel)) {
          result.push(patternParts + "," + towel);
        }
        //result.push(patternParts + "," + towel);
        //return result;
        //break;
      } else {
        result.push(...canBeMadeWith(
          patternParts + "," + towel,
          wantedDesign,
          //remainingTowels.filter((x) => x !== towel),
          remainingTowels,
          maxDesignLength,
          cache,
        ));
      }
    }

    if (wantedDesign.includes(towel + pattern)) {
      /*if (cache.has(towel + pattern)) {
        result.push(cache.get(towel + pattern) as string);
        return result;
      }*/
      if (cache.has(towel + "," + patternParts)) {
        //result.push(cache.get(towel + pattern) as string);
        //return result;
        if (cache.get(towel + "," + patternParts)) {
          result.push(towel + "," + patternParts);
        }
        //result.push(towel + "," + patternParts);
        //break;
      } else {
        result.push(...canBeMadeWith(
          towel + "," + patternParts,
          wantedDesign,
          //remainingTowels.filter((x) => x !== towel),
          remainingTowels,
          maxDesignLength,
          cache,
        ));
      }
    }
  }

  return result;
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
