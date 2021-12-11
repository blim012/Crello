import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import uniqid from "uniqid";
import ScrollContainer from 'react-indiana-drag-scroll'
import Column from "./Column";
import BoardColumns from "./BoardColumns";
import consumer from "../channels/consumer";
import EditForm from "./EditForm";

const Board = (props) => {
  const [columns, setColumns] = useState([]);
  const [boardID, setBoardID] = useState(null);
  const [boardChannel, setBoardChannel] = useState(null);
  const [boardNotFound, setBoardNotFound] = useState(false);

  useEffect(() => {
    axios.get(`/api/v1/boards/${props.boardID}`)
    .then((response) => {
      let data = response.data;
      console.log(response);
      if(data.hasOwnProperty('no_board_found')) {
        setBoardNotFound(true);
      }
      else {
        console.log(data);
        console.log(data.id);
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
          console.log(`Connect to board ${boardID}`);
        },
      
        disconnected() {
          // Called when the subscription has been terminated by the server
          console.log(`Disconnected from board ${boardID}`);
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
        <EditForm title={props.title} handleSubmit={props.handleBoardTitleChange} />
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

//<h1 className="board-title">{boardTitle}</h1>

export default Board;
