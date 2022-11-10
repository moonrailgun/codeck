import Konva from 'konva';
import React, { useState } from 'react';
import { Circle, Line } from 'react-konva';

const pinSize = 6;
const triangleSize = 3;

interface PortPinProps {
  x: number;
  y: number;
  onConnectionStart: (e: Konva.KonvaEventObject<Event>) => void;
}

export const PortPin: React.FC<PortPinProps> = React.memo((props) => {
  const [strokeWidth, setStrokeWidth] = useState(2);

  return (
    <>
      <Circle
        x={props.x}
        y={props.y}
        radius={pinSize}
        stroke="white"
        strokeWidth={strokeWidth}
        fill={''}
        onMouseEnter={(e) => {
          setStrokeWidth(3);
        }}
        onMouseLeave={(e) => {
          setStrokeWidth(2);
        }}
        onClick={props.onConnectionStart}
      />
      <Line
        x={props.x + pinSize + triangleSize * 2}
        y={props.y}
        points={[
          0,
          0,
          -triangleSize,
          -triangleSize,
          -triangleSize,
          triangleSize,
        ]}
        closed={true}
        fill="white"
      />
    </>
  );
});
PortPin.displayName = 'PortPin';
