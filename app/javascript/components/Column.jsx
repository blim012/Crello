import React from "react";

const Column = (props) => {
  return (
    <div className='column'>
      <div className="handle"></div>
      <div className="column-tickets">
        { props.children }
      </div>
    </div>
  );
};

export default Column;
