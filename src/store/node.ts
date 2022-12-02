import create from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { persist } from 'zustand/middleware';
import Konva from 'konva';
import { keys, set as _set } from 'lodash-es';
import { useConnectionStore } from './connection';
import { generateNodeId } from '../utils/string-helper';
import { BeginNodeDefinition } from '@/components/FlowEditor/nodes/definitions/core/begin';

type CodeckNodeType = 'begin' | 'return' | 'function' | 'logic';

export type CodeFn = (ctx: {
  node: CodeckNode;
  buildPinVarName: (pinName: string, nodeId?: string) => string;
  getConnectionInput: (pinName: string, nodeId?: string) => string | null;
  getConnectionExecOutput: (pinName: string, nodeId?: string) => string | null;
}) => string;

export interface CodeckNode {
  id: string;
  name: string; // 节点名, 指向 CodeckNodeDefinition
  position: Konva.Vector2d;
  data?: Record<string, any>; // node中存储的数据。比如用户输入
}

export interface CodeckNodeComponentProps {
  id: string;
}

export type CodeckNodePortType = 'port' | 'exec';

export interface CodeckNodePinDefinition {
  name: string;
  type: CodeckNodePortType;
  position: Konva.Vector2d;
  defaultValue?: any;
  renderType?: string;
  component?: React.ComponentType<{
    nodeId: string;
  }>;
}

export interface CodeckNodeDefinition {
  name: string;
  label: string;
  type: CodeckNodeType;
  width: number;
  height: number;
  category: string;
  /**
   * 是否在右键菜单中隐藏
   */
  hidden?: boolean;
  inputs: CodeckNodePinDefinition[];
  outputs: (CodeckNodePinDefinition & { code?: CodeFn })[];
  component: React.ComponentType<CodeckNodeComponentProps>;
  /**
   * 节点代码生成逻辑
   */
  code?: CodeFn;
}

interface NodeState {
  nodeMap: Record<string, CodeckNode>;
  nodeDefinition: Record<string, CodeckNodeDefinition>;
  /**
   * 注册节点
   */
  regNode: (definition: CodeckNodeDefinition) => void;
  /**
   * 更新节点位置
   */
  updateNodePos: (nodeId: string, position: Konva.Vector2d) => void;
  getNodeDefinition: (nodeId: string) => CodeckNodeDefinition | null;
  getPinDefinitionByName: (
    nodeId: string,
    pinName: string
  ) => CodeckNodePinDefinition | null;
  createNode: (
    nodeName: string,
    position: Konva.Vector2d,
    data?: CodeckNode['data']
  ) => void;
  /**
   * 设置节点数据
   */
  setNodeData: (nodeId: string, key: string, value: unknown) => void;
  removeNode: (nodeId: string) => void;
  resetNode: () => void;
}

const defaultNodeMap = {
  begin: {
    id: 'begin',
    name: 'begin',
    position: {
      x: 10,
      y: 10,
    },
  },
};

export const useNodeStore = create<NodeState>()(
  persist(
    immer((set, get) => ({
      nodeMap: defaultNodeMap,
      nodeDefinition: {},
      regNode: (definition: CodeckNodeDefinition) => {
        set((state) => {
          if (state.nodeDefinition[definition.name]) {
            console.warn('This node is registered', definition.name);
            return;
          }

          state.nodeDefinition[definition.name] = definition;
        });
      },
      updateNodePos: (nodeId: string, position: Konva.Vector2d) => {
        set((state) => {
          const node = state.nodeMap[nodeId];
          if (!node) {
            console.warn('Not found this node:', nodeId);
            return;
          }

          node.position = position;
        });
      },
      getNodeDefinition: (nodeId) => {
        const { nodeMap, nodeDefinition } = get();
        const node = nodeMap[nodeId];
        if (!node) {
          return null;
        }

        const definition = nodeDefinition[node.name];
        return definition ?? null;
      },
      getPinDefinitionByName: (nodeId, pinName) => {
        const { getNodeDefinition } = get();
        const definition: CodeckNodeDefinition | null =
          getNodeDefinition(nodeId);
        if (!definition) {
          return null;
        }

        return (
          [...definition.inputs, ...definition.outputs].find(
            (item) => item.name === pinName
          ) ?? null
        );
      },
      createNode: (nodeName, position, data) => {
        set((state) => {
          const id = generateNodeId();
          state.nodeMap[id] = {
            id,
            name: nodeName,
            position,
            data,
          };
        });
      },
      setNodeData: (nodeId, key, value) => {
        set((state) => {
          const node = state.nodeMap[nodeId];
          if (!node) {
            console.warn('Not found node', nodeId);
            return;
          }

          _set(node, ['data', key], value);
        });
      },
      removeNode: (nodeId) => {
        set((state) => {
          useConnectionStore
            .getState()
            .connections.filter(
              (connection) =>
                connection.fromNodeId === nodeId ||
                connection.toNodeId === nodeId
            )
            .forEach((item) => {
              useConnectionStore.getState().removeConnection(item.id);
            });

          delete state.nodeMap[nodeId];
        });
      },
      resetNode: () => {
        const { nodeMap, removeNode } = get();
        keys(nodeMap)
          .filter((id) => id !== BeginNodeDefinition.name)
          .forEach((id) => {
            removeNode(id);
          });
      },
    })),
    {
      name: 'nodeMap',
      partialize: (state) => ({ nodeMap: state.nodeMap }),
    }
  )
);
