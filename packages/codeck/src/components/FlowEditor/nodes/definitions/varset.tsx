import React from 'react';
import { Group } from 'react-konva';
import { useNodeData, useNodeDataValue } from '../../../../hooks/useNodeData';
import { CodeckNodeDefinition } from '../../../../store/node';
import {
  DEFAULT_CORE_CATEGORY,
  STANDARD_PIN_EXEC_IN,
  STANDARD_PIN_EXEC_OUT,
} from '../../../../utils/consts';
import { BaseNode } from '../BaseNode';
import { NodeInputText } from '../components/input/Text';
import { PinLabel } from '../components/pin/Label';
import {
  buildNodeHeight,
  buildPinPosX,
  buildPinPosY,
  defaultNodeWidth,
} from '../../../../utils/size-helper';

const width = defaultNodeWidth;
const height = buildNodeHeight(2);

export const VarSetNodeDefinition: CodeckNodeDefinition = {
  name: 'varset',
  label: 'Set Variable',
  type: 'function',
  component: BaseNode,
  width,
  height,
  category: DEFAULT_CORE_CATEGORY,
  hidden: true,
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
      name: 'variable',
      type: 'port',
      position: {
        x: buildPinPosX(width, 'input'),
        y: buildPinPosY(2),
      },
      component: ({ nodeId }) => {
        const { name } = useNodeData(nodeId);
        const [value, setValue] = useNodeDataValue(nodeId, 'manual');

        return (
          <Group>
            <PinLabel label={name} />
            <NodeInputText y={20} value={value ?? ''} onChange={setValue} />
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
        x: buildPinPosX(width, 'output'),
        y: buildPinPosY(1),
      },
    },
  ],
  code: ({ node, getConnectionInput }) => {
    return `${node.data?.name ?? ''} = ${
      getConnectionInput('variable') ?? JSON.stringify(node.data?.manual ?? '')
    };\n`;
  },
};
