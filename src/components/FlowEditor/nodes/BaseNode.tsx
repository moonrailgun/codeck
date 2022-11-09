import React from 'react';
import { Group, Rect, Text } from 'react-konva';
import { useNodeInfo } from '../../../hooks/useNodeInfo';
import { useConnectionStore } from '../../../store/connection';
import { TaichuNodeComponentProps } from '../../../store/node';
import { color } from '../../../utils/color';
import { ExecPin } from '../../ExecPin';

export const BaseNode: React.FC<TaichuNodeComponentProps> = React.memo(
  (props) => {
    const { startConnect } = useConnectionStore();
    const { node, definition, updatePos } = useNodeInfo(props.id);
    const { width, height, label } = definition;
    const { x, y } = node.position;

    return (
      <Group
        x={x}
        y={y}
        draggable={true}
        onDragStart={(e) => (e.cancelBubble = true)}
        onDragMove={(e) => {
          e.cancelBubble = true;
          updatePos(e.target.position());
        }}
        onDragEnd={(e) => {
          e.cancelBubble = true;
          updatePos(e.target.position());
        }}
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
          fill={color.node[definition.type]}
          cornerRadius={[5, 5, 0, 0]}
        />

        <Text
          x={30}
          y={8}
          fontSize={16}
          text={label}
          width={width}
          height={34}
          fill="white"
        />

        {definition.inputs.map((inputPin) => {
          if (inputPin.type === 'exec') {
            return (
              <ExecPin
                x={inputPin.position.x}
                y={inputPin.position.y}
                onConnectionStart={(e) => {
                  e.cancelBubble = true;
                  startConnect(
                    props.id,
                    inputPin.name,
                    inputPin.type,
                    'in-out'
                  );
                }}
              />
            );
          }

          return null;
        })}

        {definition.outputs.map((outputPin) => {
          if (outputPin.type === 'exec') {
            return (
              <ExecPin
                x={outputPin.position.x}
                y={outputPin.position.y}
                onConnectionStart={(e) => {
                  e.cancelBubble = true;
                  startConnect(
                    props.id,
                    outputPin.name,
                    outputPin.type,
                    'out-in'
                  );
                }}
              />
            );
          }

          return null;
        })}
      </Group>
    );
  }
);
BaseNode.displayName = 'BaseNode';
