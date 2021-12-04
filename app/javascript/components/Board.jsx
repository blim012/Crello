import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import uniqid from "uniqid";
import Column from "./Column";
import Ticket from "./Ticket";
import BoardColumns from "./BoardColumns";
import consumer from "../channels/consumer";

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

  useEffect(() => {
    if(boardID >= 0) {
      consumer.subscriptions.create({ channel: 'BoardsChannel', board_id: `${boardID}`}, {
        connected() {
          // Called when the subscription is ready for use on the server
          console.log(`Connect to board ${boardID}`);
        },
      
        disconnected() {
          // Called when the subscription has been terminated by the server
          console.log(`Disconnected from board ${boardID}`);
        },
      
        received(data) {
          // Called when there's incoming data on the websocket for this channel
          setColumns(data.board.ordered_columns);
        }
      });
    }
  }, [boardID]);

  return (
    <div id="board">
      <BoardColumns boardID={boardID}>
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
