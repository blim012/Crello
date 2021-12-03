import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import uniqid from "uniqid";
import Column from "./Column";
import Ticket from "./Ticket";
import BoardColumns from "./BoardColumns";

const Board = (props) => {
  const [columns, setColumns] = useState([]);
  const [boardID, setBoardID] = useState(-1);

  useEffect(() => {
    axios.get('/api/v1/boards/1')
    .then((response) => {
      let data = response.data;
      console.log(data);
      setColumns(data[0].ordered_columns);
      setBoardID(data[0].id);
    });
  }, []);

  return (
    <div id="board">
      <BoardColumns>
        { columns.map((column) => {
            return (
              <Column key={uniqid('column-')} columnID={column.id}>
                { column.tickets.map((ticket) => {
                    return <Ticket key={uniqid('ticket-')} desc={ticket.title} />
                })}
              </Column>
            )    
        })}
      </BoardColumns>
    </div>
  )
};

export default Board;
