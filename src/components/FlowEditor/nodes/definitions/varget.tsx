import { TaichuNodeDefinition } from '../../../../store/node';
import { DEFAULT_CORE_CATEGORY } from '@/utils/consts';
import { VariableNode } from '../VariableNode';

export const VarGetNodeDefinition: TaichuNodeDefinition = {
  name: 'varget',
  label: 'Value Get',
  type: 'logic',
  component: VariableNode,
  width: 150,
  height: 65,
  category: DEFAULT_CORE_CATEGORY,
  hidden: true,
  inputs: [],
  outputs: [
    {
      name: 'variable',
      type: 'port',
      position: {
        x: 136,
        y: 16,
      },
    },
  ],
};
