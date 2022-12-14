import React from 'react';
import { Group } from 'react-konva';
import { useNodeDataValue } from '../../../hooks/useNodeData';
import { useConnectionStore } from '../../../store/connection';
import { PinLabel } from '../pin/Label';
import { NodeInputBoolean } from '../input/Boolean';
import { BaseInputPresetProps } from './types';
import { usePinDefinition } from '../../../hooks/usePinDefinition';

export const BooleanInputPreset: React.FC<BaseInputPresetProps> = React.memo(
  (props) => {
    const [val, setVal] = useNodeDataValue(props.nodeId, props.name);
    const connected = useConnectionStore().checkIsConnected(
      props.nodeId,
      props.name
    );
    const { defaultValue } = usePinDefinition(props.nodeId, props.name) ?? {};

    return (
      <Group x={props.x} y={props.y}>
        <PinLabel label={props.label} />
        {connected ? null : (
          <NodeInputBoolean
            y={20}
            value={val ?? defaultValue ?? false}
            onChange={setVal}
          />
        )}
      </Group>
    );
  }
);
BooleanInputPreset.displayName = 'BooleanInputPreset';
