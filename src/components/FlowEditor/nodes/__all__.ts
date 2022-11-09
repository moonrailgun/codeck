import { useNodeStore } from '../../../store/node';
import { BeginNode } from './BeginNode';

useNodeStore.getState().regNode({
  name: 'begin',
  component: BeginNode,
  inputs: [],
  outputs: [],
});
