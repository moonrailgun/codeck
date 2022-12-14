import React from 'react';
import { Group } from 'react-konva';
import { useNodeDataValue } from '../../../hooks/useNodeData';
import { usePinDefinition } from '../../../hooks/usePinDefinition';
import { useConnectionStore } from '../../../store/connection';
import { NodeInputNumber } from '../input/Number';
import { PinLabel } from '../pin/Label';
import { BaseInputPresetProps } from './types';

export const NumberInputPreset: React.FC<BaseInputPresetProps> = React.memo(
  (props) => {
    const [text = 0, setText] = useNodeDataValue(props.nodeId, props.name);
    const connected = useConnectionStore().checkIsConnected(
      props.nodeId,
      props.name
    );
    const { defaultValue } = usePinDefinition(props.nodeId, props.name) ?? {};

    return (
      <Group x={props.x} y={props.y}>
        <PinLabel label={props.label} />
        {connected ? null : (
          <NodeInputNumber
            y={20}
            value={Number(text) ?? defaultValue ?? 0}
            onChange={(val) => setText(Number(val))}
          />
        )}
      </Group>
    );
  }
);
NumberInputPreset.displayName = 'NumberInputPreset';
