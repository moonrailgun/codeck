import { regNode } from 'codeck';
import { ConnAddEventHandlerNodeDefinition } from './nodes/connAddEventHandler';
import { CreateConnectionNodeDefinition } from './nodes/createConnection';
import { ParseTextMessagePayloadNodeDefinition } from './nodes/parseTextMessagePayload';

regNode(CreateConnectionNodeDefinition);
regNode(ConnAddEventHandlerNodeDefinition);
regNode(ParseTextMessagePayloadNodeDefinition);
