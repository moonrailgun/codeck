import { standard } from '../../..';
import { CodeckNodeDefinition } from '../../../store/node';
import { DEFAULT_CORE_CATEGORY } from '../../../utils/consts';
import { buildNodeHeight, defaultNodeWidth } from '../../../utils/size-helper';
import { BaseNode } from '../../BaseNode';

const width = defaultNodeWidth;
const height = buildNodeHeight(1);

export const BeginNodeDefinition: CodeckNodeDefinition = {
  name: 'begin',
  label: 'Begin',
  type: 'begin',
  component: BaseNode,
  width,
  height,
  category: DEFAULT_CORE_CATEGORY,
  hidden: true,
  inputs: [],
  outputs: [standard.execPinOutput(width)],
};
