import { useNodeStore } from '../../../store/node';
import { AlertNodeDefinition } from './definitions/core/alert';
import { BeginNodeDefinition } from './definitions/core/begin';
import { JSONStringifyNodeDefinition } from './definitions/core/json-stringify';
import { LogNodeDefinition } from './definitions/core/log';
import { LoopNodeDefinition } from './definitions/core/loop';
import { AddNodeDefinition } from './definitions/logic/add';
import { AnlNodeDefinition } from './definitions/logic/anl';
import { DividedNodeDefinition } from './definitions/logic/divided';
import { ModNodeDefinition } from './definitions/logic/mod';
import { MultiplyNodeDefinition } from './definitions/logic/multiply';
import { NotNodeDefinition } from './definitions/logic/not';
import { OrlNodeDefinition } from './definitions/logic/orl';
import { SubtractNodeDefinition } from './definitions/logic/subtract';
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
regNode(LoopNodeDefinition);

// Logic
regNode(AddNodeDefinition);
regNode(SubtractNodeDefinition);
regNode(MultiplyNodeDefinition);
regNode(DividedNodeDefinition);
regNode(ModNodeDefinition);
regNode(AnlNodeDefinition);
regNode(OrlNodeDefinition);
regNode(NotNodeDefinition);
