import React from "react";
import { useRef } from "react";
import uniqid from 'uniqid';
import axios from "axios";

const NavSidebar = (props) => {
  const {userBoards, invitedBoards, handleBoardLink, handleBoardDestroy} = props;
  const navElement = useRef(); 
  const navOpenElement = useRef();

  const toggleNav = () => {
    navElement.current.classList.toggle('nav-sidebar-open');
    navOpenElement.current.classList.toggle('no-display');
  };

  const handleBoardClick = (boardID) => {
    navElement.current.classList.remove('nav-sidebar-open');
    navOpenElement.current.classList.remove('no-display');
    handleBoardLink(boardID);
  };

  /*
  const handleBoardDestroy = (e, boardID) => {
    axios.delete(`/api/v1/boards/${boardID}`, {})
    .then((response) => {
      let data = response.data;
      if(data.hasOwnProperty('errors')) 
        return alert('Cannot delete. Only the board owner may delete a board');
      e.nativeEvent.target.parentElement.remove();
    })
  };
  */

  return (
    <nav id="nav-sidebar" ref={navElement}>
      <div className="rel-wrapper">
        <div id="nav-toggle-outer" ref={navOpenElement} onClick={toggleNav}>
          <p>&gt;</p>
        </div>
        <div id="nav-toggle-inner" onClick={toggleNav}>
          <p>X</p>
        </div>
      </div>
      <div id="nav-boards">
        <p>Your Boards:</p>
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
        <p>Boards Shared with You:</p>
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
