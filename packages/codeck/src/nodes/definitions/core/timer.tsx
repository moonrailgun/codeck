import { standard } from '../../..';
import { CodeckNodeDefinition } from '../../../store/node';
import { DEFAULT_CORE_CATEGORY } from '../../../utils/consts';
import { buildNodeHeight } from '../../../utils/size-helper';
import { BaseNode } from '../../BaseNode';

const width = 200;
const height = buildNodeHeight(4);

export const TimerNodeDefinition: CodeckNodeDefinition = {
  name: 'timer',
  label: 'Timer',
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
    standard
      .pin({
        width,
        name: 'forever',
        position: 3,
      })
      .port.input.boolean(),
  ],
  outputs: [
    standard.execPinOutput(width),
    standard
      .pin({
        width,
        name: 'cb',
        label: 'call',
        position: 1,
      })
      .exec.output(),
    standard
      .pin({
        width,
        name: 'timerRef',
        label: 'timerRef',
        position: 2,
      })
      .port.output.base(),
  ],
  code: ({
    node,
    buildPinVarName,
    getConnectionInput,
    getConnectionExecOutput,
  }) => {
    const ms = getConnectionInput('ms') ?? node.data?.ms ?? 0;
    const forever =
      getConnectionInput('forever') ?? node.data?.forever ?? false;
    const cb =
      getConnectionExecOutput('cb')?.trim().split('\n').join('\n  ') ?? ''; // 为了确保有合适的缩进
    const timerRef = buildPinVarName('timerRef');

    return `const ${timerRef} = window.${
      forever ? 'setInterval' : 'setTimeout'
    }(() => {
  ${cb}
}, ${ms});
`;
  },
};
