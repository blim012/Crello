import React from 'react';
import ReactDOM from 'react-dom';
import Board from '../components/Board';
import '../../assets/stylesheets/reset.css';
import '../../assets/stylesheets/dragula.min.css';
import '../../assets/stylesheets/style.css';

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <React.StrictMode>
      <Board />
    </React.StrictMode>,
    document.body.appendChild(document.createElement('div')),
  )
});
