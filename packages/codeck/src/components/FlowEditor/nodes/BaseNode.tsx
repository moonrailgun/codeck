import { NODE_TITLE_HEIGHT } from '../../../utils/consts';
import React from 'react';
import { Rect, Text } from 'react-konva';
import { useNodeInfo } from '../../../hooks/useNodeInfo';
import { useConnectionStore } from '../../../store/connection';
import { CodeckNodeComponentProps } from '../../../store/node';
import { useUIStore } from '../../../store/ui';
import { color } from '../../../utils/color';
import { BaseNodeWrapper } from './BaseNodeWrapper';
import { Pin } from './components/pin';

export const BaseNode: React.FC<CodeckNodeComponentProps> = React.memo(
  (props) => {
    const nodeId = props.id;
    const { node, definition } = useNodeInfo(nodeId);
    const { selectedNodeIds } = useUIStore();

    if (!node || !definition) {
      return null;
    }

    const { width, height, label } = definition;
    const { x, y } = node.position;

    return (
      <BaseNodeWrapper x={x} y={y} nodeId={nodeId}>
        <Rect
          width={width}
          height={height}
          opacity={0.8}
          cornerRadius={5}
          shadowColor="black"
          shadowBlur={10}
          shadowOpacity={0.5}
          stroke="white"
          strokeWidth={selectedNodeIds.includes(nodeId) ? 4 : 0}
          fillAfterStrokeEnabled={true}
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
          height={NODE_TITLE_HEIGHT}
          fill={color.node[definition.type]}
          cornerRadius={[5, 5, 0, 0]}
        />

        <Text
          x={30}
          y={0}
          width={width - 30 * 2}
          height={NODE_TITLE_HEIGHT}
          align="left"
          verticalAlign="middle"
          fontSize={16}
          text={label}
          fill="white"
        />

        {definition.inputs.map((inputPin) => (
          <Pin
            key={node.id + inputPin.name}
            nodeId={nodeId}
            definition={inputPin}
            onConnectionStart={() => {
              useConnectionStore
                .getState()
                .startConnect(props.id, inputPin.name, inputPin.type, 'in-out');
            }}
            onConnectionEnd={() => {
              useConnectionStore
                .getState()
                .endConnect(props.id, inputPin.name, inputPin.type, 'in-out');
            }}
          />
        ))}

        {definition.outputs.map((outputPin) => (
          <Pin
            key={node.id + outputPin.name}
            nodeId={nodeId}
            definition={outputPin}
            onConnectionStart={() => {
              useConnectionStore
                .getState()
                .startConnect(
                  props.id,
                  outputPin.name,
                  outputPin.type,
                  'out-in'
                );
            }}
            onConnectionEnd={() => {
              useConnectionStore
                .getState()
                .endConnect(props.id, outputPin.name, outputPin.type, 'out-in');
            }}
          />
        ))}
      </BaseNodeWrapper>
    );
  }
);
BaseNode.displayName = 'BaseNode';
