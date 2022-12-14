import React from 'react';
import { Text } from 'react-konva';
import { defaultNodeWidth } from '../../../utils/size-helper';

interface PinLabelProps {
  label: string;
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  align?: 'left' | 'center' | 'right';
  verticalAlign?: 'top' | 'middle' | 'bottom';
}
export const PinLabel: React.FC<PinLabelProps> = React.memo((props) => {
  return (
    <Text
      text={props.label}
      x={props.x ?? 0}
      y={props.y ?? 0}
      fill="white"
      fontSize={14}
      align={props.align}
      verticalAlign={props.verticalAlign}
      width={props.width}
      height={props.height}
    />
  );
});
PinLabel.displayName = 'PinLabel';

/**
 * 为输出位置的Pin特化的label组件
 */
export const OutputPinLabel: React.FC<{
  label: string;
  /**
   * 因为Pin需要根据宽度定位来对齐右侧(因为渲染是从左到右的，需要宽度提前定位)
   * 一般为节点宽度的一半
   * @default number defaultNodeWidth / 2
   */
  width?: number;
}> = React.memo((props) => {
  const defaultLabelWidth = defaultNodeWidth / 2;
  const width = props.width ?? defaultLabelWidth;

  return (
    <PinLabel
      label={props.label}
      x={-width - 30}
      y={0}
      align="right"
      width={width}
    />
  );
});
OutputPinLabel.displayName = 'OutputPinLabel';
