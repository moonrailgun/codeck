import { regNode } from 'codeck';
import { ConnAddEventHandlerNodeDefinition } from './nodes/connAddEventHandler';
import { CreateConnectionNodeDefinition } from './nodes/createConnection';
import { CreateConnectionTokenNodeDefinition } from './nodes/createConnectionToken';
import { CreateMessagePayloadNodeDefinition } from './nodes/createMessagePayload';
import { ParseTextMessagePayloadNodeDefinition } from './nodes/parseTextMessagePayload';
import { SendMessageNodeDefinition } from './nodes/sendMessage';

regNode(CreateConnectionNodeDefinition);
regNode(CreateConnectionTokenNodeDefinition);
regNode(ConnAddEventHandlerNodeDefinition);
regNode(ParseTextMessagePayloadNodeDefinition);
regNode(CreateMessagePayloadNodeDefinition);
regNode(SendMessageNodeDefinition);
