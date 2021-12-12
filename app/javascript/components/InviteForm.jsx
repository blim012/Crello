import React from "react";
import { useState } from "react";
import axios from "axios";

const InviteForm = (props) => {
  const [formOpen, setFormOpen] = useState('');
  const [emailValue, setEmailValue] = useState('');
  const [sentInvite, setSentInvite] = useState(false);

  const toggleForm = () => { 
    setEmailValue('');
    setFormOpen(!formOpen);
  };

  const handleChange = (e) => {
    setEmailValue(e.target.value);
  }

  const handleInvite = () => {
    axios.post('/api/v1/board_users/invite', {
      email: emailValue,
      board_id: props.boardID
    })
    .then((response) => {
      let data = response.data;
      if(data.hasOwnProperty('errors')) 
        return alert(`${data.errors}`)
      setSentInvite(true);
      setTimeout(() => setSentInvite(false), 1500);
    });
  };

  const setInviteButtonClass = () => {
    let className = 'invite-button';
    if(sentInvite) className += ' sent-invite';
    return className;
  };

  const setInviteButtonContent = () => {
    return sentInvite ? 'Sent!' : '+ Invite';
  }

  const onSubmit = (e) => {
    e.preventDefault();
    toggleForm();
    handleInvite();
  }

  return (
    <div className="invite-form-container">
      {formOpen
        ?
        <form className="invite-form" onSubmit={onSubmit}>
          <input 
            type="email"
            placeholder="Enter email..."
            value={emailValue}
            onChange={handleChange}
            required />
          <div className="invite-form-buttons">
            <input type="submit" className="invite-form-submit" value="Invite" />
            <button className="invite-form-cancel" onClick={toggleForm}>Cancel</button>
          </div>
        </form>

        :
        <button className={setInviteButtonClass()} onClick={toggleForm}>
          {setInviteButtonContent()}
        </button>
      }
    </div>
  );
};

export default InviteForm;
