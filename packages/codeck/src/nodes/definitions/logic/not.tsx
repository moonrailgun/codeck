import { CodeckNodeDefinition } from '../../../store/node';
import { DEFAULT_LOGIC_CATEGORY } from '../../../utils/consts';
import {
  buildNodeHeight,
  buildPinPosX,
  buildPinPosY,
  defaultNodeWidth,
} from '../../../utils/size-helper';
import { BaseNode } from '../../BaseNode';
import { BooleanInputPreset } from '../../components/preset/BooleanInputPreset';
import React from 'react';

const width = defaultNodeWidth;
const height = buildNodeHeight(2);

/**
 * 逻辑或
 */
export const NotNodeDefinition: CodeckNodeDefinition = {
  name: 'not',
  label: 'Not',
  type: 'logic',
  component: BaseNode,
  width,
  height,
  category: DEFAULT_LOGIC_CATEGORY,
  inputs: [
    {
      name: 'input',
      type: 'port',
      position: {
        x: buildPinPosX(width, 'input'),
        y: buildPinPosY(1),
      },
      component: ({ nodeId }) => {
        return (
          <BooleanInputPreset nodeId={nodeId} name="input" label="input" />
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
        y: buildPinPosY(1),
      },
      code: ({ node, getConnectionInput }) => {
        return `!${getConnectionInput('input') ?? node.data?.input ?? false})`;
      },
    },
  ],
};
