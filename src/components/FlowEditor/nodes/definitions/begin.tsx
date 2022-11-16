import { TaichuNodeDefinition } from '../../../../store/node';
import {
  DEFAULT_CORE_CATEGORY,
  STANDARD_PIN_EXEC_OUT,
} from '../../../../utils/consts';
import { BaseNode } from '../BaseNode';

export const BeginNodeDefinition: TaichuNodeDefinition = {
  name: 'begin',
  label: 'Begin',
  type: 'begin',
  component: BaseNode,
  width: 150,
  height: 65,
  category: DEFAULT_CORE_CATEGORY,
  hidden: true,
  inputs: [],
  outputs: [
    {
      name: STANDARD_PIN_EXEC_OUT,
      type: 'exec',
      position: {
        x: 136,
        y: 16,
      },
    },
  ],
};
