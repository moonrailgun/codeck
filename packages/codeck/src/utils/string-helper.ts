import { repeat } from 'lodash-es';
import { customAlphabet, urlAlphabet } from 'nanoid';

/**
 * 构建nodeId的函数
 */
export const generateNodeId = customAlphabet(urlAlphabet.replace('_', ''), 8);

/**
 * 格式化函数体
 *
 * @usage
 * const onSuccess = formatFunctionIndent(getConnectionExecOutput('onSuccess'), 4);
 *
 * @param rawBody 原始函数体
 * @param indent 缩进
 */
export function formatFunctionIndent(rawBody?: string | null, indent = 2) {
  if (!rawBody) {
    return '';
  }

  return rawBody
    .trim()
    .split('\n')
    .join('\n' + repeat(' ', indent));
}
