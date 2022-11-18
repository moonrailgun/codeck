import { uniq } from 'lodash-es';
import create from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { useConnectionStore } from './connection';
import { useNodeStore } from './node';

interface UIState {
  selectedNodeIds: string[];
  selectedConnectionIds: string[];
  addSelectedNodes: (nodeIds: string[]) => void;
  addSelectedConnections: (connectionIds: string[]) => void;
  /**
   * 清除选中状态
   */
  clearSelectedStatus: () => void;
  /**
   * 删除选中节点和连线
   */
  deleteAllSelected: () => void;
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
    addSelectedConnections: (connectionIds) => {
      set((state) => {
        state.selectedConnectionIds = uniq([
          ...state.selectedConnectionIds,
          ...connectionIds,
        ]);
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
  }))
);
