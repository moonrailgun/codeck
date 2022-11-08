import React from 'react';
import { Stage, Layer, Rect, Text } from 'react-konva';
import Konva from 'konva';
import { GridLayer } from './GridLayer';
import { useMemoizedFn } from 'ahooks';
import { useStageStore } from '../../store/stage';

const scaleBy = 1.05;

export const FlowEditor: React.FC = React.memo(() => {
  const { width, height, scale, setScale, position, setPosition } =
    useStageStore();

  const handleWheel = useMemoizedFn((e: Konva.KonvaEventObject<WheelEvent>) => {
    e.evt.preventDefault();
    const stage = e.currentTarget as Konva.Stage;

    const oldScale = stage.scaleX();
    const pointer = stage.getPointerPosition();

    if (!pointer) {
      return;
    }

    const mousePointTo = {
      x: (pointer.x - stage.x()) / oldScale,
      y: (pointer.y - stage.y()) / oldScale,
    };

    // how to scale? Zoom in? Or zoom out?
    let direction = e.evt.deltaY > 0 ? 1 : -1;

    // when we zoom on trackpad, e.evt.ctrlKey is true
    // in that case lets revert direction
    if (e.evt.ctrlKey) {
      direction = -direction;
    }

    const newScale = direction > 0 ? oldScale * scaleBy : oldScale / scaleBy;

    setScale(newScale);

    const newPos = {
      x: pointer.x - mousePointTo.x * newScale,
      y: pointer.y - mousePointTo.y * newScale,
    };
    setPosition(newPos);
  });

  const handleDragEnd = useMemoizedFn(
    (e: Konva.KonvaEventObject<DragEvent>) => {
      setPosition(e.currentTarget.position());
    }
  );

  return (
    <Stage
      className="h-full w-full"
      width={width}
      height={height}
      scale={scale}
      x={position.x}
      y={position.y}
      onWheel={handleWheel}
      onDragEnd={handleDragEnd}
      draggable={true}
    >
      <GridLayer />
      <Layer>
        <Text text="Try click on rect" fill="white" />
        <ColoredRect />
      </Layer>
    </Stage>
  );
});
FlowEditor.displayName = 'FlowEditor';

class ColoredRect extends React.Component {
  state = {
    color: 'green',
  };
  handleClick = () => {
    this.setState({
      color: Konva.Util.getRandomColor(),
    });
  };
  render() {
    return (
      <Rect
        x={20}
        y={20}
        width={50}
        height={50}
        fill={this.state.color}
        shadowBlur={5}
        onClick={this.handleClick}
      />
    );
  }
}
