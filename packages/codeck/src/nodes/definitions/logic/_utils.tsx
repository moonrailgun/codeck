import React from 'react';
import { CodeckNodeDefinition } from '../../../store/node';
import { DEFAULT_LOGIC_CATEGORY } from '../../../utils/consts';
import { buildPinPosX, buildPinPosY } from '../../../utils/size-helper';
import { BaseNode } from '../../BaseNode';
import { NumberInputPreset } from '../../components/preset/NumberInputPreset';
import { BaseInputPresetProps } from '../../components/preset/types';

/**
 * 构建逻辑运算
 * 把两个输入转换为一个输出
 */
export function buildCombinedLogicDefinition(
  options: Pick<CodeckNodeDefinition, 'name' | 'label'> & {
    /**
     * 输入组件预设
     */
    InputPreset?: React.ComponentType<BaseInputPresetProps>;
    defaultValue?: any;
    outputCode: (input1: string, input2: string) => string;
  }
): CodeckNodeDefinition {
  const width = 150;
  const height = 132;
  const InputPreset = options.InputPreset ?? NumberInputPreset;
  const defaultValue = options.defaultValue ?? 0;

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
          y: buildPinPosY(1),
        },
        component: ({ nodeId }) => {
          return <InputPreset nodeId={nodeId} name="input1" label="input1" />;
        },
      },
      {
        name: 'input2',
        type: 'port',
        position: {
          x: buildPinPosX(width, 'input'),
          y: buildPinPosY(3),
        },
        component: ({ nodeId }) => {
          return <InputPreset nodeId={nodeId} name="input2" label="input2" />;
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
          return options.outputCode(
            getConnectionInput('input1') ?? node.data?.input1 ?? defaultValue,
            getConnectionInput('input2') ?? node.data?.input2 ?? defaultValue
          );
        },
      },
    ],
  };
}
