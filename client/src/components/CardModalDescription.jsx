import React from "react";

const CardModalDescription = () => {
  return (
    <form className="description">
      <p>Description</p>
      <textarea className="textarea-toggle" rows="1" autoFocus>
        Cards have a symbol to indicate if they contain a description.
      </textarea>
      <div>
        <div className="button" value="Save">
          Save
        </div>
        <i className="x-icon icon"></i>
      </div>
    </form>
  );
};

export default CardModalDescription;
