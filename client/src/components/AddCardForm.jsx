import React from "react";
import { useState } from 'react';
import { useDispatch } from "react-redux";
import { createCard } from "../features/cards/cards";

// COPIED OVER FROM ADDLISTFORM - NEED TO ADJUST FOR ADDING CARD
const AddCardForm = ({boardId}) => {
  const dispatch = useDispatch();

  const [createListVisible, setCreateListVisible] = useState(false);
  const createListClassName = createListVisible ? 'new-list selected' : 'new-list';
  const [title, setTitle] = useState('');

  const toggleCreateListButtonVisible = () => {
    setCreateListVisible(!createListVisible);
  };

  const handleTitleInputChange = (event) => {
    setTitle(event.target.value);
  };

  const resetTitle = () => {
    setTitle('');
  };

  const handleCreateList = (event) => {
    event.preventDefault();
    dispatch(createList({ title, boardId, callback: resetTitle }));
  };

  return (
    <div id="new-list" className={createListClassName}>
      <span onClick={toggleCreateListButtonVisible}>Add a list...</span>
      <input onChange={handleTitleInputChange} type="text" placeholder="Add a list..." value={title} />
      <div>
        <input onClick={handleCreateList} type="submit" className="button" value="Save" />
        <i onClick={toggleCreateListButtonVisible} className="x-icon icon"></i>
      </div>
    </div>
  );
};

export default AddCardForm;
