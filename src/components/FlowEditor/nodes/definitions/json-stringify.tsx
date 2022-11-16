import React from 'react';
import { TaichuNodeDefinition } from '../../../../store/node';
import { BaseNode } from '../BaseNode';
import {
  DEFAULT_CORE_CATEGORY,
  STANDARD_PIN_EXEC_IN,
  STANDARD_PIN_EXEC_OUT,
} from '../../../../utils/consts';
import { PinLabel } from '../pin/Label';
import { NodeInputText } from '../input/Text';
import { Group } from 'react-konva';
import { useNodeDataValue } from '../../../../hooks/useNodeData';
import { buildPinPos } from '../../../../utils/position-helper';

const width = 240;

export const JSONStringifyNodeDefinition: TaichuNodeDefinition = {
  name: 'json-stringify',
  label: 'JSONStringify',
  type: 'function',
  component: BaseNode,
  width,
  height: 100,
  category: DEFAULT_CORE_CATEGORY,
  inputs: [
    {
      name: STANDARD_PIN_EXEC_IN,
      type: 'exec',
      position: {
        x: buildPinPos(width, 'input'),
        y: 16,
      },
    },
    {
      name: 'input',
      type: 'port',
      position: {
        x: buildPinPos(width, 'input'),
        y: 50,
      },
      component: ({ nodeId }) => {
        const [input, setInput] = useNodeDataValue(nodeId, 'input');

        return (
          <Group x={32} y={44}>
            <PinLabel label={'input'} />
            <NodeInputText y={20} value={input ?? ''} onChange={setInput} />
          </Group>
        );
      },
    },
  ],
  outputs: [
    {
      name: STANDARD_PIN_EXEC_OUT,
      type: 'exec',
      position: {
        x: buildPinPos(width, 'output'),
        y: 16,
      },
    },
    {
      name: 'output',
      type: 'port',
      position: {
        x: buildPinPos(width, 'output'),
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
  code: ({ node, buildPinVarName }) => {
    return `let ${buildPinVarName('output')} = JSON.stringify("${
      node.data?.input ?? ''
    }");\n`;
  },
};
