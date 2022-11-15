import { useUpdate } from 'ahooks';
import React, { useEffect, useState } from 'react';
import { Layer } from 'react-konva';
import { useUpdateRef } from '../../hooks/useUpdateRef';
import { ConnectInfo, useConnectionStore } from '../../store/connection';
import { useStageStore } from '../../store/stage';
import { useStage } from '../../hooks/useStage';
import { useNodeStore } from '../../store/node';
import Konva from 'konva';
import { Connection } from '../Connection';

function getWorkingConnectionFromPos(): Konva.Vector2d {
  const { workingConnection } = useConnectionStore.getState();

  if (!workingConnection) {
    return { x: 0, y: 0 };
  }

  return (
    getPinPos(
      workingConnection.fromNodeId,
      workingConnection.fromNodePinName
    ) ?? { x: 0, y: 0 }
  );
}

function getConnectionFromToPos(
  connection: ConnectInfo
): { from: Konva.Vector2d; to: Konva.Vector2d } | null {
  const { fromNodeId, fromNodePinName, toNodeId, toNodePinName } = connection;

  const from = getPinPos(fromNodeId, fromNodePinName);
  const to = getPinPos(toNodeId, toNodePinName);

  if (!from || !to) {
    return null;
  }

  return {
    from,
    to,
  };
}

function getPinPos(nodeId: string, nodePinName: string) {
  const { nodeMap, getPinDefinitionByName } = useNodeStore.getState();

  const node = nodeMap[nodeId];
  if (!node) {
    return null;
  }

  const pinDefinition = getPinDefinitionByName(nodeId, nodePinName);
  if (!pinDefinition) {
    return null;
  }

  return {
    x: node.position.x + pinDefinition.position.x,
    y: node.position.y + pinDefinition.position.y,
  };
}

/**
 * 仅用于绘制
 * 因为线条的刷新频率比较高，所以单独放一个layer
 */
export const ConnectionLayer: React.FC = React.memo(() => {
  const { connections, workingConnection, endConnect } = useConnectionStore();
  const { getRelativePointerPosition, unscale } = useStageStore();
  useNodeStore(); // 这只是为了确保node位置更新了这个layer也能被渲染
  const [selectedConnectionId, setSelectedConnectionId] = useState('');

  const updateDraw = useUpdate();

  const workingConnectionRef = useUpdateRef(workingConnection);

  const selectedConnectionIdRef = useUpdateRef(selectedConnectionId);

  useStage((stage) => {
    const mouseMoveHandler = () => {
      if (workingConnectionRef.current) {
        updateDraw();
      }
    };

    stage.on('mousemove', mouseMoveHandler);

    return () => {
      stage.off('mousemove', mouseMoveHandler);
    };
  });

  useStage((stage) => {
    const handleAutoCreateNode = () => {
      setSelectedConnectionId(''); // 清空当前选择的连接线

      if (workingConnectionRef.current) {
        // 正在选择
        // TODO: 自动创建并连接默认入口/出口
        console.log('handleAutoCreateNode');
      }
    };

    stage.on('click', handleAutoCreateNode);

    return () => {
      stage.off('click', handleAutoCreateNode);
    };
  });

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        endConnect();
      }

      if (e.key === 'Backspace' && selectedConnectionIdRef.current) {
        useConnectionStore
          .getState()
          .removeConnection(selectedConnectionIdRef.current);
      }
    };

    const handleContextMenu = (e: MouseEvent) => {
      if (workingConnectionRef.current) {
        // 正在选择
        endConnect();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('contextmenu', handleContextMenu);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('contextmenu', handleContextMenu);
    };
  }, []);

  let workingConnectionEl: React.ReactNode = null;
  if (workingConnection) {
    const fromPos = unscale(getWorkingConnectionFromPos());
    const toPos = getRelativePointerPosition();

    workingConnectionEl = (
      <Connection
        from={fromPos}
        to={toPos}
        direction={workingConnection.fromDirection}
      />
    );
  }

  return (
    <Layer>
      {/* created connections */}
      {connections.map((connection) => {
        const info = getConnectionFromToPos(connection);
        if (!info) {
          return null;
        }

        return (
          <Connection
            key={connection.id}
            from={info.from}
            to={info.to}
            direction={'out-in'}
            isActive={connection.id === selectedConnectionId}
            onClick={(e) => {
              e.cancelBubble = true;
              setSelectedConnectionId(connection.id);
            }}
          />
        );
      })}

      {workingConnectionEl}
    </Layer>
  );
});
ConnectionLayer.displayName = 'ConnectionLayer';
