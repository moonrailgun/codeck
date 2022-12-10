import React from 'react';
import { CodeckNodeDefinition } from '../../../../../store/node';
import { BaseNode } from '../../BaseNode';
import {
  DEFAULT_CORE_CATEGORY,
  STANDARD_PIN_EXEC_IN,
  STANDARD_PIN_EXEC_OUT,
} from '../../../../../utils/consts';
import {
  buildNodeHeight,
  buildPinPosX,
  buildPinPosY,
} from '../../../../../utils/size-helper';
import { NumberInputPreset } from '../../components/preset/NumberInputPreset';
import { PinLabel } from '../../components/pin/Label';

const width = 180;
const height = buildNodeHeight(2);

export const LoopNodeDefinition: CodeckNodeDefinition = {
  name: 'loop',
  label: 'Loop',
  type: 'function',
  component: BaseNode,
  width,
  height,
  category: DEFAULT_CORE_CATEGORY,
  inputs: [
    {
      name: STANDARD_PIN_EXEC_IN,
      type: 'exec',
      position: {
        x: buildPinPosX(width, 'input'),
        y: buildPinPosY(1),
      },
    },
    {
      name: 'times',
      type: 'port',
      position: {
        x: buildPinPosX(width, 'input'),
        y: buildPinPosY(2),
      },
      component: ({ nodeId }) => {
        return <NumberInputPreset nodeId={nodeId} name="times" label="times" />;
      },
    },
  ],
  outputs: [
    {
      name: STANDARD_PIN_EXEC_OUT,
      type: 'exec',
      position: {
        x: buildPinPosX(width, 'output'),
        y: buildPinPosY(1),
      },
    },
    {
      name: 'body',
      type: 'exec',
      position: {
        x: buildPinPosX(width, 'output'),
        y: buildPinPosY(2),
      },
      component: ({ nodeId }) => {
        return <PinLabel label={'body'} x={-60} />;
      },
    },
    {
      name: 'inc',
      type: 'port',
      position: {
        x: buildPinPosX(width, 'output'),
        y: buildPinPosY(3),
      },
      component: ({ nodeId }) => {
        return <PinLabel label={'inc'} x={-50} />;
      },
    },
  ],
  code: ({
    node,
    buildPinVarName,
    getConnectionInput,
    getConnectionExecOutput,
  }) => {
    const inc = buildPinVarName('inc');
    const times = getConnectionInput('times') ?? node.data?.times ?? 0;
    const body =
      getConnectionExecOutput('body')?.trim().split('\n').join('\n  ') ?? ''; // 为了确保有合适的缩进

    return `for (let ${inc} = 0; ${inc} < ${times}; ${inc}++) {
  ${body}
}\n`;
  },
};
