import React from "react";
import { useState, useRef } from "react";
import uniqid from "uniqid";
import axios from "axios";
import Ticket from "./Ticket";
import AddForm from "./AddForm";
import EditForm from "./EditForm";

const Column = (props) => {
  const [boardTitle, setBoardTitle] = useState(props.column.title);
  const columnElement = useRef();

  const addTicket = (title) => {
    const columnTicketsLength = columnElement.current.querySelector('.column-tickets').children.length;
    axios.post('/api/v1/tickets', {
      column_id: props.column.id,
      order: columnTicketsLength,
      title: title
    });
  };

  const handleColumnDestroy = () => {
    if(confirm('Delete Column?')) axios.delete(`/api/v1/columns/${props.column.id}`, {});
  };

  const handleColumnTitleChange = (title) => {
    axios.patch(`/api/v1/columns/${props.column.id}` , {
      title: title,
      board_id: props.boardID
    })
    .then((response) => {
      let data = response.data;
      setBoardTitle(data.title);
    });
  }

  return (
    <div className='column' ref={columnElement}>
      <div className="handle column-item prevent-drag-scroll">
        <EditForm title={boardTitle} handleSubmit={handleColumnTitleChange} maxLength={256} />
        <div className="column-destroy" onClick={handleColumnDestroy}>X</div>
      </div>
      <div className="column-tickets">
        { props.column.tickets.map((ticket) => {
            return <Ticket key={uniqid('ticket-')} ticketID={ticket.id} title={ticket.title} />
        })}
      </div>
      <AddForm subjectName='Ticket' handleSubmit={addTicket} maxLength={512} />
    </div>
  );
};

export default Column;
