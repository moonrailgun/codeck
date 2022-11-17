import { useCallback } from 'react';
import { useNodeStore } from '../store/node';
import { useNodeInfo } from './useNodeInfo';

/**
 * 获取节点数据
 */
export function useNodeData(nodeId: string): Record<string, any> {
  return useNodeInfo(nodeId).node?.data ?? {};
}

/**
 * 编辑节点数据
 */
export function useNodeDataValue(
  nodeId: string,
  dataKey: string
): [any, (value: unknown) => void] {
  const data = useNodeData(nodeId);

  const value = data[dataKey];
  const setValue = useCallback(
    (newValue: unknown) => {
      useNodeStore.getState().setNodeData(nodeId, dataKey, newValue);
    },
    [nodeId, dataKey]
  );

  return [value, setValue];
}
