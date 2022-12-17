import create from 'zustand';
import { immer } from 'zustand/middleware/immer';
import Konva from 'konva';
import { cloneDeep, set as _set } from 'lodash-es';
import { useConnectionStore } from './connection';
import { generateNodeId } from '../utils/string-helper';
import { BeginNodeDefinition } from '../nodes/definitions/core/begin';
import { LogNodeDefinition } from '../nodes/definitions/core/log';
import { BEGIN_NODE_ID } from '../utils/consts';

type CodeckNodeType = 'begin' | 'return' | 'function' | 'logic' | 'call';

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

export interface CodeImportPrepare {
  type: 'import';

  /**
   * 导入模块名(依赖名，如: lodash)
   */
  module: string;

  /**
   * 导入模块的成员, 如果不填则为纯导入
   * 如果有别名则为元组
   * 字符串为导入部分成员，如果为元组则视为别名
   * 特别的，如果是默认导入填写: ['default', 'anything']
   */
  member?: string | [string, string];
  version?: string;
}

export interface CodeFunctionPrepare {
  type: 'function';
  name: string;
  parameters: string[];
  body: string;
}

export type CodePrepare = CodeImportPrepare | CodeFunctionPrepare;

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
   * 代码生成的前置准备
   */
  prepare?: CodePrepare[];
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
  moveNode: (nodeId: string, deltaX: number, deltaY: number) => void;
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
  /**
   * 重置
   */
  resetNode: () => void;
}

const buildDefaultNodeMap = () =>
  cloneDeep({
    [BEGIN_NODE_ID]: {
      id: BEGIN_NODE_ID,
      name: BeginNodeDefinition.name,
      position: {
        x: 10,
        y: 10,
      },
    },
    log: {
      id: 'log',
      name: LogNodeDefinition.name,
      position: {
        x: 240,
        y: 10,
      },
      data: {
        message: 'Hello World',
      },
    },
  });

export const useNodeStore = create<NodeState>()(
  immer((set, get) => ({
    nodeMap: buildDefaultNodeMap(),
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
    moveNode: (nodeId, deltaX, deltaY) => {
      set((state) => {
        const node = state.nodeMap[nodeId];
        if (!node) {
          console.warn('Not found this node:', nodeId);
          return;
        }

        node.position.x += deltaX;
        node.position.y += deltaY;
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
      const definition: CodeckNodeDefinition | null = getNodeDefinition(nodeId);
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
      if (nodeId === BEGIN_NODE_ID) {
        // 不能删除开始节点
        return;
      }

      set((state) => {
        useConnectionStore
          .getState()
          .connections.filter(
            (connection) =>
              connection.fromNodeId === nodeId || connection.toNodeId === nodeId
          )
          .forEach((item) => {
            useConnectionStore.getState().removeConnection(item.id);
          });

        delete state.nodeMap[nodeId];
      });
    },
    resetNode: () => {
      set({
        nodeMap: buildDefaultNodeMap(),
      });

      useConnectionStore.getState().connections.forEach((item) => {
        useConnectionStore.getState().removeConnection(item.id);
      });
    },
  }))
);

/**
 * 注册节点
 * @param definition 节点定义
 */
export function regNode(definition: CodeckNodeDefinition) {
  useNodeStore.getState().regNode(definition);
}
