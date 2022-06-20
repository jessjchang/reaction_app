import React from "react";
import List from "./List";
import { useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { createList } from "../features/lists/lists";

const Lists = () => {
  const { id: boardId } = useParams();
  const lists = useSelector(state => state.lists);
  const currentLists = lists.filter(list => list.boardId === boardId);
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
    <div id="list-container" className="list-container">
      <div id="existing-lists" className="existing-lists">
        {currentLists.map(list => <List key={list._id} listInfo={list} />)}
      </div>
      <div id="new-list" className={createListClassName}>
        <span onClick={toggleCreateListButtonVisible}>Add a list...</span>
        <input onChange={handleTitleInputChange} type="text" placeholder="Add a list..." value={title} />
        <div>
          <input onClick={handleCreateList} type="submit" className="button" value="Save" />
          <i onClick={toggleCreateListButtonVisible} className="x-icon icon"></i>
        </div>
      </div>
    </div>
  );
};

export default Lists;