import React from 'react';
import { CodeckNodeDefinition } from '../../../store/node';
import { BaseNode } from '../../BaseNode';
import { DEFAULT_CORE_CATEGORY } from '../../../utils/consts';
import { buildNodeHeight } from '../../../utils/size-helper';
import { standard } from '../../..';

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
    standard.execPinInput(width),
    standard
      .pin({
        name: 'input',
        width,
        position: 1,
      })
      .port.input.base(),
  ],
  outputs: [
    standard.execPinOutput(width),
    standard
      .pin({
        name: 'output',
        width,
        position: 1,
      })
      .port.output.base(),
  ],
  code: ({ node, buildPinVarName, getConnectionInput }) => {
    const input = getConnectionInput('input') ?? '""';
    const output = buildPinVarName('output');

    return `let ${output} = JSON.stringify(${input});\n`;
  },
};
