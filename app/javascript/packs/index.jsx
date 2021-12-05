import React from 'react';
import ReactDOM from 'react-dom';
import Dashboard from '../components/Dashboard';
import '../../assets/stylesheets/reset.css';
import '../../assets/stylesheets/dragula.min.css';
import '../../assets/stylesheets/style.css';

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <React.StrictMode>
      <Dashboard />
    </React.StrictMode>,
    document.body.appendChild(document.createElement('div')),
  )
});
