import React, { useMemo } from 'react';
import MonacoEditor from '@monaco-editor/react';
import { useNodeStore } from '../../store/node';
import { useConnectionStore } from '../../store/connection';
import { CodeCompiler } from '../../code/compiler';
import { useVariableStore } from '../../store/variable';

export const CodeEditor: React.FC = React.memo(() => {
  const { nodeMap, nodeDefinition } = useNodeStore();
  const { connections } = useConnectionStore();
  const { variableMap } = useVariableStore();

  const code = useMemo(() => {
    try {
      const text = new CodeCompiler().generate();

      return text;
    } catch (err) {
      console.warn(err);
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
