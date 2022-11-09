import { useMemoizedFn } from 'ahooks';
import Konva from 'konva';
import { useEffect } from 'react';
import { useStageStore } from '../store/stage';

export function useStage(
  callback: (stage: Konva.Stage) => ReturnType<React.EffectCallback>
) {
  const fn = useMemoizedFn(callback);
  const { stageRef } = useStageStore();

  useEffect(() => {
    let ret: ReturnType<React.EffectCallback>;
    if (stageRef) {
      ret = fn(stageRef);
    }

    return () => {
      if (stageRef && ret) {
        ret();
      }
    };
  }, [stageRef]);
}
