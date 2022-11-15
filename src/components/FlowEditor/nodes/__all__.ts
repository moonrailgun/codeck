import { useNodeStore } from '../../../store/node';
import { AlertNodeDefinition } from './definitions/alert';
import { BeginNodeDefinition } from './definitions/begin';
import { JSONStringifyNodeDefinition } from './definitions/json-stringify';
import { LogNodeDefinition } from './definitions/log';
import { VarGetNodeDefinition } from './definitions/varget';
import { VarSetNodeDefinition } from './definitions/varset';

const { regNode } = useNodeStore.getState();

regNode(BeginNodeDefinition);
regNode(LogNodeDefinition);
regNode(VarGetNodeDefinition);
regNode(VarSetNodeDefinition);
regNode(AlertNodeDefinition);
regNode(JSONStringifyNodeDefinition);
