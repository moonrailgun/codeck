import React from 'react';
import { Group } from 'react-konva';
import { useNodeDataValue } from '../../../../../hooks/useNodeData';
import { useConnectionStore } from '@/store/connection';
import { NodeInputText } from '../input/Text';
import { PinLabel } from '../pin/Label';

interface TextInputPresetProps {
  nodeId: string;
  name: string;
  label: string;
  x?: number;
  y?: number;
}
export const TextInputPreset: React.FC<TextInputPresetProps> = React.memo(
  (props) => {
    const [text, setText] = useNodeDataValue(props.nodeId, props.name);
    const connected = useConnectionStore().checkIsConnected(
      props.nodeId,
      props.name
    );

    return (
      <Group x={props.x} y={props.y}>
        <PinLabel label={props.label} />
        {connected ? null : (
          <NodeInputText y={20} value={text ?? ''} onChange={setText} />
        )}
      </Group>
    );
  }
);
TextInputPreset.displayName = 'TextInputPreset';
