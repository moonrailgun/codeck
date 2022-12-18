import React from 'react';
import { useNodeInfo } from '../../hooks/useNodeInfo';
import { useConnectionStore } from '../../store/connection';
import { Pin } from '../components/pin';

export function usePinRender(nodeId: string) {
  const { node, definition } = useNodeInfo(nodeId);

  if (!node || !definition) {
    return null;
  }
  return (
    <>
      {definition.inputs.map((inputPin) => (
        <Pin
          key={nodeId + inputPin.name}
          nodeId={nodeId}
          definition={inputPin}
          onConnectionStart={() => {
            useConnectionStore
              .getState()
              .startConnect(nodeId, inputPin.name, inputPin.type, 'in-out');
          }}
          onConnectionEnd={() => {
            useConnectionStore
              .getState()
              .endConnect(nodeId, inputPin.name, inputPin.type, 'in-out');
          }}
        />
      ))}

      {definition.outputs.map((outputPin) => (
        <Pin
          key={nodeId + outputPin.name}
          nodeId={nodeId}
          definition={outputPin}
          onConnectionStart={() => {
            useConnectionStore
              .getState()
              .startConnect(nodeId, outputPin.name, outputPin.type, 'out-in');
          }}
          onConnectionEnd={() => {
            useConnectionStore
              .getState()
              .endConnect(nodeId, outputPin.name, outputPin.type, 'out-in');
          }}
        />
      ))}
    </>
  );
}
