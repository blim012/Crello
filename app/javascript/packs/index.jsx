import React from 'react';
import ReactDOM from 'react-dom';
import Dashboard from '../components/Dashboard';
import axios from 'axios';

document.addEventListener('DOMContentLoaded', () => {
  let token = document.head.querySelector('meta[name="csrf-token"]');
  if(token) axios.defaults.headers.common['X-CSRF-TOKEN'] = token.content;

  ReactDOM.render(
    <React.StrictMode>
      <Dashboard />
    </React.StrictMode>,
    document.body.appendChild(document.createElement('div')),
  )
});
