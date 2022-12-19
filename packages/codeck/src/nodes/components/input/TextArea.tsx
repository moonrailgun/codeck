import React from 'react';
import { Html } from 'react-konva-utils';
import { NodeInputBase, NodeInputProps } from './Base';

export interface NodeInputTextAreaProps extends NodeInputProps {
  row: number;
}
export const NodeInputTextArea: React.FC<NodeInputTextAreaProps> = React.memo(
  (props) => {
    return (
      <NodeInputBase
        {...props}
        height={props.row * 16}
        renderEditor={({ width, height, value, setValue, handleBlur }) => (
          <Html>
            <textarea
              className="block text-white text-xs bg-transparent border-white"
              style={{
                lineHeight: '16px',
                width,
                height,
                border: '1px solid white',
              }}
              autoFocus={true}
              rows={props.row}
              placeholder={value}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onBlur={handleBlur}
              onKeyDown={(e) => e.stopPropagation()}
            />
          </Html>
        )}
      />
    );
  }
);
NodeInputTextArea.displayName = 'NodeInputTextArea';
