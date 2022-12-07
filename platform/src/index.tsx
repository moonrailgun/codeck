import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { initRegistry } from './registry/init';
import { persist } from 'codeck';
import './tailwind.css';
import '@arco-design/web-react/dist/css/arco.css';
import './index.css';
import './reg';

initRegistry();

try {
  persist.loadFromLocalStorage();
} catch (err) {
  console.warn(err);
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <App />
);
