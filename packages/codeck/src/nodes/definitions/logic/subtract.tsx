import { CodeckNodeDefinition } from '../../../store/node';
import { buildCombinedLogicDefinition } from './_utils';

export const SubtractNodeDefinition: CodeckNodeDefinition =
  buildCombinedLogicDefinition({
    name: 'subtract',
    label: 'Subtract',
    outputCode(input1, input2) {
      return `(${input1} - ${input2})`;
    },
  });
