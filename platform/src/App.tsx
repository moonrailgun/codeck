import React from 'react';
import { Allotment } from 'allotment';
import { CodeEditor } from './components/CodeEditor';
import { ManagerPanel } from './components/ManagerPanel';
import { FlowEditor } from 'codeck';
import 'allotment/dist/style.css';

function App() {
  return (
    <div className="w-screen h-screen">
      <Allotment>
        <Allotment.Pane preferredSize="20%" minSize={250}>
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
