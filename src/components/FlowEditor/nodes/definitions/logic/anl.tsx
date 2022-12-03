import { CodeckNodeDefinition } from '@/store/node';
import { buildCombinedLogicDefinition } from './_utils';

/**
 * 逻辑与
 * TODO: 应该是boolean输入框
 */
export const AnlNodeDefinition: CodeckNodeDefinition =
  buildCombinedLogicDefinition({
    name: 'logic-and',
    label: 'Logic And',
    outputCode(input1, input2) {
      return `(${input1} && ${input2})`;
    },
  });