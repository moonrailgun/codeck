import { regNode } from 'codeck';
import { ConnAddEventHandlerNodeDefinition } from './nodes/connAddEventHandler';
import { CreateConnectionNodeDefinition } from './nodes/createConnection';
import { CreateMessagePayloadNodeDefinition } from './nodes/createMessagePayload';
import { ParseTextMessagePayloadNodeDefinition } from './nodes/parseTextMessagePayload';

regNode(CreateConnectionNodeDefinition);
regNode(ConnAddEventHandlerNodeDefinition);
regNode(ParseTextMessagePayloadNodeDefinition);
regNode(CreateMessagePayloadNodeDefinition);
