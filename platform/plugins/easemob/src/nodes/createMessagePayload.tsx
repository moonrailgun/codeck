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

export const CreateMessagePayloadNodeDefinition: CodeckNodeDefinition = {
  ...standard.objConstructNode({
    name: 'easemob:createMessagePayload',
    label: '构造环信消息体',
    width: 180,
    height: buildNodeHeight(14),
    category: EASEMOB_CATEGORY,
    inputList: [
      {
        name: 'chatType',
        position: 2,
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
        position: 4,
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
        position: 6,
        required: true,
        component: ({ nodeId }) => (
          <TextInputPreset nodeId={nodeId} name="to" label="to" />
        ),
      },
      {
        name: 'msg',
        position: 8,
        required: true,
        component: ({ nodeId }) => (
          <TextInputPreset nodeId={nodeId} name="msg" label="msg" />
        ),
      },
      {
        name: 'from',
        position: 10,
        component: ({ nodeId }) => (
          <TextInputPreset nodeId={nodeId} name="from" label="from" />
        ),
      },
      {
        name: 'ext',
        position: 12,
      },
      {
        name: 'msgConfig',
        position: 13,
      },
      {
        name: 'isChatThread',
        position: 14,
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
