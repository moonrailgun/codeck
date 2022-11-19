import { TaichuNodeDefinition } from '../../../../store/node';
import { DEFAULT_CORE_CATEGORY, STANDARD_PIN_EXEC_OUT } from '@/utils/consts';
import { buildPinPosX } from '@/utils/position-helper';
import { BaseNode } from '../BaseNode';

const width = 150;
const height = 65;

export const BeginNodeDefinition: TaichuNodeDefinition = {
  name: 'begin',
  label: 'Begin',
  type: 'begin',
  component: BaseNode,
  width,
  height,
  category: DEFAULT_CORE_CATEGORY,
  hidden: true,
  inputs: [],
  outputs: [
    {
      name: STANDARD_PIN_EXEC_OUT,
      type: 'exec',
      position: {
        x: buildPinPosX(width, 'output'),
        y: 16,
      },
    },
  ],
};
