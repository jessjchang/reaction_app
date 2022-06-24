import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { editCard } from "../features/cards/cards";

const CardModalHeader = ({card, listTitle}) => {
  const dispatch = useDispatch();
  const [ cardTitle, setCardTitle ] = useState(card.title);

  const handleTitleChange = (event) => {
    setCardTitle(event.target.value);
  }

  const handleEditTitle = () => {
    dispatch(editCard({cardId: card._id, card: {"title": cardTitle}}));
  }

  return (
        <header>
          <i className="card-icon icon .close-modal"></i>
          <textarea onChange={handleTitleChange} onBlur={handleEditTitle} className="list-title" style={{ height: "45px" }} value={cardTitle}>
          </textarea>
          <p>
            in list <a className="link">{listTitle}</a>
            <i className="sub-icon sm-icon"></i>
          </p>
        </header>
  );
};

export default CardModalHeader;
