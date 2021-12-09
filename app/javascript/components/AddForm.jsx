import React from "react";
import { useState, useRef } from "react";

const AddForm = (props) => {
  const {subjectName, handleSubmit} = props;
  const [formOpen, setFormOpen] = useState(false);
  const [textValue, setTextValue] = useState('');
  const addFormTextElement = useRef();
  const addFormElement = useRef();

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
        <form className="add-form" ref={addFormElement} onSubmit={onSubmit}>
          <textarea 
            placeholder={`Enter ${subjectName} title...`} 
            value={textValue} 
            onChange={handleChange} 
            required />
          <input type="submit" className="add-form-submit" value={`Add ${subjectName}`} />
          <div className="add-form-cancel" onClick={toggleForm}>X</div>
        </form>

        :
        <p className="add-form-text" ref={addFormTextElement} onClick={toggleForm}>{subjectName}</p>
      }
    </div>
  );
};

export default AddForm;
