import React, { useMemo } from 'react';
import MonacoEditor from '@monaco-editor/react';
import {
  useNodeStore,
  useConnectionStore,
  CodeCompiler,
  useVariableStore,
} from 'codeck';
import { Message } from '@arco-design/web-react';

export const CodeEditor: React.FC = React.memo(() => {
  const { nodeMap, nodeDefinition } = useNodeStore((state) => ({
    nodeMap: state.nodeMap,
    nodeDefinition: state.nodeDefinition,
  }));
  const { connections } = useConnectionStore((state) => ({
    connections: state.connections,
  }));
  const { variableMap } = useVariableStore((state) => ({
    variableMap: state.variableMap,
  }));

  const code = useMemo(() => {
    try {
      const text = new CodeCompiler().generate();
      return text;
    } catch (err) {
      console.warn(err);
      Message.warning('Code Compile Failed.');
    }
  }, [nodeMap, nodeDefinition, connections, variableMap]);

  return (
    <div className="h-full w-full">
      <MonacoEditor
        theme="vs-dark"
        language="javascript"
        value={code}
        options={{ readOnly: true }}
      />
    </div>
  );
});
CodeEditor.displayName = 'CodeEditor';
