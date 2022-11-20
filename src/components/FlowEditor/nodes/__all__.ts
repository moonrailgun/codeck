import { useNodeStore } from '../../../store/node';
import { AlertNodeDefinition } from './definitions/core/alert';
import { BeginNodeDefinition } from './definitions/core/begin';
import { JSONStringifyNodeDefinition } from './definitions/core/json-stringify';
import { LogNodeDefinition } from './definitions/core/log';
import { AddNodeDefinition } from './definitions/logic/add';
import { VarGetNodeDefinition } from './definitions/varget';
import { VarSetNodeDefinition } from './definitions/varset';

const { regNode } = useNodeStore.getState();

// Core
regNode(BeginNodeDefinition);
regNode(LogNodeDefinition);
regNode(VarGetNodeDefinition);
regNode(VarSetNodeDefinition);
regNode(AlertNodeDefinition);
regNode(JSONStringifyNodeDefinition);

// Logic
regNode(AddNodeDefinition);
