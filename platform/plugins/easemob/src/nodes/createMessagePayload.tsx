import React from 'react';
import {
  BooleanInputPreset,
  SelectInputPreset,
  buildNodeHeight,
  CodeckNodeDefinition,
  standard,
  TextInputPreset,
} from 'codeck';
import { EASEMOB_CATEGORY } from '../const';

const width = 180;
const height = buildNodeHeight(14);

export const CreateMessagePayloadNodeDefinition: CodeckNodeDefinition = {
  ...standard.objConstructNode({
    name: 'easemob:createMessagePayload',
    label: 'FE 构造环信消息体',
    width,
    height,
    category: EASEMOB_CATEGORY,
    inputList: [
      {
        name: 'chatType',
        position: 1,
        required: true,
        component: ({ nodeId }) => (
          <SelectInputPreset
            nodeId={nodeId}
            name="chatType"
            label="chatType"
            options={[
              {
                label: '私聊',
                value: 'singleChat',
              },
              {
                label: '群聊',
                value: 'groupChat',
              },
              {
                label: '聊天室',
                value: 'chatRoom',
              },
            ]}
          />
        ),
      },
      {
        name: 'type',
        position: 3,
        required: true,
        component: ({ nodeId }) => (
          <SelectInputPreset
            nodeId={nodeId}
            name="type"
            label="type"
            options={[
              {
                label: 'txt',
                value: 'txt',
              },
            ]}
          />
        ),
      },
      {
        name: 'to',
        position: 5,
        required: true,
        component: ({ nodeId }) => (
          <TextInputPreset nodeId={nodeId} name="to" label="to" />
        ),
      },
      {
        name: 'msg',
        position: 7,
        required: true,
        component: ({ nodeId }) => (
          <TextInputPreset nodeId={nodeId} name="msg" label="msg" />
        ),
      },
      {
        name: 'from',
        position: 9,
        component: ({ nodeId }) => (
          <TextInputPreset nodeId={nodeId} name="from" label="from" />
        ),
      },
      {
        name: 'ext',
        position: 11,
      },
      {
        name: 'msgConfig',
        position: 12,
      },
      {
        name: 'isChatThread',
        position: 13,
        component: ({ nodeId }) => (
          <BooleanInputPreset
            nodeId={nodeId}
            name="isChatThread"
            label="isChatThread"
          />
        ),
      },
    ],
    constructWrapper: 'WebIM.message.create',
  }),
  prepare: [
    {
      type: 'import',
      module: 'easemob-websdk',
      member: ['default', 'WebIM'],
    },
  ],
};
