import { builtinNodeDefinition, regNode } from 'codeck';
import { values } from 'lodash-es';

values(builtinNodeDefinition).map(regNode);
