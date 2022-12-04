import create from 'zustand';
import { persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { variableTypes } from '../utils/consts';

type VariableType = typeof variableTypes[number];

export interface VariableItem {
  name: string;
  type: VariableType;
  defaultValue?: any;
  currentValue?: any;
}

interface VariableState {
  variableMap: Record<string, VariableItem>; // key 为 变量名
  createVariable: (
    name: string,
    type: VariableType,
    defaultValue?: any
  ) => void;
  deleteVariable: (name: string) => void;
}

export const useVariableStore = create<VariableState>()(
  persist(
    immer((set, get) => ({
      variableMap: {},
      createVariable: (name, type, defaultValue) => {
        set((state) => {
          if (state.variableMap[name]) {
            console.warn('This var has been created');
            return;
          }

          state.variableMap[name] = {
            name,
            type,
            defaultValue,
          };
        });
      },
      deleteVariable: (name) => {
        set((state) => {
          delete state.variableMap[name];
        });
        // TODO: 删除node
      },
    })),
    {
      name: 'variable',
      partialize: (state) => ({ variableMap: state.variableMap }),
    }
  )
);
