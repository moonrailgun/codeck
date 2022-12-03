import { CodeckNodeDefinition } from '@/store/node';
import { DEFAULT_LOGIC_CATEGORY } from '@/utils/consts';
import { buildPinPosX, buildPinPosY } from '@/utils/position-helper';
import { BaseNode } from '../../BaseNode';
import { NumberInputPreset } from '../../components/preset/NumberInputPreset';

const width = 150;
const height = 90;

/**
 * 逻辑或
 */
export const NotNodeDefinition: CodeckNodeDefinition = {
  name: 'not',
  label: 'Not',
  type: 'logic',
  component: BaseNode,
  width,
  height,
  category: DEFAULT_LOGIC_CATEGORY,
  inputs: [
    {
      name: 'input',
      type: 'port',
      position: {
        x: buildPinPosX(width, 'input'),
        y: buildPinPosY(2),
      },
      component: ({ nodeId }) => {
        return <NumberInputPreset nodeId={nodeId} name="input" label="input" />;
      },
    },
  ],
  outputs: [
    {
      name: 'output',
      type: 'port',
      position: {
        x: buildPinPosX(width, 'output'),
        y: buildPinPosY(2),
      },
      code: ({ node, getConnectionInput }) => {
        return `!${getConnectionInput('input') ?? node.data?.input ?? false})`;
      },
    },
  ],
};
