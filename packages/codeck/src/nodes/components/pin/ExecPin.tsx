import Konva from 'konva';
import React, { useState } from 'react';
import { Line } from 'react-konva';

const pinSize = 6;

interface ExecPinProps {
  x: number;
  y: number;
  connected: boolean;
  onConnectionStart: (e: Konva.KonvaEventObject<Event>) => void;
  onConnectionEnd: (e: Konva.KonvaEventObject<Event>) => void;
}

export const ExecPin: React.FC<ExecPinProps> = React.memo((props) => {
  const [strokeWidth, setStrokeWidth] = useState(2);

  return (
    <Line
      x={props.x}
      y={props.y}
      points={[
        pinSize,
        0,
        0,
        -pinSize,
        -pinSize,
        -pinSize,
        -pinSize,
        pinSize,
        0,
        pinSize,
      ]}
      stroke="white"
      strokeWidth={strokeWidth}
      fill={props.connected ? 'white' : ''}
      closed={true}
      onMouseEnter={(e) => {
        setStrokeWidth(3);
      }}
      onMouseLeave={(e) => {
        setStrokeWidth(2);
      }}
      onMouseDown={props.onConnectionStart}
      onMouseUp={props.onConnectionEnd}
    />
  );
});
ExecPin.displayName = 'ExecPin';
