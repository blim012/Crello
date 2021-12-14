import React from "react";
import { useState, useEffect } from "react";

const EditForm = (props) => {
  const {title, handleSubmit, maxLength} = props;
  const [formOpen, setFormOpen] = useState(false);
  const [textValue, setTextValue] = useState(title);

  useEffect(() => {
    const handleWindowClick = (e) => {
      if(e.target.classList.contains('edit-form')) return;
      if(e.target.parentElement && 
        (e.target.parentElement.classList.contains('edit-form') || 
         e.target.parentElement.classList.contains('edit-form-buttons'))) return;
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
    setTextValue(title);
    setFormOpen(!formOpen);
  };

  const handleChange = (e) => {
    setTextValue(e.target.value);
  };

  const highlightInput = (e) => {
    let input = e.currentTarget;
    input.select();
  }

  const onSubmit = (e) => {
    e.preventDefault();
    handleSubmit(textValue);
    toggleForm();
  };

  return (
    <>
      {formOpen
        ?
        <form className="edit-form prevent-drag-scroll" onSubmit={onSubmit}>
          <input
            type="text"
            value={textValue} 
            onChange={handleChange}
            autoFocus={true}
            onFocus={highlightInput}
            maxLength={maxLength}
            required />
          <div className="edit-form-buttons">
            <input type="submit" className="edit-form-submit button" value={'Edit'} />
            <button className="edit-form-cancel button" onClick={toggleForm}>Cancel</button>
          </div>
        </form>

        :
        <div className="edit-form-text prevent-drag-scroll" onClick={toggleForm}>{title}</div>
      }
    </>
  );
};

export default EditForm;
