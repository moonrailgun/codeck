import React from 'react';
import { Group } from 'react-konva';
import { useNodeDataValue } from '../../../hooks/useNodeData';
import { usePinDefinition } from '../../../hooks/usePinDefinition';
import { useConnectionStore } from '../../../store/connection';
import { NodeInputSelect, NodeInputSelectProps } from '../input/Select';
import { PinLabel } from '../pin/Label';
import { BaseInputPresetProps } from './types';

export interface SelectInputPresetProps extends BaseInputPresetProps {
  options: NodeInputSelectProps['options'];
}
export const SelectInputPreset: React.FC<SelectInputPresetProps> = React.memo(
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
          <NodeInputSelect
            y={20}
            value={text ?? defaultValue ?? ''}
            onChange={setText}
            options={props.options}
          />
        )}
      </Group>
    );
  }
);
SelectInputPreset.displayName = 'SelectInputPreset';
