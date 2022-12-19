import { CodeckNodeDefinition } from '../../../store/node';
import { buildCombinedLogicDefinition } from './_utils';

export const EqualNodeDefinition: CodeckNodeDefinition =
  buildCombinedLogicDefinition({
    name: 'equal',
    label: 'Equal',
    outputCode(input1, input2) {
      return `(${input1} == ${input2})`;
    },
  });
