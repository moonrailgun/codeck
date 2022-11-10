import { TaichuNodeDefinition } from '../../../../store/node';
import { VariableNode } from '../VariableNode';

export const VarSetNodeDefinition: TaichuNodeDefinition = {
  name: 'varset',
  label: 'Value Set',
  type: 'logic',
  component: VariableNode,
  width: 150,
  height: 65,
  inputs: [
    {
      name: 'variable',
      type: 'port',
      position: {
        x: 14,
        y: 16,
      },
    },
  ],
  outputs: [],
};
