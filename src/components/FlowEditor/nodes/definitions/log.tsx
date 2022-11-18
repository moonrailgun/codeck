import React from 'react';
import { TaichuNodeDefinition } from '../../../../store/node';
import { BaseNode } from '../BaseNode';
import {
  DEFAULT_CORE_CATEGORY,
  STANDARD_PIN_EXEC_IN,
  STANDARD_PIN_EXEC_OUT,
} from '../../../../utils/consts';
import { buildPinPos } from '../../../../utils/position-helper';
import { TextInputPreset } from '../components/preset/TextInputPreset';

export const LogNodeDefinition: TaichuNodeDefinition = {
  name: 'log',
  label: 'Log',
  type: 'function',
  component: BaseNode,
  width: 150,
  height: 90,
  category: DEFAULT_CORE_CATEGORY,
  inputs: [
    {
      name: STANDARD_PIN_EXEC_IN,
      type: 'exec',
      position: {
        x: buildPinPos(150, 'input'),
        y: 16,
      },
    },
    {
      name: 'message',
      type: 'port',
      position: {
        x: buildPinPos(150, 'input'),
        y: 50,
      },
      component: ({ nodeId }) => {
        return (
          <TextInputPreset
            nodeId={nodeId}
            x={32}
            y={44}
            name="message"
            label="message"
          />
        );
      },
    },
  ],
  outputs: [
    {
      name: STANDARD_PIN_EXEC_OUT,
      type: 'exec',
      position: {
        x: buildPinPos(150, 'output'),
        y: 16,
      },
    },
  ],
  code: ({ node, getConnectionInput }) => {
    return `console.log(${
      getConnectionInput('message') ?? JSON.stringify(node.data?.message ?? '')
    });\n`;
  },
};
