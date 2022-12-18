import React from 'react';
import { Rect, Text } from 'react-konva';
import { useNodeData } from '../hooks/useNodeData';
import { useNodeInfo } from '../hooks/useNodeInfo';
import { CodeckNodeComponentProps } from '../store/node';
import { useUIStore } from '../store/ui';
import { color } from '../utils/color';
import { BaseNodeWrapper } from './BaseNodeWrapper';
import { usePinRender } from './hooks/usePinRender';

export const VariableNode: React.FC<CodeckNodeComponentProps> = React.memo(
  (props) => {
    const nodeId = props.id;
    const { node, definition } = useNodeInfo(nodeId);
    const { name } = useNodeData(nodeId);
    const { selectedNodeIds } = useUIStore();
    const pinEl = usePinRender(nodeId);

    if (!node || !definition) {
      return null;
    }

    const { width, height } = definition;
    const { x, y } = node.position;

    return (
      <BaseNodeWrapper x={x} y={y} nodeId={nodeId}>
        <Rect
          width={width}
          height={34}
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
            color.variable['data'],
            1,
            color.nodeBoxGradient.end,
          ]}
        />

        <Text
          x={14}
          y={8}
          fontSize={16}
          text={`Get ${name}`}
          width={width}
          height={34}
          fill="white"
        />

        {pinEl}
      </BaseNodeWrapper>
    );
  }
);
VariableNode.displayName = 'VariableNode';
