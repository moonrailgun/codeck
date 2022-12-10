import React from 'react';
import { BaseNode } from '../components/FlowEditor/nodes/BaseNode';
import {
  OutputPinLabel,
  PinLabel,
} from '../components/FlowEditor/nodes/components/pin/Label';
import { CodeckNodePinDefinition, CodeckNodeDefinition } from '../store/node';
import { STANDARD_PIN_EXEC_IN, STANDARD_PIN_EXEC_OUT } from './consts';
import {
  buildNodeHeight,
  buildPinPosX,
  buildPinPosY,
  defaultNodeWidth,
} from './size-helper';

/**
 * 标准执行输入
 */
export const execPinInput = (width: number): CodeckNodePinDefinition => ({
  name: STANDARD_PIN_EXEC_IN,
  type: 'exec',
  position: {
    x: buildPinPosX(width, 'input'),
    y: buildPinPosY(1),
  },
});

/**
 * 标准执行输出
 */
export const execPinOutput = (width: number): CodeckNodePinDefinition => ({
  name: STANDARD_PIN_EXEC_OUT,
  type: 'exec',
  position: {
    x: buildPinPosX(width, 'output'),
    y: buildPinPosY(1),
  },
});

/**
 * 对象解构节点
 */
export const objDeconstructNode = (
  options: Pick<CodeckNodeDefinition, 'name' | 'label' | 'category'> &
    Partial<Pick<CodeckNodeDefinition, 'width'>> & {
      /**
       * 解构出的成员列表
       */
      outputList: {
        name: string;
        label?: string;
      }[];
    }
): CodeckNodeDefinition => {
  const width = options.width ?? defaultNodeWidth;
  const height = buildNodeHeight(Math.max(options.outputList.length, 1));

  return {
    name: options.name,
    label: options.label,
    type: 'function',
    component: BaseNode,
    width,
    height,
    category: options.category,
    inputs: [
      execPinInput(width),
      {
        name: 'payload',
        type: 'port',
        position: {
          x: buildPinPosX(width, 'input'),
          y: buildPinPosY(2),
        },
        component: () => {
          return <PinLabel label="payload" />;
        },
      },
    ],
    outputs: [
      execPinOutput(width),
      ...options.outputList.map((item, i) => ({
        name: item.name,
        type: 'port' as const,
        position: {
          x: buildPinPosX(width, 'output'),
          y: buildPinPosY(i + 2),
        },
        component: () => {
          return (
            <OutputPinLabel label={item.label ?? item.name} width={width / 2} />
          );
        },
      })),
    ],
    code: ({ getConnectionInput, buildPinVarName }) => {
      const vars = options.outputList
        .map((item) => buildPinVarName(item.name))
        .join(',\n  ');
      const payload = getConnectionInput('payload');

      if (!payload) {
        return '// require input payload';
      }

      return `const {
  ${vars}
} = ${payload};\n`;
    },
  };
};
