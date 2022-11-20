import { TaichuNodeDefinition } from '@/store/node';
import { buildCombinedLogicDefinition } from './_combined';

export const ModNodeDefinition: TaichuNodeDefinition =
  buildCombinedLogicDefinition({
    name: 'mod',
    label: 'Mod',
    outputCode(input1, input2) {
      return `(${input1} % ${input2})`;
    },
  });
