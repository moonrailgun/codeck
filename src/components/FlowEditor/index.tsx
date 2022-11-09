import React, { useEffect, useRef } from 'react';
import { Stage } from 'react-konva';
import Konva from 'konva';
import { GridLayer } from './GridLayer';
import { useMemoizedFn } from 'ahooks';
import { useStageStore } from '../../store/stage';
import { NodeLayer } from './NodeLayer';
import { ConnectionLayer } from './ConnectionLayer';
import './nodes/__all__';

const scaleBy = 1.05;

export const FlowEditor: React.FC = React.memo(() => {
  const { width, height, scale, setStageRef, setScale, position, setPosition } =
    useStageStore();
  const stageRef = useRef<Konva.Stage>(null);

  useEffect(() => {
    setStageRef(stageRef.current);
  }, []);

  const handleWheel = useMemoizedFn((e: Konva.KonvaEventObject<WheelEvent>) => {
    e.evt.preventDefault();
    const stage = e.target as Konva.Stage;

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
  );
});
FlowEditor.displayName = 'FlowEditor';
