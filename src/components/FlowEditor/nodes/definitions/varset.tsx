import { Group } from 'react-konva';
import { useNodeData, useNodeDataValue } from '../../../../hooks/useNodeData';
import { TaichuNodeDefinition } from '../../../../store/node';
import {
  DEFAULT_CORE_CATEGORY,
  STANDARD_PIN_EXEC_IN,
  STANDARD_PIN_EXEC_OUT,
} from '@/utils/consts';
import { BaseNode } from '../BaseNode';
import { NodeInputText } from '../components/input/Text';
import { PinLabel } from '../components/pin/Label';

const width = 150;
const height = 90;

export const VarSetNodeDefinition: TaichuNodeDefinition = {
  name: 'varset',
  label: 'Set Variable',
  type: 'function',
  component: BaseNode,
  width,
  height,
  category: DEFAULT_CORE_CATEGORY,
  hidden: true,
  inputs: [
    {
      name: STANDARD_PIN_EXEC_IN,
      type: 'exec',
      position: {
        x: 14,
        y: 16,
      },
    },
    {
      name: 'variable',
      type: 'port',
      position: {
        x: 14,
        y: 50,
      },
      component: ({ nodeId }) => {
        const { name } = useNodeData(nodeId);
        const [value, setValue] = useNodeDataValue(nodeId, 'manual');

        return (
          <Group x={32} y={44}>
            <PinLabel label={name} />
            <NodeInputText y={20} value={value ?? ''} onChange={setValue} />
          </Group>
        );
      },
    },
  ],
  outputs: [
    {
      name: STANDARD_PIN_EXEC_OUT,
      type: 'exec',
      position: {
        x: 136,
        y: 16,
      },
    },
  ],
  code: ({ node, getConnectionInput }) => {
    return `${node.data?.name ?? ''} = ${
      getConnectionInput('variable') ?? JSON.stringify(node.data?.manual ?? '')
    };\n`;
  },
};
