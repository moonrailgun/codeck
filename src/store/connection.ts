import create from 'zustand';
import { TaichuNodePortType } from './node';
import { persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { generateNodeId } from '../utils/string-helper';
import { uniqBy } from 'lodash-es';

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
    fromNodePinType: TaichuNodePortType;
    fromNodeDirection: PinDirection;
  } | null;
  startConnect: (
    fromNodeId: string,
    fromNodePinName: string,
    fromNodePinType: TaichuNodePortType,
    fromNodeDirection: PinDirection
  ) => void;
  endConnect: (
    toNodeId: string,
    toNodePinName: string,
    toNodePinType: TaichuNodePortType,
    toNodeDirection: PinDirection
  ) => void;
  cancelConnect: () => void;
  checkIsConnected: (nodeId: string, pinName: string) => boolean;
  removeConnection: (connectionId: string) => void;
}

export const useConnectionStore = create<ConnectionState>()(
  persist(
    immer((set, get) => ({
      connections: [],
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
        const { workingConnection, cancelConnect, connections } = get();

        if (!workingConnection) {
          return;
        }

        // 正在处于连接状态
        if (toNodeId === workingConnection.fromNodeId) {
          // 连接到相同节点
          cancelConnect();
          return;
        }

        if (toNodeDirection === workingConnection.fromNodeDirection) {
          // 相同方向
          cancelConnect();
          return;
        }

        if (toNodePinType !== workingConnection.fromNodePinType) {
          // 不匹配(譬如exec和port连接)
          cancelConnect();
          return;
        }

        set({
          connections: uniqBy(
            [
              ...connections,
              workingConnection.fromNodeDirection === 'out-in'
                ? {
                    id: generateNodeId(),
                    fromNodeId: workingConnection.fromNodeId,
                    fromNodePinName: workingConnection.fromNodePinName,
                    toNodeId: toNodeId,
                    toNodePinName: toNodePinName,
                  }
                : {
                    id: generateNodeId(),
                    fromNodeId: toNodeId,
                    fromNodePinName: toNodePinName,
                    toNodeId: workingConnection.fromNodeId,
                    toNodePinName: workingConnection.fromNodePinName,
                  },
            ],
            (item) =>
              [
                item.fromNodeId,
                item.fromNodePinName,
                item.toNodeId,
                item.toNodePinName,
              ].join('|')
          ),
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
    })),
    {
      name: 'connection',
      partialize: (state) => ({ connections: state.connections }),
    }
  )
);
