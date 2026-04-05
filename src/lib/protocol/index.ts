import type { Level, Block } from "../types";
import { LEVEL_1 } from "./level1";
import { LEVEL_2 } from "./level2";
import { LEVEL_3 } from "./level3";
import { LEVEL_4 } from "./level4";
import { LEVEL_5 } from "./level5";

export const LEVELS: Level[] = [LEVEL_1, LEVEL_2, LEVEL_3, LEVEL_4, LEVEL_5];

export function getLevelByNumber(n: number): Level | undefined {
  return LEVELS.find((l) => l.number === n);
}

export function getBlocksForLevel(n: number): Block[] {
  const level = getLevelByNumber(n);
  return level ? level.blocks : [];
}
