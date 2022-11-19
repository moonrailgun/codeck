import React from 'react';
import { TaichuNodeDefinition } from '../../../../store/node';
import { BaseNode } from '../BaseNode';
import {
  DEFAULT_CORE_CATEGORY,
  STANDARD_PIN_EXEC_IN,
  STANDARD_PIN_EXEC_OUT,
} from '@/utils/consts';
import { PinLabel } from '../components/pin/Label';
import { Group } from 'react-konva';
import { buildPinPosX } from '@/utils/position-helper';

const width = 240;
const height = 65;

export const JSONStringifyNodeDefinition: TaichuNodeDefinition = {
  name: 'json-stringify',
  label: 'JSONStringify',
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
        y: 16,
      },
    },
    {
      name: 'input',
      type: 'port',
      position: {
        x: buildPinPosX(width, 'input'),
        y: 50,
      },
      component: ({ nodeId }) => {
        return <PinLabel label={'input'} x={32} y={44} />;
      },
    },
  ],
  outputs: [
    {
      name: STANDARD_PIN_EXEC_OUT,
      type: 'exec',
      position: {
        x: buildPinPosX(width, 'output'),
        y: 16,
      },
    },
    {
      name: 'output',
      type: 'port',
      position: {
        x: buildPinPosX(width, 'output'),
        y: 50,
      },
      component: ({ nodeId }) => {
        return (
          <Group x={170} y={44}>
            <PinLabel label={'output'} />
          </Group>
        );
      },
    },
  ],
  code: ({ node, buildPinVarName, getConnectionInput }) => {
    return `let ${buildPinVarName('output')} = JSON.stringify(${
      getConnectionInput('input') ?? '""'
    });\n`;
  },
};
