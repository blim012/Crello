import React from "react";
import { useState, useEffect } from "react";

const AddForm = (props) => {
  const {subjectName, handleSubmit, maxLength} = props;
  const [formOpen, setFormOpen] = useState(false);
  const [textValue, setTextValue] = useState('');

  useEffect(() => {
    const handleWindowClick = (e) => {
      if(e.target.classList.contains('add-form')) return;
      if(e.target.parentElement && 
        (e.target.parentElement.classList.contains('add-form') || 
         e.target.parentElement.classList.contains('add-form-buttons'))) return;
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
    setTextValue('');
    setFormOpen(!formOpen);
  };

  const handleChange = (e) => {
    setTextValue(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    handleSubmit(textValue);
    toggleForm();
  };

  return (
    <div className="add-form-container">
      {formOpen
        ?
        <form className="add-form" onSubmit={onSubmit}>
          <textarea
            className="prevent-drag-scroll"
            placeholder={`Enter ${subjectName} title...`} 
            value={textValue} 
            onChange={handleChange} 
            maxLength={maxLength}
            required />
          <div className="add-form-buttons">
            <input type="submit" className="add-form-submit button" value={`Add ${subjectName}`} />
            <div className="add-form-cancel" onClick={toggleForm}>X</div>
          </div>
        </form>

        :
        <p className="add-form-text" onClick={toggleForm}>{`+ ${subjectName}`}</p>
      }
    </div>
  );
};

export default AddForm;
