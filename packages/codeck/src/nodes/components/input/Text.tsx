import React from 'react';
import { Html } from 'react-konva-utils';
import { NodeInputBase, NodeInputProps } from './Base';
import { sharedInputStyle } from './shared';

export const NodeInputText: React.FC<NodeInputProps> = React.memo((props) => {
  return (
    <NodeInputBase
      {...props}
      renderEditor={({ width, height, value, setValue, handleBlur }) => (
        <Html>
          <input
            style={{
              ...sharedInputStyle,
              width,
              height,
            }}
            autoFocus={true}
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
});
NodeInputText.displayName = 'NodeInputText';
