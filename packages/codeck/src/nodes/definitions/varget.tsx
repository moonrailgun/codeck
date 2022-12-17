import { CodeckNodeDefinition } from '../../store/node';
import { DEFAULT_CORE_CATEGORY } from '../../utils/consts';
import { VariableNode } from '../VariableNode';
import {
  buildNodeHeight,
  buildPinPosX,
  buildPinPosY,
  defaultNodeWidth,
} from '../../utils/size-helper';

const width = defaultNodeWidth;
const height = buildNodeHeight(1);

export const VarGetNodeDefinition: CodeckNodeDefinition = {
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
        y: buildPinPosY(0),
      },
    },
  ],
};
