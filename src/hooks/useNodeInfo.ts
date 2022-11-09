import { useNodeStore } from '../store/node';

/**
 * 获取当前节点信息
 */
export function useNodeInfo(nodeId: string) {
  const { nodeMap, nodeDefinition } = useNodeStore();
  const node = nodeMap[nodeId];

  return { node, definition: nodeDefinition[node.name] };
}
