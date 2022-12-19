import { CodeckNodeDefinition } from '../../../store/node';
import { buildCombinedLogicDefinition } from './_utils';

export const LTENodeDefinition: CodeckNodeDefinition =
  buildCombinedLogicDefinition({
    name: 'lte',
    label: 'Less than or equal',
    outputCode(input1, input2) {
      return `(${input1} <= ${input2})`;
    },
  });
