import React from 'react';
import { TaichuNodeDefinition } from '../../../../store/node';
import { BaseNode } from '../BaseNode';
import {
  DEFAULT_CORE_CATEGORY,
  STANDARD_PIN_EXEC_IN,
  STANDARD_PIN_EXEC_OUT,
} from '../../../../utils/consts';
import { TextInputPreset } from '../components/preset/TextInputPreset';

export const AlertNodeDefinition: TaichuNodeDefinition = {
  name: 'alert',
  label: 'Alert',
  type: 'function',
  component: BaseNode,
  width: 150,
  height: 100,
  category: DEFAULT_CORE_CATEGORY,
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
      name: 'message',
      type: 'port',
      position: {
        x: 14,
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
        x: 136,
        y: 16,
      },
    },
  ],
  code: (node) => {
    return `alert("${node.data?.message ?? ''}");\n`;
  },
};
