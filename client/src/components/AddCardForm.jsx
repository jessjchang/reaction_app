import React from "react";
import { useState } from 'react';
import { useDispatch } from "react-redux";
import { createCard } from "../features/cards/cards";

const AddCardForm = ({ listId, activeListId, setActiveListId }) => {
  const dispatch = useDispatch();

  // const [createCardFormVisible, setCreateCardFormVisible] = useState(false);
  const createCardFormVisible = listId === activeListId;
  const [title, setTitle] = useState('');

  const addCardFormClassName = createCardFormVisible ? 'active-card' : '';
  const displayFormLinkClassName = createCardFormVisible ? 'add-card-toggle' : '';

  //

  const toggleCreateCardVisible = () => {
    // setCreateCardFormVisible(!createCardFormVisible);
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
    // <div id="new-list" className={createListClassName}>
    //   <span onClick={toggleCreateListButtonVisible}>Add a list...</span>
    //   <input onChange={handleTitleInputChange} type="text" placeholder="Add a list..." value={title} />
    //   <div>
    //     <input onClick={handleCreateList} type="submit" className="button" value="Save" />
    //     <i onClick={toggleCreateListButtonVisible} className="x-icon icon"></i>
    //   </div>
    // </div>
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
