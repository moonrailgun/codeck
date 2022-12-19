import { CodeckNodeDefinition } from '../../../store/node';
import { buildCombinedLogicDefinition } from './_utils';

export const GTENodeDefinition: CodeckNodeDefinition =
  buildCombinedLogicDefinition({
    name: 'gte',
    label: 'Greater than or equal',
    outputCode(input1, input2) {
      return `(${input1} >= ${input2})`;
    },
  });
