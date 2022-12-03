import create from 'zustand';
import Konva from 'konva';
import { useNodeStore } from './node';
import { values } from 'lodash-es';

interface StageState {
  stageRef: Konva.Stage | null;
  width: number;
  height: number;
  scale: Konva.Vector2d;
  position: Konva.Vector2d;
  setStageRef: (stageRef: Konva.Stage | null) => void;
  setSize: (width: number, height: number) => void;
  setScale: (newScale: number) => void;
  setPosition: (position: Konva.Vector2d) => void;
  unscale: (position: Konva.Vector2d) => Konva.Vector2d;
  calcAbsolutePositionToRelative: (
    absolutePos: Konva.Vector2d
  ) => Konva.Vector2d;
  /**
   * 获取鼠标在视口上的坐标
   */
  getPointerPosition: () => Konva.Vector2d;
  /**
   * 获取鼠标在stage上的坐标
   */
  getRelativePointerPosition: () => Konva.Vector2d;
  /**
   * 重置到左上角
   */
  focus: () => void;
}

export const useStageStore = create<StageState>((set, get) => ({
  stageRef: null,
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
  setStageRef: (stageRef) => {
    set({ stageRef });
  },
  setSize: (width, height) => {
    set({ width, height });
  },
  setScale: (newScale) => {
    set({
      scale: {
        x: newScale,
        y: newScale,
      },
    });
  },
  setPosition: (position) => {
    set({
      position,
    });
  },
  unscale: (position) => {
    const { scale } = get();

    return {
      x: position.x / scale.x,
      y: position.y / scale.y,
    };
  },
  /**
   * 将绝对坐标计算为相对于stage的相对坐标
   */
  calcAbsolutePositionToRelative: (absolutePos) => {
    const { position, unscale } = get();

    return unscale({
      x: absolutePos.x - position.x,
      y: absolutePos.y - position.y,
    });
  },

  getPointerPosition: () => {
    return get().stageRef?.getPointerPosition?.() ?? { x: 0, y: 0 };
  },

  getRelativePointerPosition: () => {
    const { calcAbsolutePositionToRelative, getPointerPosition } = get();

    return calcAbsolutePositionToRelative(getPointerPosition());
  },

  focus: () => {
    const nodeList = values(useNodeStore.getState().nodeMap);

    if (nodeList.length === 0) {
      return;
    }

    const minPos = nodeList.reduce(
      (min, curr) => {
        return {
          x: Math.min(min.x, curr.position.x),
          y: Math.min(min.y, curr.position.y),
        };
      },
      {
        x: Infinity,
        y: Infinity,
      }
    );

    get().setPosition({ x: -minPos.x + 40, y: -minPos.y + 40 });
    get().setScale(1); // 重置缩放
  },
}));
