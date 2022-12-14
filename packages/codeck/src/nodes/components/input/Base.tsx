import {
  resetFlowEditorCursorStyle,
  setFlowEditorCursorStyle,
} from '../../../utils/pointer-helper';
import React, { useCallback, useState } from 'react';
import { Group, Rect, Text } from 'react-konva';
import { useEditValue } from '../../../hooks/useEditValue';

const defaultWidth = 80;
const defaultHeight = 16;

export interface NodeInputProps<T = any> {
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  value: T;
  onChange: (text: T) => void;
}

interface NodeInputBaseProps<T = any> extends NodeInputProps<T> {
  renderEditor: (ctx: {
    width: number;
    height: number;
    handleBlur: () => void;
    value: T;
    setValue: (val: T) => void;
  }) => React.ReactNode;
}
export const NodeInputBase: React.FC<NodeInputBaseProps> = React.memo(
  (props) => {
    const [isEditing, setIsEditing] = useState(false);
    const { x, y, width = defaultWidth, height = defaultHeight } = props;
    const [value, setValue, submitValue] = useEditValue(
      props.value,
      props.onChange
    );

    const handleBlur = useCallback(() => {
      resetFlowEditorCursorStyle();
      submitValue();
      setIsEditing(false);
    }, [submitValue]);

    const handleMouseEnter = useCallback(() => {
      setFlowEditorCursorStyle('text');
    }, []);

    const handleMouseLeave = useCallback(() => {
      resetFlowEditorCursorStyle();
    }, []);

    return (
      <Group
        x={x}
        y={y}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <Rect width={width} height={height} stroke="white" strokeWidth={1} />

        {isEditing ? (
          props.renderEditor({
            width,
            height,
            value,
            setValue,
            handleBlur,
          })
        ) : (
          <Text
            x={2}
            y={2}
            width={width}
            height={height}
            fill="#ccc"
            text={value}
            onClick={() => setIsEditing(true)}
          />
        )}
      </Group>
    );
  }
);
NodeInputBase.displayName = 'NodeInputBase';
