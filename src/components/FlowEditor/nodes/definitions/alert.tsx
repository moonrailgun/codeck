import React from 'react';
import { TaichuNodeDefinition } from '../../../../store/node';
import { BaseNode } from '../BaseNode';
import {
  STANDARD_PIN_EXEC_IN,
  STANDARD_PIN_EXEC_OUT,
} from '../../../../utils/consts';
import { PinLabel } from '../pin/Label';
import { NodeInputText } from '../input/Text';
import { Group } from 'react-konva';
import { useNodeDataValue } from '../../../../hooks/useNodeData';

export const AlertNodeDefinition: TaichuNodeDefinition = {
  name: 'alert',
  label: 'Alert',
  type: 'function',
  component: BaseNode,
  width: 150,
  height: 100,
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
        x: 136,
        y: 16,
      },
    },
  ],
  code: (node) => {
    return `alert("${node.data?.message ?? ''}");\n`;
  },
};
