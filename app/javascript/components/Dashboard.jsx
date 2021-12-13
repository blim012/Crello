import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Board from './Board';
import NavSidebar from './NavSidebar';
import NavHeader from './NavHeader';
import Home from './Home';

const Dashboard = (props) => {
  const [selectedBoardID, setSelectedBoardID] = useState(-1);
  const [selectedBoardTitle, setSelectedBoardTitle] = useState('');
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

  const handleBoardLink = (boardID, boardTitle) => {
    console.log(boardID);
    setSelectedBoardTitle(boardTitle);
    setSelectedBoardID(boardID);
  };

  const handleBoardTitleChange = (title) => {
    axios.patch(`/api/v1/boards/${selectedBoardID}`, {
      title: title
    })
    .then((response) => {
      console.log(response);
      let data = response.data;
      if(data.hasOwnProperty('errors')) 
        return alert('Cannot rename. Only the board owner may rename their board');
      let userBoardsCopy = [...userBoards]; 
      for(let i = 0; i < userBoardsCopy.length; i++) {
        if(userBoardsCopy[i].id === data.id) {
          userBoardsCopy[i].title = data.title;
          setUserBoards(userBoardsCopy);
          setSelectedBoardTitle(data.title);
          return;
        }
      }
    })
  };

  const handleBoardCreate = (title) => {
    axios.post('/api/v1/boards' , {
      title: title
    })
    .then((response) => {
      let data = response.data;
      let userBoardsToSet = [...userBoards];
      userBoardsToSet.push({title: data.title, id: data.id});
      setUserBoards(userBoardsToSet);
    });
  }

  const handleBoardDestroy = (boardID) => {
    if(confirm('Delete Board?')) {
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
      });
    }
  };

  const handleBoardLeave = (boardID) => {
    if(confirm('Leave board?')) {
      axios.delete(`/api/v1/board_users/leave/${boardID}`, {})
      .then((response) => {
        let data = response.data;
        if(data.hasOwnProperty('errors'))
          return alert(`${data.errors}`)
        let invitedBoardsCopy = [...invitedBoards];
        for(let i = 0; i < invitedBoardsCopy.length; i++) {
          if(invitedBoardsCopy[i].id === boardID) {
            invitedBoardsCopy.splice(i, 1);
            console.log(invitedBoardsCopy);
            setInvitedBoards(invitedBoardsCopy);
            setSelectedBoardID(-1);
            setSelectedBoardTitle('');
            return;
          }
        }
      });
    }
  };

  return (
    <div id="dashboard">
      <NavHeader boardID={selectedBoardID} title={selectedBoardTitle} handleBoardTitleChange={handleBoardTitleChange} />
      <NavSidebar 
        userBoards={userBoards} 
        invitedBoards={invitedBoards} 
        handleBoardLink={handleBoardLink}
        handleBoardCreate={handleBoardCreate} 
        handleBoardDestroy={handleBoardDestroy} 
        handleBoardLeave={handleBoardLeave} />
      {selectedBoardID >= 0 
        ?
        <Board boardID={selectedBoardID} />

        :
        <Home />
      }
    </div>
  );
};

export default Dashboard;
