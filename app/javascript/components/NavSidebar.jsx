import React from "react";
import { useRef } from "react";
import uniqid from 'uniqid';

const NavSidebar = (props) => {
  const {userBoards, sharedBoards, handleBoardLink} = props;
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
        <ul id="user-boards">
          { userBoards.map((board) => {
            return (
              <li className="user-board-item" 
                  key={uniqid('userBoard-')} 
                  onClick={() => handleBoardClick(board.id)}>
                <p className="user-board-link">{board.title}</p>
              </li>
            )
          })}
        </ul>
        <ul id="shared-boards">
          { sharedBoards.map((board) => {
            return (
              <li className="shared-board-item" 
                  key={uniqid('sharedBoard-')} 
                  onClick={() => handleBoardClick(board.id)}>
                <p className="shared-board-link">{board.title}</p>
              </li>
            )
          })}
        </ul>
      </div>
    </nav>
  );
};

export default NavSidebar;
