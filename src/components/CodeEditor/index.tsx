import React from 'react';
import MonacoEditor from '@monaco-editor/react';

export const CodeEditor: React.FC = React.memo(() => {
  return (
    <div className="h-full w-full">
      <MonacoEditor theme="vs-dark" />
    </div>
  );
});
CodeEditor.displayName = 'CodeEditor';
