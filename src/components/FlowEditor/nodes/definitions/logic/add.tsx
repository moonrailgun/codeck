import React from 'react';
import { TaichuNodeDefinition } from '@/store/node';
import { BaseNode } from '../../BaseNode';
import { DEFAULT_LOGIC_CATEGORY } from '@/utils/consts';
import { buildPinPosX } from '@/utils/position-helper';
import { NumberInputPreset } from '../../components/preset/NumberInputPreset';

const width = 150;
const height = 132;

export const AddNodeDefinition: TaichuNodeDefinition = {
  name: 'add',
  label: 'Add',
  type: 'logic',
  component: BaseNode,
  width,
  height,
  category: DEFAULT_LOGIC_CATEGORY,
  inputs: [
    {
      name: 'input1',
      type: 'port',
      position: {
        x: 14,
        y: 50,
      },
      component: ({ nodeId }) => {
        return (
          <NumberInputPreset
            nodeId={nodeId}
            x={32}
            y={44}
            name="input1"
            label="input1"
          />
        );
      },
    },
    {
      name: 'input2',
      type: 'port',
      position: {
        x: 14,
        y: 90,
      },
      component: ({ nodeId }) => {
        return (
          <NumberInputPreset
            nodeId={nodeId}
            x={32}
            y={84}
            name="input2"
            label="input2"
          />
        );
      },
    },
  ],
  outputs: [
    {
      name: 'output',
      type: 'port',
      position: {
        x: buildPinPosX(width, 'output'),
        y: 56,
      },
      code: ({ node, getConnectionInput }) => {
        return `${getConnectionInput('input1') ?? node.data?.input1 ?? 0} + ${
          getConnectionInput('input2') ?? node.data?.input2 ?? 0
        }`;
      },
    },
  ],
};
