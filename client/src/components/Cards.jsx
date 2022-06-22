import React from "react";
import Card from "./Card";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Cards = ({ listId }) => {
  const cards = useSelector(state => state.cards);
  const currentCards = cards.filter(card => card.listId === listId);

  return (
    <div id="cards-container" data-id="list-1-cards">
      {currentCards.map(card => (
        <Link key={card._id} to={`/cards/${card._id}`}>
          <Card cardInfo={card} />
        </Link>
      ))}
    </div>
  );
};

export default Cards;
