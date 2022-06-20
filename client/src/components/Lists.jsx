import React from "react";
import List from "./List";
import AddListForm from "./AddListForm";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const Lists = () => {
  const { id: boardId } = useParams();
  const lists = useSelector(state => state.lists);
  const currentLists = lists.filter(list => list.boardId === boardId);

  return (
    <div id="list-container" className="list-container">
      <div id="existing-lists" className="existing-lists">
        {currentLists.map(list => <List key={list._id} listInfo={list} />)}
      </div>
      <AddListForm boardId={boardId} />
    </div>
  );
};

export default Lists;