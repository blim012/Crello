import React from "react";
import axios from "axios";
import EditForm from "./EditForm";
import InviteForm from "./InviteForm";

const NavHeader = (props) => {
  const {boardID, title, handleBoardTitleChange} = props;
  console.log(title);
  const handleSignOut = () => {
    axios.delete('/users/sign_out', {})
    .then((response) => {
      console.log(response);
    });
  };

  return (
    <nav id="nav-header">
      <EditForm title={title} handleSubmit={handleBoardTitleChange} />
      {boardID >= 0 &&
        <InviteForm boardID={boardID} />
      }
    </nav>
  )
};

export default NavHeader;
