import React from 'react';
import {
  BaseNode,
  buildPinPosX,
  buildPinPosY,
  CodeckNodeDefinition,
  TextInputPreset,
  buildNodeHeight,
  PinLabel,
  standard,
} from 'codeck';
import { EASEMOB_CATEGORY } from '../const';

const width = 240;
const height = buildNodeHeight(3);

export const ConnAddEventHandlerNodeDefinition: CodeckNodeDefinition = {
  name: 'easemob:connAddEventHandler',
  label: 'ConnAddEventHandler',
  type: 'function',
  component: BaseNode,
  width,
  height,
  category: EASEMOB_CATEGORY,
  inputs: [
    standard.execPinInput(width),
    {
      name: 'conn',
      type: 'port',
      position: {
        x: buildPinPosX(width, 'input'),
        y: buildPinPosY(2),
      },
      component: ({ nodeId }) => {
        return <PinLabel label={'conn'} />;
      },
    },
    {
      name: 'id',
      type: 'port',
      position: {
        x: buildPinPosX(width, 'input'),
        y: buildPinPosY(3),
      },
      defaultValue: 'default',
      component: ({ nodeId }) => {
        return <TextInputPreset nodeId={nodeId} name="id" label="id" />;
      },
    },
  ],
  outputs: [
    standard.execPinOutput(width),
    {
      name: 'onTextMessage',
      type: 'exec',
      position: {
        x: buildPinPosX(width, 'output'),
        y: buildPinPosY(2),
      },
      component: ({ nodeId }) => {
        return <PinLabel label="onTextMessage" x={-130} />;
      },
    },
    {
      name: 'data',
      type: 'port',
      position: {
        x: buildPinPosX(width, 'output'),
        y: buildPinPosY(3),
      },
      component: ({ nodeId }) => {
        return <PinLabel label="data" x={-60} />;
      },
    },
  ],
  code: ({
    node,
    getConnectionInput,
    buildPinVarName,
    getConnectionExecOutput,
  }) => {
    const data = buildPinVarName('data');
    const conn = getConnectionInput('conn');
    const eventId =
      getConnectionInput('id') ?? JSON.stringify(node.data?.id ?? 'default');
    const onTextMessage = getConnectionExecOutput('onTextMessage');

    return `${conn}.addEventHandler(${eventId}, {
  onMessage: (${data}) => {
    ${onTextMessage}
  },
});\n`;
  },
};
