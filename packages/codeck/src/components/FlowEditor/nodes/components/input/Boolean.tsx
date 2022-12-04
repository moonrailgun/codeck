import { useEditValue } from '@/hooks/useEditValue';
import { color } from '@/utils/color';
import React from 'react';
import { Rect } from 'react-konva';
import { Html } from 'react-konva-utils';
import { NodeInputBase, NodeInputProps } from './Base';

const size = 10;

export const NodeInputBoolean: React.FC<NodeInputProps> = React.memo(
  (props) => {
    const { x, y, value, onChange } = props;

    return (
      <Rect
        x={x}
        y={y}
        width={size}
        height={size}
        stroke={color.variable.boolean}
        strokeWidth={1}
        fill={value ? color.variable.boolean : undefined}
        onClick={(e) => {
          e.cancelBubble = true;
          onChange(!value);
        }}
      />
    );
  }
);
NodeInputBoolean.displayName = 'NodeInputBoolean';
