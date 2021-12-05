import React from "react";
import uniqid from 'uniqid';

const NavSidebar = (props) => {
  const {userBoards, sharedBoards, handleBoardLink} = props;

  return (
    <nav id="nav-sidebar">
      <ul id="user-boards">
        { userBoards.map((board) => {
          return (
            <li className="user-board-item" 
                key={uniqid('userBoard-')} 
                onClick={() => handleBoardLink(board.id)}>
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
                onClick={() => handleBoardLink(board.id)}>
              <p className="shared-board-link">{board.title}</p>
            </li>
          )
        })}
      </ul>
    </nav>
  );
};

export default NavSidebar;
