import React from 'react';
import { Layer } from 'react-konva';
import { useNodeStore } from '../../store/node';
import { values } from 'lodash-es';

export const NodeLayer: React.FC = React.memo(() => {
  const { nodeMap, nodeDefinition } = useNodeStore();

  return (
    <Layer>
      {values(nodeMap).map((node) => {
        const def = nodeDefinition[node.name];
        if (!def) {
          console.warn('Not found node:', node.name);

          return null;
        }
        const component = def.component;

        return React.createElement(component, { key: node.id, id: node.id });
      })}
    </Layer>
  );
});
NodeLayer.displayName = 'NodeLayer';
