import { TaichuNodeDefinition } from '../../../store/node';
import { BaseNode } from './BaseNode';

export const LogNodeDefinition: TaichuNodeDefinition = {
  name: 'log',
  label: 'Log',
  type: 'function',
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
