import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import uniqid from "uniqid";
import ScrollContainer from 'react-indiana-drag-scroll'
import Column from "./Column";
import BoardColumns from "./BoardColumns";
import consumer from "../channels/consumer";

const Board = (props) => {
  const [columns, setColumns] = useState([]);
  const [boardID, setBoardID] = useState(null);
  const [boardChannel, setBoardChannel] = useState(null);
  const [boardNotFound, setBoardNotFound] = useState(false);

  useEffect(() => {
    axios.get(`/api/v1/boards/${props.boardID}`)
    .then((response) => {
      let data = response.data;
      if(data.hasOwnProperty('no_board_found')) {
        setBoardNotFound(true);
      }
      else {
        setColumns(data.ordered_columns);
        setBoardID(data.id);
        setBoardNotFound(false);
      }
    });
  }, [props.boardID]);

  useEffect(() => {
    if(boardID) {
      if(boardChannel) consumer.subscriptions.remove(boardChannel);
      const boardChannelToSet = consumer.subscriptions.create({ channel: 'BoardsChannel', board_id: `${boardID}`}, {
        connected() {
          // Called when the subscription is ready for use on the server
        },
      
        disconnected() {
          // Called when the subscription has been terminated by the server
        },
      
        received(data) {
          // Called when there's incoming data on the websocket for this channel
          data.hasOwnProperty('delete') ? setBoardNotFound(true) : setColumns(data.board.ordered_columns);
        }
      });
      setBoardChannel(boardChannelToSet);
    }
  }, [boardID]);

  return (
    boardNotFound
      ?
      <p>Board not found or deleted by board owner</p>

      :
      <ScrollContainer 
        className="scroll-container" 
        ignoreElements=".prevent-drag-scroll"
        hideScrollbars={false} >
        <div id="board">
          {boardID &&
            <BoardColumns boardID={boardID}>
              { columns.map((column) => {
                  return <Column key={uniqid('column-')} column={column} boardID={boardID} />
              })}
            </BoardColumns>
          }
        </div>
      </ScrollContainer>
    
  )
};

export default Board;
