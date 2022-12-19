import React from 'react';
import { CodeckNodeDefinition } from '../../../store/node';
import { BaseNode } from '../../BaseNode';
import { DEFAULT_CORE_CATEGORY } from '../../../utils/consts';
import { buildNodeHeight } from '../../../utils/size-helper';
import { formatFunctionIndent, standard } from '../../..';

const width = 340;
const height = buildNodeHeight(6);

export const RawJSNodeDefinition: CodeckNodeDefinition = {
  name: 'raw-js',
  label: 'Javascript',
  type: 'function',
  component: BaseNode,
  width,
  height,
  category: DEFAULT_CORE_CATEGORY,
  inputs: [
    standard.execPinInput(width),
    standard
      .pin({
        name: 'ctx',
        label: 'ctx',
        width,
        position: 1,
      })
      .port.input.base(),
    standard
      .pin({
        name: 'js',
        label: 'returnValue = (function(ctx) {...})(ctx)',
        width,
        position: 2,
      })
      .port.input.textarea({ row: 4, width: width - 60 }),
  ],
  outputs: [
    standard.execPinOutput(width),
    standard
      .pin({
        name: 'returnValue',
        width,
        position: 1,
      })
      .port.output.base(),
  ],
  code: ({ node, getConnectionInput, buildPinVarName }) => {
    const ctx = getConnectionInput('ctx') ?? '{}';
    const js = formatFunctionIndent(
      getConnectionInput('js') ?? String(node.data?.js ?? ''),
      2
    );
    const returnValue = buildPinVarName('returnValue');

    return `const ${returnValue} = (function(ctx) {
  ${js}
})(${ctx});\n`;
  },
};
