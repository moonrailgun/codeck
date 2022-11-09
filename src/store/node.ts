import create from 'zustand';
import { immer } from 'zustand/middleware/immer';
import Konva from 'konva';

type TaichuNodeType = 'begin' | 'return' | 'function' | 'logic';

interface TaichuNode {
  id: string;
  type: TaichuNodeType;
  name: string;
  position: Konva.Vector2d;
}

export interface TaichuNodeComponentProps {
  id: string;
}

interface TaichuNodePortDefinition {
  name: string;
  type: 'port' | 'exec';
  defaultValue?: any;
  renderType: string;
}

export interface TaichuNodeDefinition {
  name: string;
  inputs: TaichuNodePortDefinition[];
  outputs: TaichuNodePortDefinition[];
  component: React.ComponentType<TaichuNodeComponentProps>;
}

interface NodeState {
  nodeMap: Record<string, TaichuNode>;
  nodeDefinition: Record<string, TaichuNodeDefinition>;
  regNode: (definition: TaichuNodeDefinition) => void;
}

export const useNodeStore = create<NodeState, [['zustand/immer', never]]>(
  immer((set) => ({
    nodeMap: {},
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
  }))
);
