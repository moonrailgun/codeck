import React from 'react';
import { CodeckNodeDefinition } from '../../../store/node';
import { BaseNode } from '../../BaseNode';
import { DEFAULT_CORE_CATEGORY } from '../../../utils/consts';
import { buildNodeHeight, defaultNodeWidth } from '../../../utils/size-helper';
import { formatFunctionIndent, standard } from '../../..';

const width = defaultNodeWidth;
const height = buildNodeHeight(2);

export const ForEachNodeDefinition: CodeckNodeDefinition = {
  name: 'foreach',
  label: 'ForEach',
  type: 'function',
  component: BaseNode,
  width,
  height,
  category: DEFAULT_CORE_CATEGORY,
  inputs: [
    standard.execPinInput(width),
    standard
      .pin({
        name: 'array',
        width,
        position: 1,
      })
      .port.input.base(),
  ],
  outputs: [
    standard.execPinOutput(width),
    standard
      .pin({
        name: 'iteration',
        width,
        position: 1,
      })
      .exec.output(),
    standard
      .pin({
        name: 'item',
        width,
        position: 2,
      })
      .port.output.base(),
  ],
  code: ({ buildPinVarName, getConnectionInput, getConnectionExecOutput }) => {
    const array = getConnectionInput('array') ?? '[]';
    const item = buildPinVarName('item');
    const iteration = formatFunctionIndent(
      getConnectionExecOutput('iteration'),
      2
    );

    return `for (let ${item} of ${array}) {
  ${iteration}
}\n`;
  },
};
