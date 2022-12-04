import Konva from 'konva';
import React, { useState } from 'react';
import { Circle, Line } from 'react-konva';

const pinSize = 6;
const triangleSize = 3;

interface PortPinProps {
  x: number;
  y: number;
  connected: boolean;
  onConnectionStart: (e: Konva.KonvaEventObject<Event>) => void;
  onConnectionEnd: (e: Konva.KonvaEventObject<Event>) => void;
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
        fill={props.connected ? 'white' : ''}
        onMouseEnter={(e) => {
          setStrokeWidth(3);
        }}
        onMouseLeave={(e) => {
          setStrokeWidth(2);
        }}
        onMouseDown={props.onConnectionStart}
        onMouseUp={props.onConnectionEnd}
      />

      {/* 用于装饰的小三角 */}
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
