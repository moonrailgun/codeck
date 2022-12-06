import { CodeckNodeDefinition } from '../../../../../store/node';
import {
  DEFAULT_CORE_CATEGORY,
  STANDARD_PIN_EXEC_OUT,
} from '../../../../../utils/consts';
import {
  buildPinPosX,
  buildPinPosY,
} from '../../../../../utils/position-helper';
import { BaseNode } from '../../BaseNode';

const width = 150;
const height = 65;

export const BeginNodeDefinition: CodeckNodeDefinition = {
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
        y: buildPinPosY(1),
      },
    },
  ],
};
