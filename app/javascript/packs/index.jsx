import React from 'react';
import ReactDOM from 'react-dom';
import Dashboard from '../components/Dashboard';

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <React.StrictMode>
      <Dashboard />
    </React.StrictMode>,
    document.body.appendChild(document.createElement('div')),
  )
});
