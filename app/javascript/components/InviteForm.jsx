import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

const InviteForm = (props) => {
  const [formOpen, setFormOpen] = useState('');
  const [emailValue, setEmailValue] = useState('');
  const [sentInvite, setSentInvite] = useState(false);

  useEffect(() => {
    const handleWindowClick = (e) => {
      if(e.target.classList.contains('invite-form')) return;
      if(e.target.parentElement && 
        (e.target.parentElement.classList.contains('invite-form') || 
         e.target.parentElement.classList.contains('invite-form-buttons'))) return;
      toggleForm();
    };

    if(formOpen) {
      window.addEventListener('click', handleWindowClick);
    } else {
      window.removeEventListener('click', handleWindowClick);
    }

    return () => window.removeEventListener('click', handleWindowClick);
  }, [formOpen])

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
    let className = 'invite-button button';
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
            <input type="submit" className="invite-form-submit button" value="Invite" />
            <button className="invite-form-cancel button" onClick={toggleForm}>Cancel</button>
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
