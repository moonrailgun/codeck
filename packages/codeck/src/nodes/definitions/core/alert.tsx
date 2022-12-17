import React from 'react';
import { CodeckNodeDefinition } from '../../../store/node';
import { BaseNode } from '../../BaseNode';
import { DEFAULT_CORE_CATEGORY } from '../../../utils/consts';
import { buildNodeHeight, defaultNodeWidth } from '../../../utils/size-helper';
import { standard } from '../../..';

const width = defaultNodeWidth;
const height = buildNodeHeight(2);

export const AlertNodeDefinition: CodeckNodeDefinition = {
  name: 'alert',
  label: 'Alert',
  type: 'function',
  component: BaseNode,
  width,
  height,
  category: DEFAULT_CORE_CATEGORY,
  inputs: [
    standard.execPinInput(width),
    standard
      .pin({
        name: 'message',
        position: 1,
        width,
      })
      .port.input.text(),
  ],
  outputs: [standard.execPinOutput(width)],
  code: ({ node, getConnectionInput }) => {
    const message =
      getConnectionInput('message') ?? JSON.stringify(node.data?.message ?? '');

    return `alert(${message});\n`;
  },
};
