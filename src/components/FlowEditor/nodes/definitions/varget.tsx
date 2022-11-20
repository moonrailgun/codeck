import { TaichuNodeDefinition } from '../../../../store/node';
import { DEFAULT_CORE_CATEGORY } from '@/utils/consts';
import { VariableNode } from '../VariableNode';
import { buildPinPosX, buildPinPosY } from '@/utils/position-helper';

const width = 150;
const height = 65;

export const VarGetNodeDefinition: TaichuNodeDefinition = {
  name: 'varget',
  label: 'Value Get',
  type: 'logic',
  component: VariableNode,
  width,
  height,
  category: DEFAULT_CORE_CATEGORY,
  hidden: true,
  inputs: [],
  outputs: [
    {
      name: 'variable',
      type: 'port',
      position: {
        x: buildPinPosX(width, 'output'),
        y: buildPinPosY(1),
      },
    },
  ],
};
