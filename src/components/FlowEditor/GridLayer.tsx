import React from 'react';
import { Layer, Line } from 'react-konva';
import { useStageStore } from '../../store/stage';

const stepSize = 40;

export const GridLayer: React.FC = React.memo(() => {
  const { width, height, position, scale } = useStageStore((state) => ({
    width: state.width,
    height: state.height,
    position: state.position,
    scale: state.scale,
  }));

  const stageRect = {
    x1: 0,
    y1: 0,
    x2: width,
    y2: height,
    offset: {
      x: position.x / scale.x,
      y: position.y / scale.y,
    },
  };

  const viewRect = {
    x1: -stageRect.offset.x,
    y1: -stageRect.offset.y,
    x2: width / scale.x - stageRect.offset.x,
    y2: height / scale.y - stageRect.offset.y,
  };

  const gridOffset = {
    x: Math.ceil(position.x / scale.x / stepSize) * stepSize,
    y: Math.ceil(position.y / scale.y / stepSize) * stepSize,
  };

  const gridRect = {
    x1: -gridOffset.x,
    y1: -gridOffset.y,
    x2: width / scale.x - gridOffset.x + stepSize,
    y2: height / scale.y - gridOffset.y + stepSize,
  };

  const fullRect = {
    x1: Math.min(viewRect.x1, gridRect.x1),
    y1: Math.min(viewRect.y1, gridRect.y1),
    x2: Math.max(viewRect.x2, gridRect.x2),
    y2: Math.max(viewRect.y2, gridRect.y2),
  };

  // find the x & y size of the grid
  const xSize = fullRect.x2 - fullRect.x1;
  const ySize = fullRect.y2 - fullRect.y1;

  // compute the number of steps required on each axis.
  const xSteps = Math.round(xSize / stepSize) + 1;
  const ySteps = Math.round(ySize / stepSize) + 1;

  return (
    <Layer
      listening={false}
      clipX={viewRect.x1}
      clipY={viewRect.y1}
      clipWidth={viewRect.x2 - viewRect.x1}
      clipHeight={viewRect.y2 - viewRect.y1}
    >
      {Array.from({ length: xSteps }).map((_, i) => (
        <Line
          key={`x-${i}`}
          x={fullRect.x1 + i * stepSize}
          y={fullRect.y1}
          points={[0, 0, 0, ySize]}
          stroke="rgba(255, 255, 255, 0.2)"
          strokeWidth={1}
        />
      ))}

      {Array.from({ length: ySteps }).map((_, i) => (
        <Line
          key={`y-${i}`}
          x={fullRect.x1}
          y={fullRect.y1 + i * stepSize}
          points={[0, 0, xSize, 0]}
          stroke="rgba(255, 255, 255, 0.2)"
          strokeWidth={1}
        />
      ))}
    </Layer>
  );
});
GridLayer.displayName = 'GridLayer';
