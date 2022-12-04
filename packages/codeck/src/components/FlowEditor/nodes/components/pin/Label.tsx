import React from 'react';
import { Text } from 'react-konva';

interface PinLabelProps {
  label: string;
  x?: number;
  y?: number;
}
export const PinLabel: React.FC<PinLabelProps> = React.memo((props) => {
  return (
    <Text
      text={props.label}
      x={props.x ?? 0}
      y={props.y ?? 0}
      fill="white"
      fontSize={14}
    />
  );
});
PinLabel.displayName = 'PinLabel';
