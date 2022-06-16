import React from "react";
import List from "./List";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const Lists = () => {
  const { id } = useParams();
  const lists = useSelector(state => state.lists);
  const currentLists = lists.filter(list => list.boardId === id);

  return (
    <div id="list-container" className="list-container">
      <div id="existing-lists" className="existing-lists">
        {currentLists.map(list => <List key={list._id} listInfo={list} />)}
      </div>
      <div id="new-list" className="new-list">
        <span>Add a list...</span>
        <input type="text" placeholder="Add a list..." />
        <div>
          <input type="submit" className="button" value="Save" />
          <i className="x-icon icon"></i>
        </div>
      </div>
    </div>
  );
};

export default Lists;