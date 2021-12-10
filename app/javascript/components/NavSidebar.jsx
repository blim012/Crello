import React from "react";
import { useState, useEffect, useRef } from "react";
import uniqid from 'uniqid';
import AddForm from "./AddForm";
import axios from "axios";

const NavSidebar = (props) => {
  const handleBoardLink = props.handleBoardLink;
  const navElement = useRef(); 
  const navOpenElement = useRef();
  const navPeekElement = useRef();
  const [userBoards, setUserBoards] = useState([]);
  const [invitedBoards, setInvitedBoards] = useState([]);

  useEffect(() => {
    axios.get('/api/v1/boards')
    .then((response) => {
      const data = response.data;
      let userBoardsToSet = [];
      data.userBoards.forEach((board) => {
        userBoardsToSet.push({title: board.title, id: board.id});
      });
      setUserBoards(userBoardsToSet);
      
      let invitedBoardsToSet = [];
      data.invitedBoards.forEach((board) => {
        invitedBoardsToSet.push({title: board.title, id: board.id});
      });
      setInvitedBoards(invitedBoardsToSet);
    });
  }, []);

  const toggleNav = () => {
    navElement.current.classList.toggle('nav-sidebar-open');
    navOpenElement.current.classList.toggle('no-display');
    navPeekElement.current.classList.toggle('no-display');
  };

  const handleBoardClick = (boardID) => {
    navElement.current.classList.remove('nav-sidebar-open');
    navOpenElement.current.classList.remove('no-display');
    navPeekElement.current.classList.remove('no-display');
    handleBoardLink(boardID);
  };

  const handleBoardDestroy = (boardID) => {
    axios.delete(`/api/v1/boards/${boardID}`, {})
    .then((response) => {
      let data = response.data;
      if(data.hasOwnProperty('errors')) 
        return alert('Cannot delete. Only the board owner may delete a board');
      let userBoardsCopy = [...userBoards];
      for(let i = 0; i < userBoardsCopy.length; i++) {
        if(userBoardsCopy[i].id === boardID) {
          userBoardsCopy.splice(i, 1);
          console.log(userBoardsCopy);
          setUserBoards(userBoardsCopy);
          return;
        }
      }
    })
  }

  const addBoard = (title) => {
    axios.post('/api/v1/boards' , {
      title: title
    })
    .then((response) => {
      let data = response.data;
      let userBoardsToSet = [...userBoards];
      userBoardsToSet.push({title: data.title, id: data.id});
      setUserBoards(userBoardsToSet);
    });
  };

  return (
    <nav id="nav-sidebar" ref={navElement}>
      <div className="rel-wrapper">
        <div id="nav-toggle-outer" ref={navOpenElement} onClick={toggleNav}>
          <p>&gt;</p>
        </div>
        <div id="nav-toggle-inner" onClick={toggleNav}>
          <p>X</p>
        </div>
        <div id="nav-peek" ref={navPeekElement} onClick={toggleNav}></div>
      </div>
      <div id="nav-boards">
        <h2 className="nav-board-header">Your Boards:</h2>
        <ul id="user-boards">
          { userBoards.map((board) => {
            return (
              <li className="user-board-item" key={uniqid('userBoard-')} >
                <p className="user-board-link" onClick={() => handleBoardClick(board.id)}>{board.title}</p>
                <div className="board-destroy" onClick={() => handleBoardDestroy(board.id)}>X</div>
              </li>
            )
          })}
        </ul>
        <AddForm subjectName="Board" handleSubmit={addBoard} />
        <h2 className="nav-board-header">Boards Shared with You:</h2>
        <ul id="invited-boards">
          { invitedBoards.map((board) => {
            return (
              <li className="invited-board-item" key={uniqid('invitedBoard-')} >
                <p className="invited-board-link" onClick={() => handleBoardClick(board.id)}>{board.title}</p>
              </li>
            )
          })}
        </ul>
      </div>
    </nav>
  );
};

export default NavSidebar;
