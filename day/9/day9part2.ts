export function day9part2(): number {
  const inputRaw: string = Deno.readTextFileSync(
    "./day/9/input/input.txt",
  );

  const line: string = inputRaw.split("\n")[0];

  const diskMap = new DiskMap();

  let position = 0;

  for (let index = 0; index < line.length; index++) {
    const char: string = line[index];
    if (index % 2 === 0) {
      diskMap.blocks.push(new FileBlock(Number.parseInt(char), position++));
    } else {
      diskMap.blocks.push(new FreeSpace(Number.parseInt(char)));
    }
  }

  while (diskMap.hasBlocksThatCanBeMoved()) {
    const fileBlockToMove: FileBlock | undefined = diskMap.blocks.filter(
      (block) => block instanceof FileBlock && !block.alreadyTriedToMove,
    ).map((a) => a as FileBlock).sort((a, b) => b.position - a.position).at(0);

    if (!fileBlockToMove) {
      break;
    }

    const fileBlockToMoveIndex: number = diskMap.blocks.indexOf(
      fileBlockToMove,
    );
    fileBlockToMove.alreadyTriedToMove = true;

    const freeSpaceIndex: number = diskMap.blocks.findIndex(
      (block) =>
        block instanceof FreeSpace && block.size >= fileBlockToMove.size,
    );

    if (freeSpaceIndex < 0 || freeSpaceIndex > fileBlockToMoveIndex) {
      continue;
    }

    const freeSpace = diskMap.blocks[freeSpaceIndex] as FreeSpace;

    diskMap.blocks[freeSpaceIndex] = new FileBlock(
      fileBlockToMove.size,
      fileBlockToMove.position,
    );
    diskMap.blocks[fileBlockToMoveIndex] = new FreeSpace(fileBlockToMove.size);

    if (freeSpace.size > fileBlockToMove.size) {
      const newFreeSpace = new FreeSpace(freeSpace.size - fileBlockToMove.size);
      diskMap.blocks.splice(freeSpaceIndex + 1, 0, newFreeSpace);
    }
  }

  const numbers: number[] = [];
  for (const block of diskMap.blocks) {
    if (block instanceof FileBlock) {
      for (let i = 0; i < block.size; i++) {
        numbers.push(block.position);
      }
    } else if (block instanceof FreeSpace) {
      for (let i = 0; i < block.size; i++) {
        numbers.push(0);
      }
    }
  }

  let checksum = 0;
  for (let index = 0; index < numbers.length; index++) {
    const block = numbers[index];
    checksum += block * index;
  }
  return checksum;
}

class DiskMap {
  blocks: DiskBlock[] = [];

  display(): string {
    let display = "";
    for (const block of this.blocks) {
      if (block instanceof FileBlock) {
        for (let i = 0; i < block.size; i++) {
          display += block.position;
        }
      } else if (block instanceof FreeSpace) {
        for (let i = 0; i < block.size; i++) {
          display += ".";
        }
      }
    }
    return display;
  }

  hasBlocksThatCanBeMoved(): boolean {
    return this.blocks.filter(
      (block) => block instanceof FileBlock && !block.alreadyTriedToMove,
    ).length > 0;
  }
}

abstract class DiskBlock {
  constructor(public size: number) {}
}

class FileBlock extends DiskBlock {
  alreadyTriedToMove = false;

  constructor(value: number, public position: number) {
    super(value);
  }
}

class FreeSpace extends DiskBlock {
}
