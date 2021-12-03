import React from "react";
import axios from "axios";

const Column = (props) => {
  const ticketButtonHandler = (e) => {
    let title = prompt('Enter Title');
    let column = e.nativeEvent.originalTarget.parentElement;
    let columnTicketsLength = column.querySelector('.column-tickets').children.length;
    console.log(columnTicketsLength);
    axios.post('/api/v1/tickets', {
      column_id: props.columnID,
      order: columnTicketsLength,
      title: title,
      description: 'test'
    })
    .then((response) => {
      console.log(response);
    })
  };

  return (
    <div className='column'>
      <div className="handle"></div>
      <div className="column-tickets">
        { props.children }
      </div>
      <button className="add-ticket-button" onClick={ticketButtonHandler}>+ Ticket</button>
    </div>
  );
};

export default Column;
