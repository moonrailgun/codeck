import React from 'react';
import { CodeckNodeDefinition } from '../../../store/node';
import { BaseNode } from '../../BaseNode';
import { DEFAULT_CORE_CATEGORY } from '../../../utils/consts';
import { buildNodeHeight, defaultNodeWidth } from '../../../utils/size-helper';
import { standard } from '../../..';

const width = defaultNodeWidth;
const height = buildNodeHeight(1);

export const LengthNodeDefinition: CodeckNodeDefinition = {
  name: 'length',
  label: 'Length',
  type: 'call',
  component: BaseNode,
  width,
  height,
  category: DEFAULT_CORE_CATEGORY,
  inputs: [
    standard
      .pin({
        name: 'array',
        width,
        position: 1,
      })
      .port.input.base(),
  ],
  outputs: [
    {
      ...standard
        .pin({
          name: 'length',
          width,
          position: 1,
        })
        .port.output.base(),
      code: ({ node, getConnectionInput }) => {
        const array = getConnectionInput('array') ?? '[]';

        return `${array}.length`;
      },
    },
  ],
};
