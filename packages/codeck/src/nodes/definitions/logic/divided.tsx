import { CodeckNodeDefinition } from '../../../store/node';
import { buildCombinedLogicDefinition } from './_utils';

export const DividedNodeDefinition: CodeckNodeDefinition =
  buildCombinedLogicDefinition({
    name: 'divided',
    label: 'Divided',
    outputCode(input1, input2) {
      return `(${input1} / ${input2})`;
    },
  });
