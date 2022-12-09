import React, { useMemo } from 'react';
import MonacoEditor from '@monaco-editor/react';
import {
  useNodeStore,
  useConnectionStore,
  CodeCompiler,
  useVariableStore,
} from 'codeck';
import { Message } from '@arco-design/web-react';
import { useRegistryStore } from '@/registry/store';

export const CodeEditor: React.FC = React.memo(() => {
  const { nodeMap, nodeDefinition } = useNodeStore((state) => ({
    nodeMap: state.nodeMap,
    nodeDefinition: state.nodeDefinition,
  }));
  const connections = useConnectionStore((state) => state.connections);
  const variableMap = useVariableStore((state) => state.variableMap);
  const inited = useRegistryStore((state) => state.inited);

  const code = useMemo(() => {
    if (inited === false) {
      return '// [Plugin has not been inited]';
    }

    try {
      const text = new CodeCompiler().generate();
      return text;
    } catch (err) {
      console.warn(err);
      Message.warning('Code Compile Failed.');
    }
  }, [nodeMap, nodeDefinition, connections, variableMap, inited]);

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
