import Konva from 'konva';
import React, { useState } from 'react';
import { Line } from 'react-konva';

const pinSize = 6;

interface ExecPinProps {
  x: number;
  y: number;
  onConnectionStart: (e: Konva.KonvaEventObject<Event>) => void;
}

export const ExecPin: React.FC<ExecPinProps> = React.memo((props) => {
  const [strokeWidth, setStrokeWidth] = useState(2);

  return (
    <Line
      x={props.x}
      y={props.y}
      points={[
        0,
        0,
        -pinSize,
        -pinSize,
        -2 * pinSize,
        -pinSize,
        -2 * pinSize,
        pinSize,
        -pinSize,
        pinSize,
      ]}
      stroke="white"
      strokeWidth={strokeWidth}
      fill={''}
      closed={true}
      onMouseEnter={(e) => {
        setStrokeWidth(3);
      }}
      onMouseLeave={(e) => {
        setStrokeWidth(2);
      }}
      onClick={props.onConnectionStart}
      onDragStart={props.onConnectionStart}
    />
  );
});
ExecPin.displayName = 'ExecPin';
