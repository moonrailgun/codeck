import React from 'react';
import { CodeckNodeDefinition } from '../../../store/node';
import { BaseNode } from '../../BaseNode';
import { DEFAULT_CORE_CATEGORY } from '../../../utils/consts';
import { buildNodeHeight, defaultNodeWidth } from '../../../utils/size-helper';
import { standard } from '../../..';

const width = defaultNodeWidth;
const height = buildNodeHeight(3);

export const IncludesNodeDefinition: CodeckNodeDefinition = {
  name: 'includes',
  label: 'Includes',
  type: 'call',
  component: BaseNode,
  width,
  height,
  category: DEFAULT_CORE_CATEGORY,
  inputs: [
    standard
      .pin({
        name: 'data',
        width,
        position: 1,
      })
      .port.input.base(),
    standard
      .pin({
        name: 'item',
        width,
        position: 2,
      })
      .port.input.text(),
  ],
  outputs: [
    {
      ...standard
        .pin({
          name: 'has',
          width,
          position: 1,
        })
        .port.output.base(),
      code: ({ node, getConnectionInput }) => {
        const data = getConnectionInput('data') ?? '{}';
        const item = getConnectionInput('item') ?? '""';

        return `${data}.includes(${item})`;
      },
    },
  ],
};
