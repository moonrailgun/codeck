import Konva from 'konva';
import React from 'react';
import { Group, Rect, Text } from 'react-konva';
import { useNodeInfo } from '../../../hooks/useNodeInfo';
import { useConnectionStore } from '../../../store/connection';
import { TaichuNodeComponentProps } from '../../../store/node';
import { color } from '../../../utils/color';
import { Pin } from '../../Pin';

export const VariableNode: React.FC<TaichuNodeComponentProps> = React.memo(
  (props) => {
    const { startConnect } = useConnectionStore();
    const nodeId = props.id;
    const { node, definition, updatePos } = useNodeInfo(nodeId);
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
          height={34}
          opacity={0.8}
          cornerRadius={5}
          shadowColor="black"
          shadowBlur={10}
          shadowOpacity={0.5}
          fillLinearGradientStartPoint={{ x: 0, y: 0 }}
          fillLinearGradientEndPoint={{ x: width, y: height }}
          fillLinearGradientColorStops={[
            0,
            color.variable['data'],
            1,
            color.nodeBoxGradient.end,
          ]}
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

        {definition.inputs.map((inputPin) => (
          <Pin
            key={node.id + inputPin.name}
            nodeId={nodeId}
            definition={inputPin}
            onConnectionStart={() => {
              startConnect(props.id, inputPin.name, inputPin.type, 'in-out');
            }}
          />
        ))}

        {definition.outputs.map((outputPin) => (
          <Pin
            key={node.id + outputPin.name}
            nodeId={nodeId}
            definition={outputPin}
            onConnectionStart={() => {
              startConnect(props.id, outputPin.name, outputPin.type, 'out-in');
            }}
          />
        ))}
      </Group>
    );
  }
);
VariableNode.displayName = 'VariableNode';
