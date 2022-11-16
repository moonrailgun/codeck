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
      name: 'input',
      type: 'port',
      position: {
        x: buildPinPos(150, 'input'),
        y: 50,
      },
      component: ({ nodeId }) => {
        const [message, setMessage] = useNodeDataValue(nodeId, 'message');

        return (
          <Group x={32} y={44}>
            <PinLabel label={'message'} />
            <NodeInputText y={20} value={message ?? ''} onChange={setMessage} />
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
        x: buildPinPos(150, 'output'),
        y: 16,
      },
    },
  ],
  code: ({ node, getConnectionInput }) => {
    return `console.log(${
      getConnectionInput('input') ?? JSON.stringify(node.data?.message ?? '')
    });\n`;
  },
};
