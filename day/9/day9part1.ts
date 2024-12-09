export function day9part1(): number {
  const inputRaw: string = Deno.readTextFileSync(
    "./day/9/input/input.txt",
  );

  const line: string = inputRaw.split("\n")[0];

  const diskMap = new DiskMap();

  let position = 0;

  for (let index = 0; index < line.length; index++) {
    const char: string = line[index];
    if (index % 2 === 0) {
      for (let i = 0; i < Number.parseInt(char); i++) {
        diskMap.blocks.push(new FileBlock(position));
      }
      position++;
    } else {
      for (let i = 0; i < Number.parseInt(char); i++) {
        diskMap.blocks.push(new FreeSpace());
      }
    }
  }

  while (!diskMap.areAllFreeSpacesAtTheEnd()) {
    const freeSpaceIndex: number = diskMap.blocks.findIndex(
      (block) => block instanceof FreeSpace,
    );

    const fileBlockToMoveIndex: number = diskMap.blocks.findLastIndex(
      (block) => block instanceof FileBlock,
    );

    const swap: DiskBlock = diskMap.blocks[freeSpaceIndex];
    diskMap.blocks[freeSpaceIndex] = diskMap.blocks[fileBlockToMoveIndex];
    diskMap.blocks[fileBlockToMoveIndex] = swap;
  }

  let checksum = 0;
  for (let index = 0; index < diskMap.blocks.length; index++) {
    const block = diskMap.blocks[index];
    if (block instanceof FileBlock) {
      checksum += block.value * index;
    }
  }
  return checksum;
}

class DiskMap {
  blocks: DiskBlock[] = [];

  display(): string {
    let display = "";
    for (const block of this.blocks) {
      if (block instanceof FileBlock) {
        display += block.value;
      } else if (block instanceof FreeSpace) {
        display += ".";
      }
    }
    return display;
  }

  areAllFreeSpacesAtTheEnd(): boolean {
    const freeSpaceIndex: number = this.blocks.findIndex(
      (block) => block instanceof FreeSpace,
    );

    const fileBlockIndex: number = this.blocks.findLastIndex(
      (block) => block instanceof FileBlock,
    );

    return freeSpaceIndex > fileBlockIndex;
  }
}

abstract class DiskBlock {
}

class FileBlock extends DiskBlock {
  constructor(public value: number) {
    super();
  }
}

class FreeSpace extends DiskBlock {
}
