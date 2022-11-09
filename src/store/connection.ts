import create from 'zustand';
import Konva from 'konva';

interface ConnectInfo {}

type ConnectType = 'out' | 'in';

interface ConnectionState {
  connections: ConnectInfo[];
  workingConnection: {
    from: Konva.Node;
    type: ConnectType;
  } | null;
  startConnect: (from: Konva.Node, type: ConnectType) => void;
  endConnect: () => void;
}

export const useConnectionStore = create<ConnectionState>((set, get) => ({
  connections: [],
  workingConnection: null,
  startConnect: (from: Konva.Node, type: ConnectType) => {
    set({
      workingConnection: {
        from,
        type,
      },
    });
  },
  endConnect: () => {
    set({
      workingConnection: null,
    });
  },
}));
