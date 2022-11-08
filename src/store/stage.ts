import create from 'zustand';
import Konva from 'konva';

interface StageState {
  width: number;
  height: number;
  scale: Konva.Vector2d;
  position: Konva.Vector2d;
  setScale: (newScale: number) => void;
  setPosition: (position: Konva.Vector2d) => void;
}

export const useStageStore = create<StageState>((set, get) => ({
  width: window.innerWidth,
  height: window.innerHeight,
  scale: {
    x: 1,
    y: 1,
  },
  position: {
    x: 0,
    y: 0,
  },
  setScale: (newScale: number) => {
    set({
      scale: {
        x: newScale,
        y: newScale,
      },
    });
  },
  setPosition: (position: Konva.Vector2d) => {
    set({
      position,
    });
  },
}));
