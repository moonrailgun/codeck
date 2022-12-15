import { AlertNodeDefinition } from './definitions/core/alert';
import { BeginNodeDefinition } from './definitions/core/begin';
import { JSONStringifyNodeDefinition } from './definitions/core/json-stringify';
import { LogNodeDefinition } from './definitions/core/log';
import { LogErrorNodeDefinition } from './definitions/core/log-error';
import { LoopNodeDefinition } from './definitions/core/loop';
import { SleepNodeDefinition } from './definitions/core/sleep';
import { TimerNodeDefinition } from './definitions/core/timer';
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

// definition
export const builtinNodeDefinition = {
  // Core
  BeginNodeDefinition,
  LogNodeDefinition,
  LogErrorNodeDefinition,
  VarGetNodeDefinition,
  VarSetNodeDefinition,
  AlertNodeDefinition,
  JSONStringifyNodeDefinition,
  LoopNodeDefinition,
  SleepNodeDefinition,
  TimerNodeDefinition,

  // Logic
  AddNodeDefinition,
  SubtractNodeDefinition,
  MultiplyNodeDefinition,
  DividedNodeDefinition,
  ModNodeDefinition,
  AnlNodeDefinition,
  OrlNodeDefinition,
  NotNodeDefinition,
};

// node
export { BaseNode } from './BaseNode';
export { BaseNodeWrapper } from './BaseNodeWrapper';
export { VariableNode } from './VariableNode';

// input
export { NodeInputBase } from './components/input/Base';
export { NodeInputBoolean } from './components/input/Boolean';
export { NodeInputNumber } from './components/input/Number';
export { NodeInputText } from './components/input/Text';
export { NodeInputSelect } from './components/input/Select';

// preset
export { BooleanInputPreset } from './components/preset/BooleanInputPreset';
export { NumberInputPreset } from './components/preset/NumberInputPreset';
export { TextInputPreset } from './components/preset/TextInputPreset';
export { SelectInputPreset } from './components/preset/SelectInputPreset';
