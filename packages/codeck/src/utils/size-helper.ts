import { NODE_TITLE_HEIGHT } from './consts';

const pinHeight = 20;

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
 * 0 - 16
 * 1 - 50
 * 2 - 70
 * 3 - 90
 * ...
 */
export function buildPinPosY(position: number) {
  return (
    position * pinHeight + 16 + (position > 0 ? NODE_TITLE_HEIGHT - 18 : 0)
  );
}

/**
 * 节点默认宽度
 */
export const defaultNodeWidth = 150;
/**
 * 根据所需要的空间计算高度(基于BaseNode形式计算出的)
 * 1 - 70
 * 2 - 90
 * 4 - 130
 */
export function buildNodeHeight(slotNum: number) {
  slotNum = Math.max(slotNum, 0);

  return NODE_TITLE_HEIGHT + 16 + slotNum * pinHeight + 2;
}
