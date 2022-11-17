import { TaichuNode, TaichuNodeDefinition, useNodeStore } from '../store/node';

/**
 * 获取节点信息
 */
export function useNodeInfo(nodeId: string): {
  node: TaichuNode | undefined;
  definition: TaichuNodeDefinition | undefined;
} {
  const { nodeMap, nodeDefinition } = useNodeStore();
  const node = nodeMap[nodeId];

  if (!node) {
    return {
      node: undefined,
      definition: undefined,
    };
  }

  return { node, definition: nodeDefinition[node.name] };
}
