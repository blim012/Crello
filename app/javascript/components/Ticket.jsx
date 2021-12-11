import React from "react";
import { useState } from "react";
import axios from "axios";
import EditForm from "./EditForm";

const Ticket = (props) => {
  const [ticketTitle, setTicketTitle] = useState(props.title);

  const handleTicketDestroy = (e) => {
    axios.delete(`/api/v1/tickets/${props.ticketID}`, {});
  };

  const handleTicketTitleChange = (title) => {
    axios.patch(`/api/v1/tickets/${props.ticketID}`, {
      title: title
    })
    .then((response) => {
      let data = response.data;
      setTicketTitle(data.title);
    });
  };

  return (
    <div className="ticket column-item prevent-drag-scroll">
      <EditForm title={ticketTitle} handleSubmit={handleTicketTitleChange} />
      <div className="ticket-destroy" onClick={handleTicketDestroy}>X</div>
    </div>
  );
};

//      <p className="ticket-description">{ props.desc }</p>

export default Ticket;
