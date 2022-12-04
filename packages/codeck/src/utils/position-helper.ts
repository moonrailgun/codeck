import { NODE_TITLE_HEIGHT } from './consts';

export function buildPinPosX(width: number, type: 'input' | 'output') {
  if (type === 'output') {
    return width - 14;
  }

  return 14;
}

/**
 * 构建pin的y坐标位置，1执行位。如果上一个节点拥有输入内容则跳过一个位置
 *
 * @example
 * 1 - 16
 * 2 - 50
 * 3 - 70
 * 4 - 90
 * ...
 */
export function buildPinPosY(position: number) {
  return (position - 1) * 20 + 16 + (position > 1 ? NODE_TITLE_HEIGHT - 18 : 0);
}
