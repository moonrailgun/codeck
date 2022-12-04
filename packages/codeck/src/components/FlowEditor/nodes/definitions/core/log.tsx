import React from 'react';
import { CodeckNodeDefinition } from '@/store/node';
import { BaseNode } from '../../BaseNode';
import {
  DEFAULT_CORE_CATEGORY,
  STANDARD_PIN_EXEC_IN,
  STANDARD_PIN_EXEC_OUT,
} from '@/utils/consts';
import { buildPinPosX, buildPinPosY } from '@/utils/position-helper';
import { TextInputPreset } from '../../components/preset/TextInputPreset';

const width = 150;
const height = 90;

export const LogNodeDefinition: CodeckNodeDefinition = {
  name: 'log',
  label: 'Log',
  type: 'function',
  component: BaseNode,
  width,
  height,
  category: DEFAULT_CORE_CATEGORY,
  inputs: [
    {
      name: STANDARD_PIN_EXEC_IN,
      type: 'exec',
      position: {
        x: buildPinPosX(width, 'input'),
        y: buildPinPosY(1),
      },
    },
    {
      name: 'message',
      type: 'port',
      position: {
        x: buildPinPosX(width, 'input'),
        y: buildPinPosY(2),
      },
      component: ({ nodeId }) => {
        return (
          <TextInputPreset nodeId={nodeId} name="message" label="message" />
        );
      },
    },
  ],
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
  code: ({ node, getConnectionInput }) => {
    return `console.log(${
      getConnectionInput('message') ?? JSON.stringify(node.data?.message ?? '')
    });\n`;
  },
};
