import React from 'react';
import ReactDOM from 'react-dom/client';
import './app/styles/index.scss';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from './app/providers/ThemeProvider';
import App from './app/App';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <BrowserRouter>
    <ThemeProvider>
    <App />
    </ThemeProvider>
  </BrowserRouter>
);

