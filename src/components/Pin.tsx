import React from 'react';
import { Group } from 'react-konva';
import { TaichuNodePinDefinition } from '../store/node';
import { ExecPin } from './ExecPin';
import { PortPin } from './PortPin';

export const Pin: React.FC<{
  nodeId: string;
  definition: TaichuNodePinDefinition;
  onConnectionStart: () => void;
}> = React.memo((props) => {
  const { type, position, component } = props.definition;

  return (
    <Group>
      {type === 'exec' ? (
        <ExecPin
          x={position.x}
          y={position.y}
          onConnectionStart={(e) => {
            e.cancelBubble = true;
            props.onConnectionStart();
          }}
        />
      ) : (
        <PortPin
          x={position.x}
          y={position.y}
          onConnectionStart={(e) => {
            e.cancelBubble = true;
            props.onConnectionStart();
          }}
        />
      )}

      {component &&
        React.createElement(component, {
          nodeId: props.nodeId,
        })}
    </Group>
  );
});
Pin.displayName = 'Pin';
