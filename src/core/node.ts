import type { Taichu } from '.';
import { nanoid } from 'nanoid';

export class TaichuNode {
  nodeId: string = nanoid();
  x: number = 0;
  y: number = 0;
  inputs: string[] = [];
  outpus: string[] = [];

  constructor(private taichu: Taichu) {}
}
