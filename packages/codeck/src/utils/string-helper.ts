import { customAlphabet, urlAlphabet } from 'nanoid';

/**
 * 构建nodeId的函数
 */
export const generateNodeId = customAlphabet(urlAlphabet.replace('_', ''), 8);
