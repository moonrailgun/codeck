import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './tailwind.css';
import './index.css';
import './test'; // for test

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
