import React from "react";
import { useState } from "react";

const CardModalHeader = ({cardTitle, listTitle}) => {
  if (!cardTitle || !listTitle) return null;

  // change variable name to account for original title and edited (if at all) title?
  [ cardTitle, setCardTitle ] = useState(cardTitle);

  const handleTitleChange = (event) => {

  }

  return (
        <header>
          <i className="card-icon icon .close-modal"></i>
          <textarea className="list-title" style={{ height: "45px" }}>
            {cardTitle}
          </textarea>
          <p>
            in list <a className="link">{listTitle}</a>
            <i className="sub-icon sm-icon"></i>
          </p>
        </header>
  );
};

export default CardModalHeader;
