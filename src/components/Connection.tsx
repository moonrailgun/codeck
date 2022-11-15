import React from 'react';
import Konva from 'konva';
import { Line } from 'react-konva';

interface ConnectionProps {
  from: Konva.Vector2d;
  to: Konva.Vector2d;
  direction: 'out-in' | 'in-out';
  isActive?: boolean;
  onClick?: (evt: Konva.KonvaEventObject<MouseEvent>) => void;
}
export const Connection: React.FC<ConnectionProps> = React.memo((props) => {
  const { from, to, direction, isActive, onClick } = props;
  const dir = direction === 'out-in' ? 1 : -1;

  let holdLen = (to.x - from.x) / 3; // 确保初始方向正确
  const diffY = Math.abs(to.y - from.y);
  holdLen = dir * (Math.abs(holdLen) + diffY / 4);

  const mid1 = {
    x: from.x + holdLen,
    y: from.y,
  };
  const mid2 = {
    x: to.x - holdLen,
    y: to.y,
  };

  return (
    <Line
      strokeWidth={isActive ? 4 : 2}
      stroke="white"
      bezier={true}
      points={[from.x, from.y, mid1.x, mid1.y, mid2.x, mid2.y, to.x, to.y]}
      onClick={onClick}
    />
  );
});
Connection.displayName = 'Connection';
