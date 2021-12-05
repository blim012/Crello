import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import uniqid from "uniqid";
import Column from "./Column";
import BoardColumns from "./BoardColumns";
import consumer from "../channels/consumer";

const Board = (props) => {
  const [columns, setColumns] = useState([]);
  const [boardID, setBoardID] = useState(null);
  const [boardTitle, setBoardTitle] = useState('');

  useEffect(() => {
    axios.get(`/api/v1/boards/${props.boardID}`)
    .then((response) => {
      let data = response.data;
      console.log(data);
      console.log(data[0].id);
      setColumns(data[0].ordered_columns);
      setBoardTitle(data[0].title);
      setBoardID(data[0].id);
    });
  }, [props.boardID]);

  useEffect(() => {
    if(boardID) {
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
      <h1 className="board-title">{boardTitle}</h1>
      {boardID &&
        <BoardColumns boardID={boardID}>
          { columns.map((column) => {
              return <Column key={uniqid('column-')} column={column} />
          })}
        </BoardColumns>
      }
    </div>
  )
};

export default Board;
