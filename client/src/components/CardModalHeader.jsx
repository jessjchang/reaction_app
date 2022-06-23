import React from "react";

const CardModalHeader = ({cardTitle, listTitle}) => {
  if (!cardTitle || !listTitle) return null;

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
