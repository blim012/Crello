import React from "react";
import { useState } from "react";

const AddForm = (props) => {
  const {subjectName, handleSubmit} = props;
  const [formOpen, setFormOpen] = useState(false);
  const [textValue, setTextValue] = useState('');

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
            required />
          <div className="add-form-buttons">
            <input type="submit" className="add-form-submit" value={`Add ${subjectName}`} />
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
