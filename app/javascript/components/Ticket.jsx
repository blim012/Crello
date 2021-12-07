import React from "react";
import axios from "axios";

const Ticket = (props) => {
  const handleTicketDestroy = (e) => {
    axios.delete(`/api/v1/tickets/${props.ticketID}`, {});
  };

  return (
    <div className="ticket column-item">
      <p>{ props.desc }</p>
      <div className="ticket-destroy" onClick={handleTicketDestroy}>X</div>
    </div>
  );
};

export default Ticket;
