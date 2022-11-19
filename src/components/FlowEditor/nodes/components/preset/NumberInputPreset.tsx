import React from 'react';
import { Group } from 'react-konva';
import { useNodeDataValue } from '../../../../../hooks/useNodeData';
import { useConnectionStore } from '@/store/connection';
import { NodeInputNumber } from '../input/Number';
import { PinLabel } from '../pin/Label';

interface NumberInputPresetProps {
  nodeId: string;
  name: string;
  label: string;
  x: number;
  y: number;
}
export const NumberInputPreset: React.FC<NumberInputPresetProps> = React.memo(
  (props) => {
    const [text = 0, setText] = useNodeDataValue(props.nodeId, props.name);
    const connected = useConnectionStore().checkIsConnected(
      props.nodeId,
      props.name
    );

    return (
      <Group x={props.x} y={props.y}>
        <PinLabel label={props.label} />
        {connected ? null : (
          <NodeInputNumber
            y={20}
            value={Number(text)}
            onChange={(val) => setText(Number(val))}
          />
        )}
      </Group>
    );
  }
);
NumberInputPreset.displayName = 'NumberInputPreset';
