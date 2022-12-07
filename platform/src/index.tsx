import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { initRegistry } from './registry/init';
import './tailwind.css';
import '@arco-design/web-react/dist/css/arco.css';
import './index.css';
import './reg';

initRegistry();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <App />
);
