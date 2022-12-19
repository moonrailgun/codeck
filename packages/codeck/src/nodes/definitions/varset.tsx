import React from 'react';
import { CodeckNodeDefinition } from '../../store/node';
import { DEFAULT_CORE_CATEGORY } from '../../utils/consts';
import { BaseNode } from '../BaseNode';
import { buildNodeHeight, defaultNodeWidth } from '../../utils/size-helper';
import { standard } from '../..';
import { VariableSetNode } from '../VariableSetNode';

const width = defaultNodeWidth;
const height = buildNodeHeight(2);

export const VarSetNodeDefinition: CodeckNodeDefinition = {
  name: 'varset',
  label: 'Set Variable',
  type: 'function',
  component: VariableSetNode,
  width,
  height,
  category: DEFAULT_CORE_CATEGORY,
  hidden: true,
  inputs: [
    standard.execPinInput(width),
    standard
      .pin({
        name: 'value',
        width,
        position: 1,
      })
      .port.input.text(),
  ],
  outputs: [standard.execPinOutput(width)],
  code: ({ node, getConnectionInput }) => {
    return `${node.data?.name ?? ''} = ${
      getConnectionInput('value') ?? JSON.stringify(node.data?.value ?? '')
    };\n`;
  },
};
