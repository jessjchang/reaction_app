import React from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchBoard } from "../features/boards/boards";
import { fetchCard } from "../features/cards/cards";
import CardModalHeader from "./CardModalHeader";
import CardModalLabels from "./CardModalLabels";
import CardModalDueDate from "./CardModalDueDate";
import CardModalDescription from "./CardModalDescription";
import CardModalComments from "./CardModalComments";
import CardModalActivity from "./CardModalActivity";
import CardModalAside from "./CardModalAside";

const CardModal = () => {
  const { id: cardId } = useParams();
  const cards = useSelector(state => state.cards);
  const currentCard = cards.find(card => card._id === cardId);
  const boardId = currentCard ? currentCard.boardId : '';
  const listId = currentCard ? currentCard.listId : '';
  const lists = useSelector(state => state.lists);
  const currentList = lists.find(list => list._id === listId);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCard(cardId));
    if (boardId) {
      dispatch(fetchBoard(boardId));
    }
  }, [dispatch, cardId, boardId]);

  if (!currentCard || !currentList) return null;

  return (
    <div id="modal-container">
      <div className="screen"></div>
      <div id="modal">
        <i className="x-icon icon close-modal"></i>
        <CardModalHeader cardTitle={currentCard.title} listTitle={currentList.title} />
        <section className="modal-main">
          <ul className="modal-outer-list">
            <li className="details-section">
              <ul className="modal-details-list">
                <CardModalLabels />
                <CardModalDueDate />
              </ul>
                <CardModalDescription />
            </li>
              <CardModalComments />
              <CardModalActivity />
          </ul>
        </section>
          <CardModalAside />
      </div>
    </div>
  );
};

export default CardModal;
