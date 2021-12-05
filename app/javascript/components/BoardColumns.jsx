import React from "react";
import { useState, useEffect } from "react";
import Dragula from 'react-dragula';
import axios from "axios";

const BoardColumns = (props) => {
  let ticketMoveData = {};
  let columnMoveSourceIndex = -1;

  const [ticketDrake, setTicketDrake] = useState(null);
  const [columnDrake, setColumnDrake] = useState(null);

  useEffect(() => {
    if(isDrakesInitialized()) {
      ticketDrake.destroy();
      columnDrake.destroy();
      setTicketDrake(createTicketDrake());
      setColumnDrake(createColumnDrake());
    }
  }, [props.boardID]);

  useEffect(() => {
    if(isDrakesInitialized()) setDrakeContainers()
  }, [props.children]);

  useEffect(() => {
    if(isDrakesInitialized()) cancelDrags();
  });

  useEffect(() => {
    setTicketDrake(createTicketDrake());
    setColumnDrake(createColumnDrake());
  }, []);

  function createTicketDrake() {
    return (
      Dragula([...document.querySelectorAll('.column-tickets')])
      .on('drag', (el, source) => {
        console.log('ticket drag');
        console.log('boardID: ' + props.boardID);
        const column = source.parentElement;
        const columnIndex = Array.from(column.parentElement.children).indexOf(column);
        const ticketIndex = Array.from(source.children).indexOf(el);
        ticketMoveData = { columnIndex, ticketIndex };
      })
      .on('drop', sendTicketMove)
    );
  };

  function createColumnDrake() {
    return (
      Dragula([document.querySelector('.board-columns')], {
        moves: (el, container, handle) => {
          return handle.className === 'handle';
        },
        direction: 'horizontal'
      })
      .on('drag', (el, source) => {
        console.log('column drag');
        console.log('boardID: ' + props.boardID);
        columnMoveSourceIndex = Array.from(source.children).indexOf(el);
      })
      .on('drop', sendColumnMove)
    );
  };

  function sendTicketMove(el, target, source, sibling) {
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
  };

  function sendColumnMove(el, target, source, sibling) {
    console.log('Source index: ' + columnMoveSourceIndex)
    console.log('Destination index: ' + Array.from(source.children).indexOf(el));

    axios.post('/api/v1/columns/move', {
      src_idx: columnMoveSourceIndex,
      dest_idx: Array.from(source.children).indexOf(el),
      board_id: props.boardID
    });
  };

  const setDrakeContainers = () => {
    ticketDrake.containers = [...document.querySelectorAll('.column-tickets')];
    columnDrake.containers = [document.querySelector('.board-columns')];
  };

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

  const cancelDrags = () => {
    ticketDrake.cancel(true);
    columnDrake.cancel(true);
  }

  const isDrakesInitialized = () => (ticketDrake && columnDrake);

  document.addEventListener('keydown', (e) => {
    if(e.code === 'Escape') cancelDrags(); 
  });

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
