import { useMemoizedFn } from 'ahooks';
import React, { useCallback, useState } from 'react';
import { Group, Rect, Text } from 'react-konva';
import { Html } from 'react-konva-utils';
import { useEditValue } from '../../../../hooks/useEditValue';

const defaultWidth = 80;
const defaultHeight = 16;

interface NodeInputTextProps {
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  value: string;
  onChange: (text: string) => void;
}
export const NodeInputText: React.FC<NodeInputTextProps> = React.memo(
  (props) => {
    const [isEditing, setIsEditing] = useState(false);
    const { x, y, width = defaultWidth, height = defaultHeight } = props;
    const [value, setValue, submitValue] = useEditValue(
      props.value,
      props.onChange
    );

    const handleBlur = useCallback(() => {
      document.body.style.cursor = 'default';
      submitValue();
      setIsEditing(false);
    }, [submitValue]);

    const handleMouseEnter = useCallback(() => {
      document.body.style.cursor = 'text';
    }, []);

    const handleMouseLeave = useCallback(() => {
      document.body.style.cursor = 'default';
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
          <Html>
            <input
              className="block text-white text-xs bg-transparent border-white"
              style={{
                lineHeight: '16px',
                width,
                height,
                border: '1px solid white',
              }}
              autoFocus={true}
              placeholder={value}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onBlur={handleBlur}
            />
          </Html>
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
NodeInputText.displayName = 'NodeInputText';
