import Konva from 'konva';
import React, { PropsWithChildren, useCallback } from 'react';
import { Group } from 'react-konva';
import { useNodeStore } from '../../../store/node';
import { useUIStore } from '../../../store/ui';

export const BaseNodeWrapper: React.FC<
  PropsWithChildren<{
    x?: number;
    y?: number;
    nodeId: string;
  }>
> = React.memo((props) => {
  const updatePos = useCallback(
    (position: Konva.Vector2d) => {
      useNodeStore.getState().updateNodePos(props.nodeId, position);
    },
    [props.nodeId]
  );

  return (
    <Group
      x={props.x}
      y={props.y}
      draggable={true}
      onClick={(e) => {
        e.cancelBubble = true;

        if (!e.evt.metaKey) {
          useUIStore.getState().clearSelectedStatus();
        }

        useUIStore.getState().addSelectedNodes([props.nodeId]);
      }}
      onDragStart={(e) => {
        e.cancelBubble = true;
      }}
      onDragMove={(e) => {
        e.cancelBubble = true;
        updatePos(e.target.position());
      }}
      onDragEnd={(e) => {
        e.cancelBubble = true;
        updatePos(e.target.position());
      }}
    >
      {props.children}
    </Group>
  );
});
BaseNodeWrapper.displayName = 'BaseNodeWrapper';
