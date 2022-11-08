import React from 'react';
import { Allotment } from 'allotment';
import { CodeEditor } from './components/CodeEditor';
import { FlowEditor } from './components/FlowEditor';
import 'allotment/dist/style.css';

function App() {
  return (
    <div className="w-screen h-screen">
      <Allotment>
        <Allotment.Pane>
          <FlowEditor />
        </Allotment.Pane>
        <Allotment.Pane snap={true} preferredSize="30%">
          <CodeEditor />
        </Allotment.Pane>
      </Allotment>
    </div>
  );
}

export default App;
