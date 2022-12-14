import React from 'react';
import { CodeckNodeDefinition } from '../../../store/node';
import { BaseNode } from '../../BaseNode';
import {
  DEFAULT_CORE_CATEGORY,
  STANDARD_PIN_EXEC_IN,
  STANDARD_PIN_EXEC_OUT,
} from '../../../utils/consts';
import { PinLabel } from '../../components/pin/Label';
import { Group } from 'react-konva';
import {
  buildNodeHeight,
  buildPinPosX,
  buildPinPosY,
} from '../../../utils/size-helper';

const width = 180;
const height = buildNodeHeight(1);

export const JSONStringifyNodeDefinition: CodeckNodeDefinition = {
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
        y: buildPinPosY(1),
      },
    },
    {
      name: 'input',
      type: 'port',
      position: {
        x: buildPinPosX(width, 'input'),
        y: buildPinPosY(2),
      },
      component: ({ nodeId }) => {
        return <PinLabel label={'input'} />;
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
    {
      name: 'output',
      type: 'port',
      position: {
        x: buildPinPosX(width, 'output'),
        y: buildPinPosY(2),
      },
      component: ({ nodeId }) => {
        return (
          <Group x={-70}>
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
