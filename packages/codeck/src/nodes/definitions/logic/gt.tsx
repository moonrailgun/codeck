import { CodeckNodeDefinition } from '../../../store/node';
import { buildCombinedLogicDefinition } from './_utils';

export const GTNodeDefinition: CodeckNodeDefinition =
  buildCombinedLogicDefinition({
    name: 'gt',
    label: 'Greater than',
    outputCode(input1, input2) {
      return `(${input1} > ${input2})`;
    },
  });
