import { CodeckNodeDefinition } from '../../../store/node';
import { BooleanInputPreset } from '../../components/preset/BooleanInputPreset';
import { buildCombinedLogicDefinition } from './_utils';

/**
 * 逻辑或
 */
export const OrlNodeDefinition: CodeckNodeDefinition =
  buildCombinedLogicDefinition({
    name: 'logic-or',
    label: 'Logic Or',
    outputCode(input1, input2) {
      return `(${input1} || ${input2})`;
    },
    InputPreset: BooleanInputPreset,
    defaultValue: false,
  });
