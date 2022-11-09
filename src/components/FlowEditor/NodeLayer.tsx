import React from 'react';
import { Layer } from 'react-konva';
import { BaseNode } from './nodes/BaseNode';

export const NodeLayer: React.FC = React.memo(() => {
  return (
    <Layer>
      <BaseNode title={'any'} x={40} y={40} />
    </Layer>
  );
});
NodeLayer.displayName = 'NodeLayer';
