import React from "react";
import { useRef } from "react";
import uniqid from "uniqid";
import axios from "axios";
import Ticket from "./Ticket";
import AddForm from "./AddForm";

const Column = (props) => {
  const columnElement = useRef();

  const addTicket = (title) => {
    const columnTicketsLength = columnElement.current.querySelector('.column-tickets').children.length;
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

  const handleColumnDestroy = () => {
    axios.delete(`/api/v1/columns/${props.column.id}`, {});
  };

  return (
    <div className='column' ref={columnElement}>
      <div className="handle column-item prevent-drag-scroll">
        <p className="column-title">{props.column.title}</p>
        <div className="column-destroy" onClick={handleColumnDestroy}>X</div>
      </div>
      <div className="column-tickets">
        { props.column.tickets.map((ticket) => {
            return <Ticket key={uniqid('ticket-')} ticketID={ticket.id} desc={ticket.title} />
        })}
      </div>
      <AddForm subjectName='Ticket' handleSubmit={addTicket} />
    </div>
  );
};

export default Column;
