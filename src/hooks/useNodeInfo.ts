import { useMemoizedFn } from 'ahooks';
import Konva from 'konva';
import { useNodeStore } from '../store/node';

/**
 * 获取当前节点信息
 */
export function useNodeInfo(nodeId: string) {
  const { nodeMap, nodeDefinition, updateNodePos } = useNodeStore();
  const node = nodeMap[nodeId];

  const updatePos = useMemoizedFn((position: Konva.Vector2d) => {
    updateNodePos(nodeId, position);
  });

  return { node, definition: nodeDefinition[node.name], updatePos };
}
