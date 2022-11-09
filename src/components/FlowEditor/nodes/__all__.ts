import { useNodeStore } from '../../../store/node';
import { BeginNode } from './BeginNode';

useNodeStore.getState().regNode({
  name: 'begin',
  component: BeginNode,
  width: 150,
  height: 65,
  inputs: [
    {
      name: 'exec-in',
      type: 'exec',
      position: {
        x: 20,
        y: 16,
      },
    },
  ],
  outputs: [
    {
      name: 'exec-out',
      type: 'exec',
      position: {
        x: 140,
        y: 16,
      },
    },
  ],
});
