import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Board from './Board';
import NavSidebar from './NavSidebar';

const Dashboard = (props) => {
  const [selectedBoardID, setSelectedBoardID] = useState(-1);

  const handleBoardLink = (boardID) => {
    console.log(boardID);
    setSelectedBoardID(boardID);
  };

  return (
    <div id="dashboard">
      <NavSidebar handleBoardLink={handleBoardLink} />
      {selectedBoardID >= 0 
        ?
        <Board boardID={selectedBoardID} />

        :
        <div>No Board Selected</div>
      }
    </div>
  );
};

export default Dashboard;
