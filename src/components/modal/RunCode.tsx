import React, { useEffect, useRef } from 'react';
import { Modal } from '@arco-design/web-react';

/**
 * 打开运行代码的模态框
 * @param code js代码
 */
export function openRunCodeModal(code: string) {
  Modal.confirm({
    title: 'Run Code Result',
    footer: null,
    icon: null,
    content: <RunCodeModal code={code} />,
  });
}

export const RunCodeModal: React.FC<{ code: string }> = React.memo((props) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (!iframeRef.current) {
      return;
    }

    const codeDoc = iframeRef.current.contentWindow?.document;
    if (!codeDoc) {
      return;
    }

    codeDoc.open();
    codeDoc.writeln(
      `<!DOCTYPE html>
  <style>
    html, body{
      color: white;
      margin: 0;
      padding: 0;
    }
  </style>
  <body>
    <p id="logger"></p>
  </body>
  <script>
    window.parent = null;
    window.top = null;
    window.console = {
      log: function(str){
        var node = document.createElement("div");
        node.appendChild(document.createTextNode(JSON.stringify(str)));
        document.getElementById("logger").appendChild(node);
      }
    }

    try{
      ${props.code}
    }
    catch(err){
      console.log("Error");
      console.log(\`\${err}\`);
    }
  </script>
  </html>`
    );
    codeDoc.close();
  }, []);

  return <iframe ref={iframeRef} className="w-full h-full" />;
});
RunCodeModal.displayName = 'RunCodeModal';
