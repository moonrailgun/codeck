import React, { useEffect, useLayoutEffect, useRef } from 'react';
import { Stage } from 'react-konva';
import Konva from 'konva';
import { GridLayer } from './GridLayer';
import { useMemoizedFn, useSize } from 'ahooks';
import { useStageStore } from '../../store/stage';
import { NodeLayer } from './NodeLayer';
import { ConnectionLayer } from './ConnectionLayer';
import { ContextMenuWrapper } from '../ContextMenu';
import { useStage } from '../../hooks/useStage';
import { useUIStore } from '../../store/ui';
import './nodes/__all__';

const scaleBy = 1.05;

export const FlowEditor: React.FC = React.memo(() => {
  const {
    width,
    height,
    scale,
    setStageRef,
    setSize,
    setScale,
    position,
    setPosition,
  } = useStageStore();
  const stageRef = useRef<Konva.Stage>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const size = useSize(containerRef.current);

  useEffect(() => {
    if (size) {
      setSize(size.width, size.height);
    }
  }, [size]);

  useEffect(() => {
    setStageRef(stageRef.current);
  }, []);

  useEffect(() => {
    if (!containerRef.current) {
      return;
    }

    const handleKeydown = (e: KeyboardEvent) => {
      if (e.key === 'Backspace' || e.key === 'Delete') {
        useUIStore.getState().deleteAllSelected();
        return;
      }

      if (e.key === 'f') {
        useStageStore.getState().resetPosition();
        return;
      }
    };

    window.addEventListener('keydown', handleKeydown);

    return () => {
      window.removeEventListener('keydown', handleKeydown);
    };
  }, []);

  useStage((stage) => {
    const handleClick = (e: Konva.KonvaEventObject<MouseEvent>) => {
      useUIStore.getState().clearSelectedStatus();
    };

    stage.on('click', handleClick);

    return () => {
      stage.off('click', handleClick);
    };
  });

  const handleWheel = useMemoizedFn((e: Konva.KonvaEventObject<WheelEvent>) => {
    e.evt.preventDefault();
    const stage = e.target as Konva.Stage;
    if (!stage) {
      return;
    }

    const oldScale = stage.scaleX();
    const pointer = stage.getPointerPosition();
    if (!pointer) {
      return;
    }

    const mousePointTo = {
      x: (pointer.x - stage.x()) / oldScale,
      y: (pointer.y - stage.y()) / oldScale,
    };

    // how to scale? Zoom in? Or zoom out?
    let direction = e.evt.deltaY > 0 ? 1 : -1;

    // when we zoom on trackpad, e.evt.ctrlKey is true
    // in that case lets revert direction
    if (e.evt.ctrlKey) {
      direction = -direction;
    }

    const newScale = direction > 0 ? oldScale * scaleBy : oldScale / scaleBy;

    setScale(newScale);

    const newPos = {
      x: pointer.x - mousePointTo.x * newScale,
      y: pointer.y - mousePointTo.y * newScale,
    };
    setPosition(newPos);
  });

  const handleUpdatePos = useMemoizedFn(
    (e: Konva.KonvaEventObject<DragEvent>) => {
      setPosition(e.target.position());
    }
  );

  return (
    <ContextMenuWrapper ref={containerRef} className="h-full w-full">
      <Stage
        ref={stageRef}
        className="h-full w-full"
        width={width}
        height={height}
        scale={scale}
        x={position.x}
        y={position.y}
        onWheel={handleWheel}
        onDragMove={handleUpdatePos}
        onDragEnd={handleUpdatePos}
        draggable={true}
      >
        <GridLayer />
        <NodeLayer />
        <ConnectionLayer />
      </Stage>
    </ContextMenuWrapper>
  );
});
FlowEditor.displayName = 'FlowEditor';
