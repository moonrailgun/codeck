import { TaichuNodeDefinition } from '../../../../store/node';
import { BaseNode } from '../BaseNode';
import React from 'react';
import { Text } from 'react-konva';
import {
  STANDARD_PIN_EXEC_IN,
  STANDARD_PIN_EXEC_OUT,
} from '../../../../utils/consts';

export const LogNodeDefinition: TaichuNodeDefinition = {
  name: 'log',
  label: 'Log',
  type: 'function',
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
      name: 'input',
      type: 'port',
      position: {
        x: 14,
        y: 50,
      },
      component: ({ nodeId }) => (
        <Text text={'Input'} x={32} y={44} fill="white" fontSize={14} />
      ),
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
