import React from 'react';
import { Html } from 'react-konva-utils';
import { NodeInputBase, NodeInputProps } from './Base';

export const NodeInputNumber: React.FC<NodeInputProps> = React.memo((props) => {
  return (
    <NodeInputBase
      {...props}
      renderEditor={({ width, height, value, setValue, handleBlur }) => (
        <Html>
          <input
            className="block text-white text-xs bg-transparent border-white"
            style={{
              lineHeight: '16px',
              width,
              height,
              border: '1px solid white',
            }}
            type="number"
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
NodeInputNumber.displayName = 'NodeInputNumber';
