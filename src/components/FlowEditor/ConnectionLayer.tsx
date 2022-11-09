import { useUpdate } from 'ahooks';
import React from 'react';
import { Layer, Line } from 'react-konva';
import { useUpdateRef } from '../../hooks/useUpdateRef';
import { useConnectionStore } from '../../store/connection';
import { useStageStore } from '../../store/stage';
import { useStage } from '../../hooks/useStage';

/**
 * 仅用于绘制
 * 因为线条的刷新频率比较高，所以单独放一个layer
 */
export const ConnectionLayer: React.FC = React.memo(() => {
  const { workingConnection } = useConnectionStore();
  const { getPointerPosition, calcAbsolutePositionToRelative } =
    useStageStore();
  const updateDraw = useUpdate();

  const workingConnectionRef = useUpdateRef(workingConnection);

  useStage((stage) => {
    const mouseMoveHandler = () => {
      if (workingConnectionRef.current) {
        updateDraw();
      }
    };

    stage.on('mousemove', mouseMoveHandler);

    return () => {
      stage.off('mousemove', mouseMoveHandler);
    };
  });

  let workingConnectionEl: React.ReactNode = null;
  if (workingConnection) {
    const fromPos = calcAbsolutePositionToRelative(
      workingConnection.from.getAbsolutePosition()
    );
    const toPos = calcAbsolutePositionToRelative(getPointerPosition());

    const dir = workingConnection.type === 'out' ? 1 : -1;

    let holdLen = (toPos.x - fromPos.x) / 3; // 确保初始方向正确
    const diffY = Math.abs(toPos.y - fromPos.y);
    // let diffX = Math.abs(toPos.x - fromPos.x);
    holdLen = dir * (Math.abs(holdLen) + diffY / 4);

    let mid1 = {
      x: fromPos.x + holdLen,
      y: fromPos.y,
    };
    let mid2 = {
      x: toPos.x - holdLen,
      y: toPos.y,
    };

    workingConnectionEl = (
      <Line
        strokeWidth={2}
        stroke="white"
        bezier={true}
        points={[
          fromPos.x,
          fromPos.y,
          mid1.x,
          mid1.y,
          mid2.x,
          mid2.y,
          toPos.x,
          toPos.y,
        ]}
      />
    );
  }

  return (
    <Layer listening={false}>
      {/* other connection */}

      {workingConnectionEl}
    </Layer>
  );
});
ConnectionLayer.displayName = 'ConnectionLayer';
