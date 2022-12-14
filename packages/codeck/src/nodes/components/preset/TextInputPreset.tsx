import React from 'react';
import { Group } from 'react-konva';
import { useNodeDataValue } from '../../../hooks/useNodeData';
import { usePinDefinition } from '../../../hooks/usePinDefinition';
import { useConnectionStore } from '../../../store/connection';
import { NodeInputText } from '../input/Text';
import { PinLabel } from '../pin/Label';
import { BaseInputPresetProps } from './types';

export const TextInputPreset: React.FC<BaseInputPresetProps> = React.memo(
  (props) => {
    const [text, setText] = useNodeDataValue(props.nodeId, props.name);
    const connected = useConnectionStore().checkIsConnected(
      props.nodeId,
      props.name
    );
    const { defaultValue } = usePinDefinition(props.nodeId, props.name) ?? {};

    return (
      <Group x={props.x} y={props.y}>
        <PinLabel label={props.label} />
        {connected ? null : (
          <NodeInputText
            y={20}
            value={text ?? defaultValue ?? ''}
            onChange={setText}
          />
        )}
      </Group>
    );
  }
);
TextInputPreset.displayName = 'TextInputPreset';
