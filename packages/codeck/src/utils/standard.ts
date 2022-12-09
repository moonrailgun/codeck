import { CodeckNodePinDefinition } from '../store/node';
import { STANDARD_PIN_EXEC_IN, STANDARD_PIN_EXEC_OUT } from './consts';
import { buildPinPosX, buildPinPosY } from './size-helper';

/**
 * 标准执行输入
 */
export const execPinInput = (width: number): CodeckNodePinDefinition => ({
  name: STANDARD_PIN_EXEC_IN,
  type: 'exec',
  position: {
    x: buildPinPosX(width, 'input'),
    y: buildPinPosY(1),
  },
});

/**
 * 标准执行输出
 */
export const execPinOutput = (width: number): CodeckNodePinDefinition => ({
  name: STANDARD_PIN_EXEC_OUT,
  type: 'exec',
  position: {
    x: buildPinPosX(width, 'output'),
    y: buildPinPosY(1),
  },
});
