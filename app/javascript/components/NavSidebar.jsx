import React from "react";
import { useRef } from "react";
import uniqid from 'uniqid';
import AddForm from "./AddForm";

const NavSidebar = (props) => {
  const { userBoards, invitedBoards, handleBoardLink, handleBoardCreate, handleBoardDestroy } = props;
  const navElement = useRef(); 
  const navOpenElement = useRef();
  const navPeekElement = useRef();

  const toggleNav = () => {
    navElement.current.classList.toggle('nav-sidebar-open');
    navOpenElement.current.classList.toggle('no-display');
    navPeekElement.current.classList.toggle('no-display');
  };

  const handleBoardClick = (boardID, boardTitle) => {
    navElement.current.classList.remove('nav-sidebar-open');
    navOpenElement.current.classList.remove('no-display');
    navPeekElement.current.classList.remove('no-display');
    handleBoardLink(boardID, boardTitle);
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
                <p className="user-board-link" onClick={() => handleBoardClick(board.id, board.title)}>{board.title}</p>
                <div className="board-destroy" onClick={() => handleBoardDestroy(board.id)}>X</div>
              </li>
            )
          })}
        </ul>
        <AddForm subjectName="Board" handleSubmit={handleBoardCreate} />
        <h2 className="nav-board-header">Boards Shared with You:</h2>
        <ul id="invited-boards">
          { invitedBoards.map((board) => {
            return (
              <li className="invited-board-item" key={uniqid('invitedBoard-')} >
                <p className="invited-board-link" onClick={() => handleBoardClick(board.id, board.title)}>{board.title}</p>
              </li>
            )
          })}
        </ul>
      </div>
    </nav>
  );
};

export default NavSidebar;
