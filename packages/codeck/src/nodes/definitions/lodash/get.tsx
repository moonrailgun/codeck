import React from 'react';
import { CodeckNodeDefinition } from '../../../store/node';
import { BaseNode } from '../../BaseNode';
import { LODASH_CATEGORY } from '../../../utils/consts';
import { buildNodeHeight, defaultNodeWidth } from '../../../utils/size-helper';
import { standard } from '../../..';

const width = defaultNodeWidth;
const height = buildNodeHeight(3);

export const LodashGetNodeDefinition: CodeckNodeDefinition = {
  name: 'lodash:get',
  label: 'Get',
  type: 'call',
  component: BaseNode,
  width,
  height,
  category: LODASH_CATEGORY,
  inputs: [
    standard
      .pin({
        name: 'obj',
        width,
        position: 1,
      })
      .port.input.base(),
    standard
      .pin({
        name: 'path',
        width,
        position: 2,
      })
      .port.input.text(),
  ],
  outputs: [
    {
      ...standard
        .pin({
          name: 'output',
          width,
          position: 1,
        })
        .port.output.base(),
      code: ({ node, getConnectionInput }) => {
        const obj = getConnectionInput('obj') ?? 'null';
        const path =
          getConnectionInput('path') ?? String(node.data?.path ?? '');

        return `_get(${obj}, "${path}")`;
      },
    },
  ],
  prepare: [
    {
      type: 'import',
      module: 'lodash-es',
      member: ['get', '_get'],
    },
  ],
};
