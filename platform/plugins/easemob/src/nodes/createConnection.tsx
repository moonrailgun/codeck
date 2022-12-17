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
  OutputPinLabel,
} from 'codeck';
import { EASEMOB_CATEGORY } from '../const';

// Docs: http://docs-im-beta.easemob.com/document/web/quickstart.html

const width = 280;
const height = buildNodeHeight(6);

export const CreateConnectionNodeDefinition: CodeckNodeDefinition = {
  name: 'easemob:createConnection',
  label: 'FE 创建环信连接实例(密码登录)',
  type: 'function',
  component: BaseNode,
  width,
  height,
  category: EASEMOB_CATEGORY,
  inputs: [
    standard.execPinInput(width),
    {
      name: 'appKey',
      type: 'port',
      position: {
        x: buildPinPosX(width, 'input'),
        y: buildPinPosY(1),
      },
      component: ({ nodeId }) => {
        return <TextInputPreset nodeId={nodeId} name="appKey" label="appKey" />;
      },
    },
    {
      name: 'username',
      type: 'port',
      position: {
        x: buildPinPosX(width, 'input'),
        y: buildPinPosY(3),
      },
      component: ({ nodeId }) => {
        return (
          <TextInputPreset nodeId={nodeId} name="username" label="username" />
        );
      },
    },
    {
      name: 'password',
      type: 'port',
      position: {
        x: buildPinPosX(width, 'input'),
        y: buildPinPosY(5),
      },
      component: ({ nodeId }) => {
        return (
          <TextInputPreset nodeId={nodeId} name="password" label="password" />
        );
      },
    },
  ],
  outputs: [
    standard.execPinOutput(width),
    {
      name: 'onLoginSuccess',
      type: 'exec',
      position: {
        x: buildPinPosX(width, 'output'),
        y: buildPinPosY(1),
      },
      component: ({ nodeId }) => {
        return <OutputPinLabel label="onLoginSuccess" width={width / 2} />;
      },
    },
    {
      name: 'onLoginFailed',
      type: 'exec',
      position: {
        x: buildPinPosX(width, 'output'),
        y: buildPinPosY(2),
      },
      component: ({ nodeId }) => {
        return <OutputPinLabel label="onLoginFailed" width={width / 2} />;
      },
    },
    {
      name: 'conn',
      type: 'port',
      position: {
        x: buildPinPosX(width, 'output'),
        y: buildPinPosY(3),
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
  code: ({
    node,
    getConnectionInput,
    buildPinVarName,
    getConnectionExecOutput,
  }) => {
    const appKey =
      getConnectionInput('appKey') ?? JSON.stringify(node.data?.appKey ?? '');
    const username =
      getConnectionInput('username') ??
      JSON.stringify(node.data?.username ?? '');
    const password =
      getConnectionInput('password') ??
      JSON.stringify(node.data?.password ?? '');
    const conn = buildPinVarName('conn');
    const onLoginSuccess =
      getConnectionExecOutput('onLoginSuccess')
        ?.trim()
        .split('\n')
        .join('\n    ') ?? '';
    const onLoginFailed =
      getConnectionExecOutput('onLoginFailed')
        ?.trim()
        .split('\n')
        .join('\n    ') ?? '';

    return `const ${conn} = new WebIM.connection({appKey: ${appKey}});
${conn}.open({user: ${username}, pwd: ${password}})
  .then(() => {
    ${onLoginSuccess}
  })
  .catch(() => {
    ${onLoginFailed}
  });
`;
  },
};
