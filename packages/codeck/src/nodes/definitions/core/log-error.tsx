import React from 'react';
import { CodeckNodeDefinition } from '../../../store/node';
import { BaseNode } from '../../BaseNode';
import { DEFAULT_CORE_CATEGORY } from '../../../utils/consts';
import { buildNodeHeight, defaultNodeWidth } from '../../../utils/size-helper';
import { standard } from '../../..';

const width = defaultNodeWidth;
const height = buildNodeHeight(3);

export const LogErrorNodeDefinition: CodeckNodeDefinition = {
  name: 'log-error',
  label: 'LogError',
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
        width,
        position: 1,
      })
      .port.input.text(),
    standard
      .pin({
        name: 'error',
        width,
        position: 3,
      })
      .port.input.base(),
  ],
  outputs: [standard.execPinOutput(width)],
  code: ({ node, getConnectionInput }) => {
    const message =
      getConnectionInput('message') ?? JSON.stringify(node.data?.message ?? '');
    const error = getConnectionInput('error') ?? 'err';
    return `console.error(${message}, ${error});\n`;
  },
};
