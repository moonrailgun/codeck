import { CodeckNodeDefinition } from '@/store/node';
import { DEFAULT_LOGIC_CATEGORY } from '@/utils/consts';
import { buildPinPosX, buildPinPosY } from '@/utils/position-helper';
import { BaseNode } from '../../BaseNode';
import { NumberInputPreset } from '../../components/preset/NumberInputPreset';

/**
 * 构建逻辑运算
 * 把两个输入转换为一个输出
 */
export function buildCombinedLogicDefinition(
  options: Pick<CodeckNodeDefinition, 'name' | 'label'> & {
    outputCode: (input1: string, input2: string) => string;
  }
): CodeckNodeDefinition {
  const width = 150;
  const height = 132;

  return {
    name: options.name,
    label: options.label,
    type: 'logic',
    component: BaseNode,
    width,
    height,
    category: DEFAULT_LOGIC_CATEGORY,
    inputs: [
      {
        name: 'input1',
        type: 'port',
        position: {
          x: buildPinPosX(width, 'input'),
          y: buildPinPosY(2),
        },
        component: ({ nodeId }) => {
          return (
            <NumberInputPreset nodeId={nodeId} name="input1" label="input1" />
          );
        },
      },
      {
        name: 'input2',
        type: 'port',
        position: {
          x: buildPinPosX(width, 'input'),
          y: buildPinPosY(4),
        },
        component: ({ nodeId }) => {
          return (
            <NumberInputPreset nodeId={nodeId} name="input2" label="input2" />
          );
        },
      },
    ],
    outputs: [
      {
        name: 'output',
        type: 'port',
        position: {
          x: buildPinPosX(width, 'output'),
          y: buildPinPosY(3),
        },
        code: ({ node, getConnectionInput }) => {
          return options.outputCode(
            getConnectionInput('input1') ?? node.data?.input1 ?? 0,
            getConnectionInput('input2') ?? node.data?.input2 ?? 0
          );
        },
      },
    ],
  };
}
