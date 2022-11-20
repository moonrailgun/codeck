import { TaichuNodeDefinition } from '@/store/node';
import { buildCombinedLogicDefinition } from './_combined';

export const SubtractNodeDefinition: TaichuNodeDefinition =
  buildCombinedLogicDefinition({
    name: 'subtract',
    label: 'Subtract',
    outputCode(input1, input2) {
      return `(${input1} - ${input2})`;
    },
  });
