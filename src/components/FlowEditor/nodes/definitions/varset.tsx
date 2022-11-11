import { TaichuNodeDefinition } from '../../../../store/node';
import {
  STANDARD_PIN_EXEC_IN,
  STANDARD_PIN_EXEC_OUT,
} from '../../../../utils/consts';
import { BaseNode } from '../BaseNode';

export const VarSetNodeDefinition: TaichuNodeDefinition = {
  name: 'varset',
  label: 'Set',
  type: 'logic',
  component: BaseNode,
  width: 150,
  height: 65,
  inputs: [
    {
      name: STANDARD_PIN_EXEC_IN,
      type: 'exec',
      position: {
        x: 14,
        y: 16,
      },
    },
    {
      name: 'variable',
      type: 'port',
      position: {
        x: 14,
        y: 50,
      },
    },
  ],
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
