import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Board from './Board';
import NavSidebar from './NavSidebar';

const Dashboard = (props) => {
  const [userBoards, setUserBoards] = useState([]);
  const [invitedBoards, setInvitedBoards] = useState([]);
  const [selectedBoardID, setSelectedBoardID] = useState(-1);

  useEffect(() => {
    axios.get('/api/v1/boards')
    .then((response) => {
      const data = response.data;
      console.log(data);

      let userBoardsToSet = [];
      data.userBoards.forEach((board) => {
        userBoardsToSet.push({title: board.title, id: board.id});
      });
      console.log('user boards: ')
      console.log(userBoardsToSet);
      setUserBoards(userBoardsToSet);
      
      let invitedBoardsToSet = [];
      data.invitedBoards.forEach((board) => {
        invitedBoardsToSet.push({title: board.title, id: board.id});
      });
      console.log('invited boards: ');
      console.log(invitedBoardsToSet);
      setInvitedBoards(invitedBoardsToSet);
    });
  }, []);

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

  const handleBoardLink = (boardID) => {
    console.log(boardID);
    setSelectedBoardID(boardID);
  };

  return (
    <div id="dashboard">
      <NavSidebar userBoards={userBoards} invitedBoards={invitedBoards} handleBoardLink={handleBoardLink} handleBoardDestroy={handleBoardDestroy} />
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
