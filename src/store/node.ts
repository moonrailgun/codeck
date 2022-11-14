import create from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { persist } from 'zustand/middleware';
import Konva from 'konva';
import { nanoid } from 'nanoid';
import { set as _set } from 'lodash-es';

type TaichuNodeType = 'begin' | 'return' | 'function' | 'logic';

interface TaichuNode {
  id: string;
  name: string; // 节点名, 指向 TaichuNodeDefinition
  position: Konva.Vector2d;
  data?: Record<string, any>; // node中存储的数据。比如用户输入
}

export interface TaichuNodeComponentProps {
  id: string;
}

export type TaichuNodePortType = 'port' | 'exec';

export interface TaichuNodePinDefinition {
  name: string;
  type: TaichuNodePortType;
  position: Konva.Vector2d;
  defaultValue?: any;
  renderType?: string;
  component?: React.ComponentType<{
    nodeId: string;
  }>;
}

export interface TaichuNodeDefinition {
  name: string;
  label: string;
  type: TaichuNodeType;
  width: number;
  height: number;
  inputs: TaichuNodePinDefinition[];
  outputs: TaichuNodePinDefinition[];
  component: React.ComponentType<TaichuNodeComponentProps>;
}

interface NodeState {
  nodeMap: Record<string, TaichuNode>;
  nodeDefinition: Record<string, TaichuNodeDefinition>;
  /**
   * 注册节点
   */
  regNode: (definition: TaichuNodeDefinition) => void;
  /**
   * 更新节点位置
   */
  updateNodePos: (nodeId: string, position: Konva.Vector2d) => void;
  getNodeDefinition: (nodeId: string) => TaichuNodeDefinition | null;
  getPinDefinitionByName: (
    nodeId: string,
    pinName: string
  ) => TaichuNodePinDefinition | null;
  createNode: (
    nodeName: string,
    position: Konva.Vector2d,
    data?: TaichuNode['data']
  ) => void;
  /**
   * 设置节点数据
   */
  setNodeData: (nodeId: string, key: string, value: unknown) => void;
}

export const useNodeStore = create<
  NodeState,
  [['zustand/persist', Pick<NodeState, 'nodeMap'>], ['zustand/immer', never]]
>(
  persist(
    immer((set, get) => ({
      nodeMap: {
        begin: {
          id: 'begin',
          name: 'begin',
          position: {
            x: 10,
            y: 10,
          },
        },
      },
      nodeDefinition: {},
      regNode: (definition: TaichuNodeDefinition) => {
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
        const definition: TaichuNodeDefinition | null =
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
          const id = nanoid();
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
    })),
    {
      name: 'nodeMap',
      partialize: (state) => ({ nodeMap: state.nodeMap }),
    }
  )
);
