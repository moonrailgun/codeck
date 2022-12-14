import { SHAPE_NAME_OF_NODE } from '../utils/consts';
import Konva from 'konva';
import React, { PropsWithChildren, useRef } from 'react';
import { Group } from 'react-konva';
import { useUIStore } from '../store/ui';
import { useMemoizedFn } from 'ahooks';

export const BaseNodeWrapper: React.FC<
  PropsWithChildren<{
    x?: number;
    y?: number;
    nodeId: string;
  }>
> = React.memo((props) => {
  const prevPosRef = useRef<Konva.Vector2d | null>(null);

  const handleClick = useMemoizedFn((e: Konva.KonvaEventObject<MouseEvent>) => {
    e.cancelBubble = true;

    if (!e.evt.shiftKey) {
      useUIStore.getState().clearSelectedStatus();
    }

    useUIStore.getState().addSelectedNodes([props.nodeId]);
  });

  const handleDragStart = useMemoizedFn(
    (e: Konva.KonvaEventObject<DragEvent>) => {
      e.cancelBubble = true;

      prevPosRef.current = e.target.getPosition();
      const { selectedNodeIds, clearSelectedStatus, addSelectedNodes } =
        useUIStore.getState();
      if (!selectedNodeIds.includes(props.nodeId)) {
        clearSelectedStatus();
        addSelectedNodes([props.nodeId]);
      }
    }
  );
  const handleDragMove = useMemoizedFn(
    (e: Konva.KonvaEventObject<DragEvent>) => {
      e.cancelBubble = true;

      if (!prevPosRef.current) {
        return;
      }

      const currentPos = e.target.getPosition();
      const deltaX = currentPos.x - prevPosRef.current.x;
      const deltaY = currentPos.y - prevPosRef.current.y;
      useUIStore.getState().moveSelected(deltaX, deltaY);
      prevPosRef.current = currentPos;
    }
  );
  const handleDragEnd = useMemoizedFn(
    (e: Konva.KonvaEventObject<DragEvent>) => {
      e.cancelBubble = true;

      if (!prevPosRef.current) {
        return;
      }

      const currentPos = e.target.getPosition();
      const deltaX = currentPos.x - prevPosRef.current.x;
      const deltaY = currentPos.y - prevPosRef.current.y;
      useUIStore.getState().moveSelected(deltaX, deltaY);
      prevPosRef.current = null;
    }
  );

  return (
    <Group
      x={props.x}
      y={props.y}
      nodeId={props.nodeId}
      name={SHAPE_NAME_OF_NODE}
      draggable={true}
      onClick={handleClick}
      onDragStart={handleDragStart}
      onDragMove={handleDragMove}
      onDragEnd={handleDragEnd}
    >
      {props.children}
    </Group>
  );
});
BaseNodeWrapper.displayName = 'BaseNodeWrapper';
