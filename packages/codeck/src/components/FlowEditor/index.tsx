import React, { useEffect, useRef, useState } from 'react';
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
import '../../nodes/__all__';
import {
  resetFlowEditorCursorStyle,
  setFlowEditorCursorStyle,
} from '../../utils/pointer-helper';
import { SelectionLayer } from './SelectionLayer';
import { useConnectionStore } from '../../store/connection';

const scaleBy = 1.05; // 缩放系数

export const FlowEditor: React.FC = React.memo(() => {
  const { width, height, scale, setStageRef, setSize, position } =
    useStageStore();
  const stageRef = useRef<Konva.Stage>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const size = useSize(containerRef.current);
  const { draggable, handleWheel, handleUpdatePos } = useStageEventHandler();

  useEffect(() => {
    if (size) {
      setSize(size.width, size.height);
    }
  }, [size]);

  useEffect(() => {
    setStageRef(stageRef.current);
  }, []);

  return (
    <ContextMenuWrapper ref={containerRef} className="h-full w-full">
      <Stage
        ref={stageRef}
        className="h-full w-full flow-editor"
        width={width}
        height={height}
        scale={scale}
        x={position.x}
        y={position.y}
        onWheel={handleWheel}
        onDragMove={handleUpdatePos}
        onDragEnd={handleUpdatePos}
        draggable={draggable}
      >
        <GridLayer />
        <NodeLayer />
        <ConnectionLayer />
        <SelectionLayer />
      </Stage>
    </ContextMenuWrapper>
  );
});
FlowEditor.displayName = 'FlowEditor';

function useStageEventHandler() {
  const { setScale, setPosition } = useStageStore();
  const [draggable, setDraggable] = useState(false);

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

  /**
   * Stage 事件
   */
  useStage((stage) => {
    const handleClick = (e: Konva.KonvaEventObject<MouseEvent>) => {
      useUIStore.getState().clearSelectedStatus();
    };

    const handleMouseUp = (e: Konva.KonvaEventObject<MouseEvent>) => {
      useConnectionStore.getState().cancelConnect();
    };

    stage.on('click', handleClick);
    stage.on('mouseup', handleMouseUp);

    return () => {
      stage.off('click', handleClick);
      stage.off('mouseup', handleMouseUp);
    };
  });

  /**
   * window事件
   */
  useStage((stage) => {
    const container = stage.container();
    if (!container) {
      return;
    }

    const handleKeydown = (e: KeyboardEvent) => {
      if (e.code === 'Backspace' || e.code === 'Delete') {
        useUIStore.getState().deleteAllSelected();
        return;
      }

      if (e.code === 'KeyF') {
        useStageStore.getState().focus();
        return;
      }

      if (e.code === 'Space') {
        setDraggable(true);
        setFlowEditorCursorStyle('grab');
        return;
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        setDraggable(false);
        resetFlowEditorCursorStyle();
        return;
      }
    };

    window.addEventListener('keydown', handleKeydown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeydown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  });

  return { draggable, handleWheel, handleUpdatePos };
}
