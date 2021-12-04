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
      sendMove(el, target);
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
      cancelDrags();
    } 
  });

  useEffect(() => {
    ticketDrake.containers = [...document.querySelectorAll('.column-tickets')] 
    columnDrake.containers = [document.querySelector('.board-columns')]
  }, [props.children]);

  useEffect(() => {
    cancelDrags();
  })

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

  const sendMove = (el, target) => {
      console.log(ticketMoveData);
      console.log('destination column index: ' + Array.from(target.parentElement.parentElement.children).indexOf(target.parentElement));
      console.log('destination ticket index: ' + Array.from(target.children).indexOf(el));
      console.log(props.boardID);
      
      axios.post('/api/v1/tickets/move', {
        src_col_idx: ticketMoveData.columnIndex,
        src_ticket_idx: ticketMoveData.ticketIndex,
        dest_col_idx: Array.from(target.parentElement.parentElement.children).indexOf(target.parentElement),
        dest_ticket_idx: Array.from(target.children).indexOf(el),
        board_id: props.boardID
      });
  }

  const cancelDrags = () => {
    ticketDrake.cancel(true);
    columnDrake.cancel(true);
  }

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
