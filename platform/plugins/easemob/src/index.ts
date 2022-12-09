import { regNode } from 'codeck';
import { ConnAddEventHandlerNodeDefinition } from './nodes/connAddEventHandler';
import { CreateConnectionNodeDefinition } from './nodes/createConnection';

regNode(CreateConnectionNodeDefinition);
regNode(ConnAddEventHandlerNodeDefinition);
