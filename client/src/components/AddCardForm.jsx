import React from "react";
import { useState, useEffect } from 'react';
import { useDispatch } from "react-redux";
import { createCard } from "../features/cards/cards";

const AddCardForm = ({ listId, activeListId, setActiveListId }) => {
  const dispatch = useDispatch();

  const createCardFormVisible = listId === activeListId;
  const [title, setTitle] = useState('');

  const addCardFormClassName = createCardFormVisible ? 'active-card' : '';
  const displayFormLinkClassName = createCardFormVisible ? 'add-card-toggle' : '';

  useEffect(() => {
    resetTitle();
  }, [activeListId])

  const toggleCreateCardVisible = () => {
    setActiveListId(listId);
  };

  const handleTitleInputChange = (event) => {
    setTitle(event.target.value);
  };

  const resetTitle = () => {
    setTitle('');
  };

  const handleCreateCard = (event) => {
    event.preventDefault();
    dispatch(createCard({ title, listId, callback: resetTitle }));
  };

  return (
    <>
      <div className={`add-dropdown add-bottom ${addCardFormClassName}`}>
        <div className="card">
          <div className="card-info"></div>
          <textarea name="add-card" value={title} onChange={handleTitleInputChange}></textarea>
          <div className="members"></div>
        </div>
        <a className="button" onClick={handleCreateCard}>Add</a>
        <i className="x-icon icon"></i>
        <div className="add-options">
          <span>...</span>
        </div>
      </div>

      <div className={displayFormLinkClassName} onClick={toggleCreateCardVisible} data-position="bottom">
        Add a card...
      </div>
    </>
  );
};

export default AddCardForm;
