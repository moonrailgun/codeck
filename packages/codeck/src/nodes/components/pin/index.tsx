import React from 'react';
import { Group } from 'react-konva';
import { useConnectionStore } from '../../../store/connection';
import { CodeckNodePinDefinition } from '../../../store/node';
import { ExecPin } from './ExecPin';
import { PortPin } from './PortPin';

export const Pin: React.FC<{
  nodeId: string;
  definition: CodeckNodePinDefinition;
  onConnectionStart: () => void;
  onConnectionEnd: () => void;
}> = React.memo((props) => {
  const { type, position, component, name } = props.definition;
  const connected = useConnectionStore().checkIsConnected(props.nodeId, name);

  return (
    <Group>
      {type === 'exec' ? (
        <ExecPin
          x={position.x}
          y={position.y}
          connected={connected}
          onConnectionStart={(e) => {
            e.cancelBubble = true;
            props.onConnectionStart();
          }}
          onConnectionEnd={(e) => {
            e.cancelBubble = true;
            props.onConnectionEnd();
          }}
        />
      ) : (
        <PortPin
          x={position.x}
          y={position.y}
          connected={connected}
          onConnectionStart={(e) => {
            e.cancelBubble = true;
            props.onConnectionStart();
          }}
          onConnectionEnd={(e) => {
            e.cancelBubble = true;
            props.onConnectionEnd();
          }}
        />
      )}

      {component && (
        // 这里的18 和 14 是去除了pin节点的offset, 从位置信息右侧左上角开始算
        // 如果是output节点需要反向对冲x位置
        <Group x={position.x + 18} y={position.y - 6}>
          {React.createElement(component, {
            nodeId: props.nodeId,
          })}
        </Group>
      )}
    </Group>
  );
});
Pin.displayName = 'Pin';
