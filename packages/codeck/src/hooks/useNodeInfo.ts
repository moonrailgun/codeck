import { CodeckNode, CodeckNodeDefinition, useNodeStore } from '../store/node';

/**
 * 获取节点信息
 */
export function useNodeInfo(nodeId: string): {
  node: CodeckNode | null;
  definition: CodeckNodeDefinition | null;
} {
  const { nodeMap, nodeDefinition } = useNodeStore((state) => ({
    nodeMap: state.nodeMap,
    nodeDefinition: state.nodeDefinition,
  }));
  const node = nodeMap[nodeId];

  if (!node) {
    return {
      node: null,
      definition: null,
    };
  }

  return { node, definition: nodeDefinition[node.name] };
}
