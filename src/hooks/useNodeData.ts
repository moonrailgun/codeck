import { useNodeInfo } from './useNodeInfo';

/**
 * 获取节点数据
 */
export function useNodeData(nodeId: string): Record<string, any> {
  return useNodeInfo(nodeId).node.data ?? {};
}
