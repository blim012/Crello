import React from "react";
import uniqid from "uniqid";
import axios from "axios";
import Ticket from "./Ticket";

const Column = (props) => {
  const ticketButtonHandler = (e) => {
    let title = prompt('Enter Title');
    let columnElement = e.nativeEvent.originalTarget.parentElement;
    let columnTicketsLength = columnElement.querySelector('.column-tickets').children.length;
    console.log(columnTicketsLength);
    axios.post('/api/v1/tickets', {
      column_id: props.column.id,
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
        { props.column.tickets.map((ticket) => {
            return <Ticket key={uniqid('ticket-')} ticketID={ticket.id} desc={ticket.title} />
        })}
      </div>
      <button className="add-ticket-button" onClick={ticketButtonHandler}>+ Ticket</button>
    </div>
  );
};

export default Column;
