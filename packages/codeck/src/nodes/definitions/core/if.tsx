import React from 'react';
import { CodeckNodeDefinition } from '../../../store/node';
import { BaseNode } from '../../BaseNode';
import { DEFAULT_CORE_CATEGORY } from '../../../utils/consts';
import { buildNodeHeight } from '../../../utils/size-helper';
import { formatFunctionIndent, standard } from '../../..';

const width = 180;
const height = buildNodeHeight(2);

export const IfNodeDefinition: CodeckNodeDefinition = {
  name: 'if',
  label: 'If',
  type: 'logic',
  component: BaseNode,
  width,
  height,
  category: DEFAULT_CORE_CATEGORY,
  inputs: [
    standard.execPinInput(width),
    standard
      .pin({
        name: 'condition',
        width,
        position: 1,
      })
      .port.input.boolean(),
  ],
  outputs: [
    standard.execPinOutput(width),
    standard
      .pin({
        name: 'true',
        width,
        position: 1,
      })
      .exec.output(),
    standard
      .pin({
        name: 'false',
        width,
        position: 2,
      })
      .exec.output(),
  ],
  code: ({ node, getConnectionInput, getConnectionExecOutput }) => {
    const condition =
      getConnectionInput('condition') ?? node.data?.condition ?? false;
    const trueBranch = formatFunctionIndent(getConnectionExecOutput('true'), 2);
    const falseBranch = formatFunctionIndent(getConnectionExecOutput('false'));

    return `if (${condition}) {
  ${trueBranch}
}else {
  ${falseBranch}
}
`;
  },
};
