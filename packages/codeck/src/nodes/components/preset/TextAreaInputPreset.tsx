import React from 'react';
import { Group } from 'react-konva';
import { useNodeDataValue } from '../../../hooks/useNodeData';
import { usePinDefinition } from '../../../hooks/usePinDefinition';
import { useConnectionStore } from '../../../store/connection';
import { NodeInputTextArea, NodeInputTextAreaProps } from '../input/TextArea';
import { PinLabel } from '../pin/Label';
import { BaseInputPresetProps } from './types';

export interface TextAreaInputPresetProps extends BaseInputPresetProps {
  inputProps?: Omit<NodeInputTextAreaProps, 'value' | 'onChange'>;
}
export const TextAreaInputPreset: React.FC<TextAreaInputPresetProps> =
  React.memo((props) => {
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
          <NodeInputTextArea
            y={20}
            row={props.inputProps?.row ?? 1}
            {...props.inputProps}
            value={text ?? defaultValue ?? ''}
            onChange={setText}
          />
        )}
      </Group>
    );
  });
TextAreaInputPreset.displayName = 'TextAreaInputPreset';
