import { useNodeStore } from '../../../store/node';
import { BeginNodeDefinition } from './definitions/begin';
import { LogNodeDefinition } from './definitions/log';
import { VarGetNodeDefinition } from './definitions/varget';
import { VarSetNodeDefinition } from './definitions/varset';

const { regNode } = useNodeStore.getState();

regNode(BeginNodeDefinition);
regNode(LogNodeDefinition);
regNode(VarGetNodeDefinition);
regNode(VarSetNodeDefinition);
