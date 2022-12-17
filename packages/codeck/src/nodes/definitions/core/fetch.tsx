import React from 'react';
import { CodeckNodeDefinition } from '../../../store/node';
import { BaseNode } from '../../BaseNode';
import { DEFAULT_CORE_CATEGORY } from '../../../utils/consts';
import { buildNodeHeight } from '../../../utils/size-helper';
import { formatFunctionIndent, standard } from '../../..';

const width = 240;
const height = buildNodeHeight(7);

export const FetchNodeDefinition: CodeckNodeDefinition = {
  name: 'fetch',
  label: 'Fetch',
  type: 'function',
  component: BaseNode,
  width,
  height,
  category: DEFAULT_CORE_CATEGORY,
  inputs: [
    standard.execPinInput(width),
    standard
      .pin({
        name: 'method',
        width,
        position: 1,
      })
      .port.input.select([
        {
          value: 'GET',
          label: 'GET',
        },
        {
          value: 'POST',
          label: 'POST',
        },
        {
          value: 'PUT',
          label: 'PUT',
        },
        {
          value: 'DELETE',
          label: 'DELETE',
        },
      ]),
    standard
      .pin({
        name: 'url',
        width,
        position: 3,
      })
      .port.input.text(),
    standard
      .pin({
        name: 'data',
        width,
        position: 5,
      })
      .port.input.base(),
    standard
      .pin({
        name: 'headers',
        width,
        position: 6,
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
        name: 'text',
        width,
        position: 2,
      })
      .port.output.base(),
    standard
      .pin({
        name: 'json',
        width,
        position: 3,
      })
      .port.output.base(),
    standard
      .pin({
        name: 'onFailed',
        width,
        position: 4,
      })
      .exec.output(),
  ],
  prepare: [
    {
      type: 'function',
      name: 'request',
      parameters: ['url', 'config'],
      body: `return fetch(url, {
  ...config,
  method: config.method || 'GET',
})`,
    },
  ],
  code: ({
    node,
    buildPinVarName,
    getConnectionInput,
    getConnectionExecOutput,
  }) => {
    const method =
      getConnectionInput('method') ??
      JSON.stringify(node.data?.method ?? 'GET');
    const url =
      getConnectionInput('url') ?? JSON.stringify(node.data?.url ?? '');
    const body = getConnectionInput('data') ?? 'undefined';
    const headers = getConnectionInput('headers') ?? 'undefined';

    const onSuccess =
      formatFunctionIndent(getConnectionExecOutput('onSuccess'), 4) ?? '';
    const text = buildPinVarName('text');
    const json = buildPinVarName('json');
    const onFailed =
      formatFunctionIndent(getConnectionExecOutput('onFailed'), 4) ?? '';

    return `request(${url}, { method: ${method}, body: ${body}, headers: ${headers} })
  .then((res) => {
    return res.text();
  })
  .then((text) => {
    const ${text} = text;
    let ${json} = {};
    try {
      ${json} = JSON.parse(text);
    } catch(e) {}

    ${onSuccess}
  })
  .catch((err) => {
    ${onFailed}
  });
`;
  },
};
