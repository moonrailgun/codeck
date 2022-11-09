import React from 'react';
import Konva from 'konva';
import { Line } from 'react-konva';

interface ConnectionProps {
  from: Konva.Vector2d;
  to: Konva.Vector2d;
  direction: 'out-in' | 'in-out';
}
export const Connection: React.FC<ConnectionProps> = React.memo((props) => {
  const { from, to, direction } = props;
  const dir = direction === 'out-in' ? 1 : -1;

  let holdLen = (to.x - from.x) / 3; // 确保初始方向正确
  const diffY = Math.abs(to.y - from.y);
  holdLen = dir * (Math.abs(holdLen) + diffY / 4);

  let mid1 = {
    x: from.x + holdLen,
    y: from.y,
  };
  let mid2 = {
    x: to.x - holdLen,
    y: to.y,
  };

  return (
    <Line
      strokeWidth={2}
      stroke="white"
      bezier={true}
      points={[from.x, from.y, mid1.x, mid1.y, mid2.x, mid2.y, to.x, to.y]}
    />
  );
});
Connection.displayName = 'Connection';
