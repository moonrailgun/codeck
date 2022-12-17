import { standard } from '../../..';
import { CodeckNodeDefinition } from '../../../store/node';
import { DEFAULT_CORE_CATEGORY } from '../../../utils/consts';
import { buildNodeHeight, defaultNodeWidth } from '../../../utils/size-helper';
import { BaseNode } from '../../BaseNode';

const width = defaultNodeWidth;
const height = buildNodeHeight(2);

export const SleepNodeDefinition: CodeckNodeDefinition = {
  name: 'sleep',
  label: 'Sleep',
  type: 'function',
  component: BaseNode,
  width,
  height,
  category: DEFAULT_CORE_CATEGORY,
  inputs: [
    standard.execPinInput(width),
    standard
      .pin({
        width,
        name: 'ms',
        position: 1,
      })
      .port.input.number(),
  ],
  outputs: [
    standard
      .pin({
        width,
        name: 'cb',
        label: '',
        position: 0,
      })
      .exec.output(),
  ],
  code: ({ node, getConnectionInput, getConnectionExecOutput }) => {
    const ms = getConnectionInput('ms') ?? node.data?.ms ?? 0;
    const cb =
      getConnectionExecOutput('cb')?.trim().split('\n').join('\n  ') ?? ''; // 为了确保有合适的缩进

    return `window.setTimeout(() => {
  ${cb}
}, ${ms});
`;
  },
};
