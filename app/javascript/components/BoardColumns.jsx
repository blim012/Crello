import React from "react";
import { useState, useEffect } from "react";
import Dragula from 'react-dragula';
import axios from "axios";

const BoardColumns = (props) => {
  let ticketMoveData = {};
  const [ticketDrake] = useState(
    Dragula([])
    .on('drag', (el, source) => {
      const column = source.parentElement;
      const columnIndex = Array.from(column.parentElement.children).indexOf(column);
      const ticketIndex = Array.from(source.children).indexOf(el);
      ticketMoveData = { columnIndex, ticketIndex };
    })
    .on('drop', (el, target, source, sibling) => {
      console.log(ticketMoveData);
      console.log('destination column index: ' + Array.from(target.parentElement.parentElement.children).indexOf(target.parentElement));
      console.log('destination ticket index: ' + Array.from(target.children).indexOf(el));
    }));
  const [columnDrake] = useState(
    Dragula([], {
      moves: (el, container, handle) => {
        return handle.className === 'handle';
      },
      direction: 'horizontal'
    }));

  document.addEventListener('keydown', (e) => {
    if(e.code === 'Escape') {
      ticketDrake.cancel(true);
      columnDrake.cancel(true);
    } 
  });

  useEffect(() => {
    ticketDrake.containers = [...document.querySelectorAll('.column-tickets')] 
    columnDrake.containers = [document.querySelector('.board-columns')]
  }, [props.children]);

  const columnButtonHandler = (e) => {
    let title = prompt('Enter Column Title');
    let boardColumnsContainer = e.nativeEvent.originalTarget.parentElement;
    let boardColumnsLength = boardColumnsContainer.querySelector('.board-columns').children.length;
    console.log(boardColumnsLength);
    axios.post('/api/v1/columns', {
      board_id: props.boardID,
      order: boardColumnsLength,
      title: title,
    })
    .then((response) => {
      console.log(response);
    })
  };

  return (
    <div className="board-columns-container">
      <div className="board-columns">
        { props.children }
      </div>
      <button className="add-column-button" onClick={columnButtonHandler}>+ Column</button>
    </div>
  );
}

export default BoardColumns
