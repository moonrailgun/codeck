import { TaichuNodeDefinition } from '../../../store/node';
import { BaseNode } from './BaseNode';

export const BeginNodeDefinition: TaichuNodeDefinition = {
  name: 'begin',
  label: 'Begin',
  type: 'begin',
  component: BaseNode,
  width: 150,
  height: 65,
  inputs: [
    {
      name: 'exec-in',
      type: 'exec',
      position: {
        x: 20,
        y: 16,
      },
    },
  ],
  outputs: [
    {
      name: 'exec-out',
      type: 'exec',
      position: {
        x: 140,
        y: 16,
      },
    },
  ],
};
