import { uniq, without } from 'lodash-es';
import create from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { useConnectionStore } from './connection';
import { useNodeStore } from './node';

interface UIState {
  selectedNodeIds: string[];
  selectedConnectionIds: string[];
  addSelectedNodes: (nodeIds: string[]) => void;
  switchSelectNodes: (nodeIds: string[]) => void;
  addSelectedConnections: (connectionIds: string[]) => void;
  /**
   * 清除选中状态
   */
  clearSelectedStatus: () => void;
  /**
   * 删除选中节点和连线
   */
  deleteAllSelected: () => void;
  /**
   * 移动所有选中
   */
  moveSelected: (deltaX: number, deltaY: number) => void;
}

export const useUIStore = create<UIState>()(
  immer((set, get) => ({
    selectedNodeIds: [] as string[],
    selectedConnectionIds: [] as string[],
    addSelectedNodes: (nodeIds) => {
      set((state) => {
        state.selectedNodeIds = uniq([...state.selectedNodeIds, ...nodeIds]);
      });
    },
    switchSelectNodes: (nodeIds) => {
      set((state) => {
        if (
          nodeIds.length === 1 &&
          [...state.selectedNodeIds].includes(nodeIds[0])
        ) {
          state.selectedNodeIds = without(state.selectedNodeIds, nodeIds[0]);
        } else {
          state.selectedNodeIds = uniq([...state.selectedNodeIds, ...nodeIds]);
        }
      });
    },
    addSelectedConnections: (connectionIds) => {
      set((state) => {
        if (
          connectionIds.length === 1 &&
          state.selectedConnectionIds.includes(connectionIds[0])
        ) {
          state.selectedConnectionIds = without(
            state.selectedConnectionIds,
            connectionIds[0]
          );
        } else {
          state.selectedConnectionIds = uniq([
            ...state.selectedConnectionIds,
            ...connectionIds,
          ]);
        }
      });
    },
    clearSelectedStatus: () => {
      set((state) => {
        state.selectedNodeIds = [];
        state.selectedConnectionIds = [];
      });
    },
    deleteAllSelected: () => {
      set((state) => {
        state.selectedConnectionIds.map((id) => {
          useConnectionStore.getState().removeConnection(id);
        });
        state.selectedNodeIds.map((id) => {
          useNodeStore.getState().removeNode(id);
        });

        state.selectedNodeIds = [];
        state.selectedConnectionIds = [];
      });
    },
    moveSelected: (deltaX: number, deltaY: number) => {
      const nodeIds = get().selectedNodeIds;

      nodeIds.forEach((nodeId) => {
        useNodeStore.getState().moveNode(nodeId, deltaX, deltaY);
      });
    },
  }))
);
