import React from 'react';
import { CodeckNodeDefinition, standard } from 'codeck';
import { EASEMOB_CATEGORY } from '../const';

const width = 220;

export const ParseTextMessagePayloadNodeDefinition: CodeckNodeDefinition =
  standard.objDeconstructNode({
    name: 'easemob:parseTextMessagePayload',
    label: 'FE 解构环信文本消息体',
    width,
    category: EASEMOB_CATEGORY,
    outputList: [
      {
        name: 'id',
      },
      {
        name: 'chatType',
      },
      {
        name: 'to',
      },
      {
        name: 'msg',
      },
      {
        name: 'from',
      },
      {
        name: 'ext',
      },
    ],
  });
