import { CodeckNodeDefinition } from '@/store/node';
import { buildCombinedLogicDefinition } from './_combined';

export const AddNodeDefinition: CodeckNodeDefinition =
  buildCombinedLogicDefinition({
    name: 'add',
    label: 'Add',
    outputCode(input1, input2) {
      return `(${input1} + ${input2})`;
    },
  });
