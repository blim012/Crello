import React from "react";
import EditForm from "./EditForm";
import axios from "axios";

const NavHeader = (props) => {
  const {title, handleBoardTitleChange} = props;
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
    </nav>
  )
};
// <button className="sign-out-button" onClick={handleSignOut}>Sign Out</button>
export default NavHeader;
