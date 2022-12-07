import create from 'zustand';
import { CodeckNodePortType } from './node';
import { immer } from 'zustand/middleware/immer';
import { generateNodeId } from '../utils/string-helper';
import { uniqBy, without } from 'lodash-es';

export interface ConnectInfo {
  id: string;
  fromNodeId: string;
  fromNodePinName: string;
  toNodeId: string;
  toNodePinName: string;
}

type PinDirection =
  | 'out-in' // 输出
  | 'in-out'; // 输入

interface ConnectionState {
  connections: ConnectInfo[];
  workingConnection: {
    fromNodeId: string;
    fromNodePinName: string;
    fromNodePinType: CodeckNodePortType;
    fromNodeDirection: PinDirection;
  } | null;
  startConnect: (
    fromNodeId: string,
    fromNodePinName: string,
    fromNodePinType: CodeckNodePortType,
    fromNodeDirection: PinDirection
  ) => void;
  endConnect: (
    toNodeId: string,
    toNodePinName: string,
    toNodePinType: CodeckNodePortType,
    toNodeDirection: PinDirection
  ) => void;
  cancelConnect: () => void;
  checkIsConnected: (nodeId: string, pinName: string) => boolean;
  removeConnection: (connectionId: string) => void;
}

export const useConnectionStore = create<ConnectionState>()(
  immer((set, get) => ({
    connections: [] as ConnectInfo[],
    workingConnection: null,
    startConnect: (
      fromNodeId,
      fromNodePinName,
      fromNodePinType,
      fromNodeDirection
    ) => {
      const { workingConnection } = get();
      if (workingConnection) {
        return;
      }

      set({
        workingConnection: {
          fromNodeId,
          fromNodePinName,
          fromNodePinType,
          fromNodeDirection,
        },
      });
    },
    endConnect: (toNodeId, toNodePinName, toNodePinType, toNodeDirection) => {
      const { workingConnection, cancelConnect } = get();

      if (!workingConnection) {
        return;
      }

      const {
        fromNodeId,
        fromNodePinName,
        fromNodePinType,
        fromNodeDirection,
      } = workingConnection;

      // 正在处于连接状态
      if (toNodeId === fromNodeId) {
        // 连接到相同节点
        cancelConnect();
        return;
      }

      if (toNodeDirection === fromNodeDirection) {
        // 相同方向
        cancelConnect();
        return;
      }

      if (toNodePinType !== fromNodePinType) {
        // 不匹配(譬如exec和port连接)
        cancelConnect();
        return;
      }

      set((state) => {
        // exec只能一对一
        // port能够一对多(但是不能多对1)
        if (fromNodePinType === 'exec') {
          const list = state.connections.filter(
            (conn) =>
              (conn.fromNodeId === fromNodeId &&
                conn.fromNodePinName === fromNodePinName) ||
              (conn.toNodeId === fromNodeId &&
                conn.toNodePinName === fromNodePinName) ||
              (conn.fromNodeId === toNodeId &&
                conn.fromNodePinName === toNodePinName) ||
              (conn.toNodeId === toNodeId &&
                conn.toNodePinName === toNodePinName)
          );

          if (list.length > 0) {
            state.connections = without(state.connections, ...list); // 移除不能多连的旧的连线
          }
        } else if (fromNodePinType === 'port') {
          // 如果是port类型，则需要移除实际connection的to端口的其他连线
          let list: ConnectInfo[] = [];
          if (fromNodeDirection === 'out-in') {
            list = state.connections.filter(
              (conn) =>
                conn.toNodeId === toNodeId &&
                conn.toNodePinName === toNodePinName
            );
          } else if (fromNodeDirection === 'in-out') {
            list = state.connections.filter(
              (conn) =>
                conn.toNodeId === fromNodeId &&
                conn.toNodePinName === fromNodePinName
            );
          }

          if (list.length > 0) {
            state.connections = without(state.connections, ...list); // 移除不能多连的旧的连线
          }
        }

        // 推入最新的连线
        state.connections.push(
          fromNodeDirection === 'out-in'
            ? {
                id: generateNodeId(),
                fromNodeId: fromNodeId,
                fromNodePinName: fromNodePinName,
                toNodeId: toNodeId,
                toNodePinName: toNodePinName,
              }
            : {
                id: generateNodeId(),
                fromNodeId: toNodeId,
                fromNodePinName: toNodePinName,
                toNodeId: fromNodeId,
                toNodePinName: fromNodePinName,
              }
        );

        // 连接线去重
        state.connections = uniqBy(state.connections, (item) =>
          [
            item.fromNodeId,
            item.fromNodePinName,
            item.toNodeId,
            item.toNodePinName,
          ].join('|')
        );
      });

      cancelConnect();
    },
    cancelConnect: () => {
      set({
        workingConnection: null,
      });
    },
    checkIsConnected: (nodeId, pinName) => {
      const { connections, workingConnection } = get();

      if (
        workingConnection &&
        workingConnection.fromNodeId === nodeId &&
        workingConnection.fromNodePinName === pinName
      ) {
        return true;
      }

      return connections.some(
        (c) =>
          (c.fromNodeId === nodeId && c.fromNodePinName === pinName) ||
          (c.toNodeId === nodeId && c.toNodePinName === pinName)
      );
    },
    removeConnection: (connectionId) => {
      set((state) => {
        const index = state.connections.findIndex(
          (conn) => conn.id === connectionId
        );
        if (index >= 0) {
          state.connections.splice(index, 1);
        }
      });
    },
  }))
);
