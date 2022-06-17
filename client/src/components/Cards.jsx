import React from "react";
import Card from "./Card";
import { useSelector } from "react-redux";

const Cards = ({ listId }) => {
  const cards = useSelector(state => state.cards);
  const currentCards = cards.filter(card => card.listId === listId);

  return (
    <div id="cards-container" data-id="list-1-cards">
      {currentCards.map(card => <Card key={card._id} cardInfo={card} />)}

      <div className="add-dropdown add-bottom">
        <div className="card">
          <div className="card-info"></div>
          <textarea name="add-card"></textarea>
          <div className="members"></div>
        </div>
        <a className="button">Add</a>
        <i className="x-icon icon"></i>
        <div className="add-options">
          <span>...</span>
        </div>
      </div>

      <div className="add-card-toggle" data-position="bottom">
        Add a card...
      </div>

    </div>
  );
};

export default Cards;
