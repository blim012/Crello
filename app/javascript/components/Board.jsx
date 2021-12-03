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
              <Column key={uniqid('column-')}>
                { column.tickets.map((ticket) => {
                    return <Ticket key={uniqid('ticket-')} desc={ticket.title} />
                })}
              </Column>
            )    
        })}
      </BoardColumns>
    </div>
  )

  /*
  return (
    <div id="board">
      <div className="some-stuff"></div>
      <BoardColumns>
        <Column id="1">
          <Ticket desc="Swap me around" />
          <Ticket desc="Swap him around" />
          <Ticket desc="Swap her around" />
          <Ticket desc="Swap them around" />
          <Ticket desc="Swap all around" />
          <Ticket desc="Swap zhem around" />
        </Column>
        <Column id="2">
          <Ticket desc="Swap me around 2" />
          <Ticket desc="Swap him around 2" />
          <Ticket desc="Swap her around 2" />
          <Ticket desc="Swap them around 2" />
          <Ticket desc="Swap all around 2" />
          <Ticket desc="Swap zhem around 2" />
        </Column>
        <Column id="3">
          <Ticket desc="Swap me around 3" />
          <Ticket desc="Swap him around 3" />
          <Ticket desc="Swap her around 3" />
          <Ticket desc="Swap them around 3" />
          <Ticket desc="Swap all around 3" />
          <Ticket desc="Swap zhem around 3" />
        </Column>
      </BoardColumns>
    </div>
  );
  */
};

export default Board;
