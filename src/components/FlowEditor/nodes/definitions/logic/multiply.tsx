import { TaichuNodeDefinition } from '@/store/node';
import { buildCombinedLogicDefinition } from './_combined';

export const MultiplyNodeDefinition: TaichuNodeDefinition =
  buildCombinedLogicDefinition({
    name: 'multiply',
    label: 'Multiply',
    outputCode(input1, input2) {
      return `(${input1} * ${input2})`;
    },
  });
