import React from 'react';
import { Allotment } from 'allotment';
import { CodeEditor } from './components/CodeEditor';
import { FlowEditor } from './components/FlowEditor';
import 'allotment/dist/style.css';
import { ManagerPanel } from './components/ManagerPanel';

function App() {
  return (
    <div className="w-screen h-screen">
      <Allotment>
        <Allotment.Pane preferredSize="20%">
          <ManagerPanel />
        </Allotment.Pane>

        <Allotment vertical={true}>
          <Allotment.Pane>
            <FlowEditor />
          </Allotment.Pane>
          <Allotment.Pane snap={true} preferredSize="30%">
            <CodeEditor />
          </Allotment.Pane>
        </Allotment>
      </Allotment>
    </div>
  );
}

export default App;
