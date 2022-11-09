import { useNodeStore } from '../../../store/node';
import { BeginNodeDefinition } from './BeginNode';
import { LogNodeDefinition } from './LogNode';

const { regNode } = useNodeStore.getState();

regNode(BeginNodeDefinition);
regNode(LogNodeDefinition);
