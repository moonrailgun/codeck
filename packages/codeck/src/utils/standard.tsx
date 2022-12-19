import React from 'react';
import { isEmpty } from 'lodash-es';
import { BaseNode } from '../nodes/BaseNode';
import { OutputPinLabel, PinLabel } from '../nodes/components/pin/Label';
import { SelectInputPresetProps } from '../nodes/components/preset/SelectInputPreset';
import {
  BooleanInputPreset,
  NumberInputPreset,
  SelectInputPreset,
  TextInputPreset,
} from '../nodes/__all__';
import { CodeckNodePinDefinition, CodeckNodeDefinition } from '../store/node';
import { STANDARD_PIN_EXEC_IN, STANDARD_PIN_EXEC_OUT } from './consts';
import {
  buildNodeHeight,
  buildPinPosX,
  buildPinPosY,
  defaultNodeWidth,
} from './size-helper';
import {
  TextAreaInputPreset,
  TextAreaInputPresetProps,
} from '../nodes/components/preset/TextAreaInputPreset';

/**
 * 标准执行输入
 */
export function execPinInput(width: number): CodeckNodePinDefinition {
  return {
    name: STANDARD_PIN_EXEC_IN,
    type: 'exec',
    position: {
      x: buildPinPosX(width, 'input'),
      y: buildPinPosY(0),
    },
  };
}

/**
 * 标准执行输出
 */
export function execPinOutput(width: number): CodeckNodePinDefinition {
  return {
    name: STANDARD_PIN_EXEC_OUT,
    type: 'exec',
    position: {
      x: buildPinPosX(width, 'output'),
      y: buildPinPosY(0),
    },
  };
}

interface BasePinGenerateOptions {
  name: string;
  label?: string;
  width: number;
  /**
   * y方向上的位置
   * 默认输入输出节点位置为0(在label上)
   */
  position: number;
}

/**
 * 标准数据端点
 */
function portPin(
  options: BasePinGenerateOptions & {
    defaultValue?: CodeckNodePinDefinition['defaultValue'];
  }
): {
  input: {
    base: () => CodeckNodePinDefinition;
    text: () => CodeckNodePinDefinition;
    textarea: (
      inputProps: TextAreaInputPresetProps['inputProps']
    ) => CodeckNodePinDefinition;
    number: () => CodeckNodePinDefinition;
    boolean: () => CodeckNodePinDefinition;
    select: (
      selectOptions: SelectInputPresetProps['options']
    ) => CodeckNodePinDefinition;
  };
  output: {
    base: () => CodeckNodePinDefinition;
  };
} {
  const buildBaseDef = (
    direction: 'input' | 'output'
  ): CodeckNodePinDefinition => ({
    name: options.name,
    type: 'port',
    position: {
      x: buildPinPosX(options.width, direction),
      y: buildPinPosY(options.position),
    },
    defaultValue: options.defaultValue,
  });

  return {
    input: {
      base: () => ({
        ...buildBaseDef('input'),
        component: () => {
          return <PinLabel label={options.label ?? options.name} />;
        },
      }),
      text: () => ({
        ...buildBaseDef('input'),
        component: ({ nodeId }) => {
          return (
            <TextInputPreset
              nodeId={nodeId}
              name={options.name}
              label={options.label ?? options.name}
            />
          );
        },
      }),
      textarea: (inputProps) => ({
        ...buildBaseDef('input'),
        component: ({ nodeId }) => {
          return (
            <TextAreaInputPreset
              nodeId={nodeId}
              name={options.name}
              label={options.label ?? options.name}
              inputProps={inputProps}
            />
          );
        },
      }),
      number: () => ({
        ...buildBaseDef('input'),
        component: ({ nodeId }) => {
          return (
            <NumberInputPreset
              nodeId={nodeId}
              name={options.name}
              label={options.label ?? options.name}
            />
          );
        },
      }),
      boolean: () => ({
        ...buildBaseDef('input'),
        component: ({ nodeId }) => {
          return (
            <BooleanInputPreset
              nodeId={nodeId}
              name={options.name}
              label={options.label ?? options.name}
            />
          );
        },
      }),
      select: (selectOptions: SelectInputPresetProps['options']) => ({
        ...buildBaseDef('input'),
        component: ({ nodeId }) => {
          return (
            <SelectInputPreset
              nodeId={nodeId}
              name={options.name}
              label={options.label ?? options.name}
              options={selectOptions}
            />
          );
        },
      }),
    },
    output: {
      base: () => ({
        ...buildBaseDef('output'),
        component: () => {
          return (
            <OutputPinLabel
              label={options.label ?? options.name}
              width={options.width / 2}
            />
          );
        },
      }),
    },
  };
}

/**
 * 自定义执行端点
 */
function execPin(options: BasePinGenerateOptions): {
  input: () => CodeckNodePinDefinition;
  output: () => CodeckNodePinDefinition;
} {
  return {
    input: () => ({
      ...portPin(options).input.base(),
      type: 'exec',
    }),
    output: () => ({
      ...portPin(options).output.base(),
      type: 'exec',
    }),
  };
}

/**
 * 标准端点生成逻辑
 */
export function pin(options: BasePinGenerateOptions) {
  return {
    exec: execPin(options),
    port: portPin(options),
  };
}

/**
 * 对象构造节点
 */
export const objConstructNode = (
  options: Pick<CodeckNodeDefinition, 'name' | 'label' | 'category'> &
    Partial<Pick<CodeckNodeDefinition, 'width' | 'height'>> & {
      /**
       * 解构所需要的
       */
      inputList: {
        name: string;
        label?: string;
        position?: number; // 默认递增，因为考虑到组件会占用所以可以指定
        required?: boolean; // 默认为false
        component?: CodeckNodePinDefinition['component']; // 渲染函数
      }[];
      constructWrapper?: string;
    }
): CodeckNodeDefinition => {
  const width = options.width ?? defaultNodeWidth;
  const height =
    options.height ?? buildNodeHeight(Math.max(options.inputList.length, 1));

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
      ...options.inputList.map((item, i) => ({
        name: item.name,
        type: 'port' as const,
        position: {
          x: buildPinPosX(width, 'input'),
          y: item.position ? buildPinPosY(item.position) : buildPinPosY(i + 1),
        },
        component:
          item.component ??
          (() => {
            return <PinLabel label={item.label ?? item.name} />;
          }),
      })),
    ],
    outputs: [
      execPinOutput(width),
      {
        name: 'payload',
        type: 'port',
        position: {
          x: buildPinPosX(width, 'output'),
          y: buildPinPosY(1),
        },
        component: () => {
          return <OutputPinLabel label="payload" width={width / 2} />;
        },
      },
    ],
    code: ({ node, getConnectionInput, buildPinVarName }) => {
      const payload = buildPinVarName('payload');

      const getInput = (name: string) => {
        return (
          getConnectionInput(name) ??
          JSON.stringify(node.data?.[name]) ??
          undefined
        );
      };

      // 必要性验证
      const invalidInput = options.inputList
        .filter((input) => input.required === true)
        .filter((item) => {
          const d = getInput(item.name);
          return isEmpty(d) || d === '""';
        });
      if (invalidInput.length > 0) {
        return `// [${options.label}] required params: ${invalidInput
          .map((item) => item.label ?? item.name)
          .join(', ')}\n`;
      }

      const inputVarList = options.inputList.map<[string, string]>((input) => [
        input.name,
        getInput(input.name),
      ]);

      const body = inputVarList
        .filter((v) => v[1] !== undefined)
        .map((v) => `${v[0]}: ${v[1]}`)
        .join(', ');

      if (options.constructWrapper) {
        return `const ${payload} = ${options.constructWrapper}({ ${body} });\n`;
      } else {
        return `const ${payload} = { ${body} };\n`;
      }
    },
  };
};

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
          y: buildPinPosY(1),
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
          y: buildPinPosY(i + 1),
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
        .map((item) => `${item.name}: ${buildPinVarName(item.name)}`)
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
