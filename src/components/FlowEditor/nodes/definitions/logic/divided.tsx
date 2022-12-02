import { CodeckNodeDefinition } from '@/store/node';
import { buildCombinedLogicDefinition } from './_combined';

export const DividedNodeDefinition: CodeckNodeDefinition =
  buildCombinedLogicDefinition({
    name: 'divided',
    label: 'Divided',
    outputCode(input1, input2) {
      return `(${input1} / ${input2})`;
    },
  });
