import { regNode } from 'codeck';
import { ConnAddEventHandlerNodeDefinition } from './nodes/connAddEventHandler';
import { CreateConnectionNodeDefinition } from './nodes/createConnection';
import { CreateConnectionTokenNodeDefinition } from './nodes/createConnectionToken';
import { CreateMessagePayloadNodeDefinition } from './nodes/createMessagePayload';
import { ParseTextMessagePayloadNodeDefinition } from './nodes/parseTextMessagePayload';

regNode(CreateConnectionNodeDefinition);
regNode(CreateConnectionTokenNodeDefinition);
regNode(ConnAddEventHandlerNodeDefinition);
regNode(ParseTextMessagePayloadNodeDefinition);
regNode(CreateMessagePayloadNodeDefinition);
