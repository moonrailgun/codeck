import React from 'react';
import { Group, Rect, Text } from 'react-konva';
import { useConnectionStore } from '../../../store/connection';
import { color } from '../../../utils/color';
import { ExecPin } from '../../ExecPin';

interface BaseNodeProps {
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  title: string;
}
export const BaseNode: React.FC<BaseNodeProps> = React.memo((props) => {
  const { x = 0, y = 0, width = 150, height = 65, title } = props;
  const { startConnect } = useConnectionStore();

  return (
    <Group
      x={x}
      y={y}
      draggable={true}
      onDragStart={(e) => (e.cancelBubble = true)}
    >
      <Rect
        width={width}
        height={height}
        opacity={0.8}
        cornerRadius={5}
        shadowColor="black"
        shadowBlur={10}
        shadowOpacity={0.5}
        fillLinearGradientStartPoint={{ x: 0, y: 0 }}
        fillLinearGradientEndPoint={{ x: width, y: height }}
        fillLinearGradientColorStops={[
          0,
          color.nodeBoxGradient.start,
          1,
          color.nodeBoxGradient.end,
        ]}
      />

      <Rect
        width={width}
        height={34}
        fill={color.begin}
        cornerRadius={[5, 5, 0, 0]}
      />

      <Text
        x={30}
        y={8}
        fontSize={16}
        text={title}
        width={width}
        height={34}
        fill="white"
      />

      <ExecPin
        x={20}
        y={16}
        onConnectionStart={(e) => {
          e.cancelBubble = true;
          console.log('onConnectionStart', e.currentTarget);
          startConnect(e.currentTarget, 'in');
        }}
      />
      <ExecPin
        x={width - 10}
        y={16}
        onConnectionStart={(e) => {
          e.cancelBubble = true;
          console.log('onConnectionStart', e.currentTarget);
          startConnect(e.currentTarget, 'out');
        }}
      />
    </Group>
  );
});
BaseNode.displayName = 'BaseNode';
