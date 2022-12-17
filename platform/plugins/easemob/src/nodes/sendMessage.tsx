import React from 'react';
import {
  BaseNode,
  CodeckNodeDefinition,
  buildNodeHeight,
  standard,
} from 'codeck';
import { EASEMOB_CATEGORY } from '../const';

const width = 200;
const height = buildNodeHeight(3);

export const SendMessageNodeDefinition: CodeckNodeDefinition = {
  name: 'easemob:sendMessage',
  label: 'FE 发送消息',
  type: 'function',
  component: BaseNode,
  width,
  height,
  category: EASEMOB_CATEGORY,
  inputs: [
    standard.execPinInput(width),
    standard
      .pin({
        name: 'conn',
        width,
        position: 1,
      })
      .port.input.base(),
    standard
      .pin({
        name: 'payload',
        width,
        position: 2,
      })
      .port.input.base(),
  ],
  outputs: [
    standard.execPinOutput(width),
    standard
      .pin({
        name: 'onSuccess',
        width,
        position: 1,
      })
      .exec.output(),
    standard
      .pin({
        name: 'result',
        width,
        position: 2,
      })
      .port.output.base(),
    standard
      .pin({
        name: 'onFailed',
        width,
        position: 3,
      })
      .exec.output(),
  ],
  code: ({
    node,
    getConnectionInput,
    buildPinVarName,
    getConnectionExecOutput,
  }) => {
    const conn = getConnectionInput('conn');
    const payload = getConnectionInput('payload');
    const onSuccess =
      getConnectionExecOutput('onSuccess')?.trim().split('\n').join('\n    ') ??
      '';
    const result = buildPinVarName('result');
    const onFailed =
      getConnectionExecOutput('onFailed')?.trim().split('\n').join('\n    ') ??
      '';

    if (!conn) {
      return '// 需要输入conn';
    }

    return `${conn}.send(${payload})
  .then((${result}) => {
    ${onSuccess}
  })
  .catch((err) => {
    ${onFailed}
  });\n`;
  },
};
