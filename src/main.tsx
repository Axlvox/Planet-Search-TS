import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import PlanetProvider from './context/PlanetProvider';

ReactDOM
  .createRoot(document.getElementById('root') as HTMLElement)
  .render(
    <PlanetProvider>
      <App />
    </PlanetProvider>,
  );
