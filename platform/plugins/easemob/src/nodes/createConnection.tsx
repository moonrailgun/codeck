import React from 'react';
import {
  BaseNode,
  buildPinPosX,
  buildPinPosY,
  CodeckNodeDefinition,
  STANDARD_PIN_EXEC_IN,
  STANDARD_PIN_EXEC_OUT,
  TextInputPreset,
  buildNodeHeight,
  PinLabel,
} from 'codeck';
import { EASEMOB_CATEGORY } from '../const';

const width = 200;
const height = buildNodeHeight(2);

export const CreateConnectionNodeDefinition: CodeckNodeDefinition = {
  name: 'createConnection',
  label: 'CreateConnection',
  type: 'function',
  component: BaseNode,
  width,
  height,
  category: EASEMOB_CATEGORY,
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
      name: 'appKey',
      type: 'port',
      position: {
        x: buildPinPosX(width, 'input'),
        y: buildPinPosY(2),
      },
      component: ({ nodeId }) => {
        return <TextInputPreset nodeId={nodeId} name="appKey" label="appKey" />;
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
      name: 'conn',
      type: 'port',
      position: {
        x: buildPinPosX(width, 'output'),
        y: buildPinPosY(2),
      },
      component: ({ nodeId }) => {
        return <PinLabel label={'conn'} x={-60} />;
      },
    },
  ],
  prepare: [
    {
      type: 'import',
      module: 'easemob-websdk',
      member: ['default', 'WebIM'],
    },
  ],
  code: ({ node, getConnectionInput, buildPinVarName }) => {
    return `const ${buildPinVarName('conn')} = new WebIM.connection({appKey: ${
      getConnectionInput('appKey') ?? JSON.stringify(node.data?.appKey ?? '')
    }});\n`;
  },
};
