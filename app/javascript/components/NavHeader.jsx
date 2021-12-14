import React from "react";
import axios from "axios";
import EditForm from "./EditForm";
import InviteForm from "./InviteForm";

const NavHeader = (props) => {
  const {boardID, title, handleBoardTitleChange} = props;

  return (
    <nav id="nav-header">
      <EditForm title={title} handleSubmit={handleBoardTitleChange} maxLength={80} />
      {boardID >= 0 &&
        <InviteForm boardID={boardID} />
      }
    </nav>
  )
};

export default NavHeader;
