/**
 * 存档管理
 */

import { useMemo } from 'react';
import { ConnectInfo, useConnectionStore } from '../store/connection';
import { CodeckNode, useNodeStore } from '../store/node';
import { useVariableStore, VariableItem } from '../store/variable';

interface CodeckPersistData {
  modules: Record<
    string,
    {
      nodeMap: Record<string, CodeckNode>;
      connections: ConnectInfo[];
      variable: Record<string, VariableItem>;
    }
  >;
}

/**
 * 获取当前状态
 */
export function getCurrentData(): CodeckPersistData {
  return {
    modules: {
      // 多模块支持
      entry: {
        nodeMap: useNodeStore.getState().nodeMap,
        connections: useConnectionStore.getState().connections,
        variable: useVariableStore.getState().variableMap,
      },
    },
  };
}

/**
 * 一个hooks用于返回PersistData
 */
export function usePersistData(): CodeckPersistData {
  const nodeMap = useNodeStore((state) => state.nodeMap);
  const connections = useConnectionStore((state) => state.connections);
  const variableMap = useVariableStore((state) => state.variableMap);

  return useMemo(() => getCurrentData(), [nodeMap, connections, variableMap]);
}

/**
 * 加载数据
 */
export function load(data: CodeckPersistData) {
  if (!data.modules.entry) {
    throw new Error('Not found entry module');
  }

  /**
   * 目前只加载entry模块的内容
   */
  useNodeStore.setState({
    nodeMap: data.modules.entry.nodeMap,
  });
  useConnectionStore.setState({
    connections: data.modules.entry.connections,
  });
  useVariableStore.setState({
    variableMap: data.modules.entry.variable,
  });
}

export function saveIntoLocalStorage() {
  window.localStorage.setItem('codeckData', JSON.stringify(getCurrentData()));
}

export function loadFromLocalStorage() {
  const data = window.localStorage.getItem('codeckData');
  if (!data) {
    throw new Error('Cannot load info from localStorage');
  }

  load(JSON.parse(data));
}
