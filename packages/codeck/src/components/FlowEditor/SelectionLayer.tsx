import { useStage } from '../../hooks/useStage';
import { useStageStore } from '../../store/stage';
import { useUIStore } from '../../store/ui';
import { SHAPE_NAME_OF_NODE } from '../../utils/consts';
import Konva from 'konva';
import React, { useRef, useState } from 'react';
import { Layer, Rect } from 'react-konva';

export const SelectionLayer: React.FC = React.memo(() => {
  const [rect, setRect] = useState({ x1: 0, y1: 0, x2: 0, y2: 0 });
  const [visible, setVisible] = useState(false);
  const selectionRef = useRef<Konva.Rect>(null);

  useStage((stage) => {
    let isSelecting = false;

    const handleMouseDown = (
      e: Konva.KonvaEventObject<MouseEvent | TouchEvent>
    ) => {
      // do nothing if we mousedown on any shape
      if (e.target !== stage) {
        return;
      }

      if (stage.draggable() === true) {
        return;
      }

      const pointerPosition = useStageStore
        .getState()
        .getRelativePointerPosition();

      if (!pointerPosition) {
        return;
      }

      setRect({
        x1: pointerPosition.x,
        y1: pointerPosition.y,
        x2: pointerPosition.x,
        y2: pointerPosition.y,
      });

      setVisible(true);
      isSelecting = true;
    };

    const handleMouseMove = (
      e: Konva.KonvaEventObject<MouseEvent | TouchEvent>
    ) => {
      // do nothing if we didn't start selection
      if (!isSelecting) {
        return;
      }
      e.evt.preventDefault();

      // const pointerPosition = stage.getPointerPosition();
      const pointerPosition = useStageStore
        .getState()
        .getRelativePointerPosition();
      if (!pointerPosition) {
        return;
      }

      setRect((state) => ({
        ...state,
        x2: pointerPosition.x,
        y2: pointerPosition.y,
      }));
    };

    const handleMouseUp = (
      e: Konva.KonvaEventObject<MouseEvent | TouchEvent>
    ) => {
      // do nothing if we didn't start selection
      if (!isSelecting) {
        return;
      }

      // update visibility in timeout, so we can check it in click event
      setTimeout(() => {
        setVisible(false);
        isSelecting = false;
      });

      const shapes = stage.find(`.${SHAPE_NAME_OF_NODE}`);
      const box = selectionRef.current?.getClientRect();
      if (!box) {
        return;
      }

      const selected = shapes.filter((shape) => {
        const intersected = Konva.Util.haveIntersection(
          box,
          shape.getClientRect({
            skipShadow: true,
            skipStroke: true,
          })
        );
        return intersected;
      });

      useUIStore
        .getState()
        .switchSelectNodes(
          selected
            .filter((node) => Boolean(node.attrs['nodeId']))
            .map((node) => node.attrs['nodeId'])
        );
    };

    stage.on('mousedown touchstart', handleMouseDown);
    stage.on('mousemove touchmove', handleMouseMove);
    stage.on('mouseup touchend', handleMouseUp);
    stage.on('mouseleave touchcancel', handleMouseUp);

    return () => {
      stage.off('mousedown touchstart', handleMouseDown);
      stage.off('mousemove touchmove', handleMouseMove);
      stage.off('mouseup touchend', handleMouseUp);
      stage.off('mouseleave touchcancel', handleMouseUp);
    };
  });

  return (
    <Layer>
      <Rect
        ref={selectionRef}
        stroke="rgba(255,255,255,0.5)"
        strokeWidth={1}
        fill="rgba(255,255,255,0.2)"
        visible={visible}
        x={Math.min(rect.x1, rect.x2)}
        y={Math.min(rect.y1, rect.y2)}
        width={Math.abs(rect.x2 - rect.x1)}
        height={Math.abs(rect.y2 - rect.y1)}
      />
    </Layer>
  );
});
SelectionLayer.displayName = 'SelectionLayer';
