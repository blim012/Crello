import React from "react";
import { useState, useEffect } from "react";
import Dragula from 'react-dragula';

const BoardColumns = (props) => {
  let ticketMoveData = {};
  const [ticketDrake, setTicketDrake] = useState(
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

  const [columnDrake, setColumnDrake] = useState(
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

    // let ticketMoveData = {};

    /*
    setTicketDrake(
      Dragula([...document.querySelectorAll('.column-tickets')])
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
      })
    );

    
    setColumnDrake(
      Dragula([document.querySelector('.board-columns')], {
        moves: (el, container, handle) => {
          console.log('column handle: ');
          console.log(handle);
          return handle.className === 'handle';
        },
        direction: 'horizontal'
      }));
    */
  }, [props.children]);

  /*
  const dragulaColumnDecorator = (element) => {
    Dragula([element], {
      moves: (el, container, handle) => {
        console.log('column handle: ');
        console.log(handle);
        return handle.className === 'handle';
      },
      direction: 'horizontal'
    });
  };
  */

  return (
    <div className="board-columns">
      { props.children }
    </div>
  );
}

export default BoardColumns
