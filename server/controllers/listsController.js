const Board = require("../models/board");
const HttpError = require("../models/httpError");
const Card = require("../models/card");
const List = require("../models/list");
const { validationResult } = require("express-validator");

const addListToBoard = (boardId, newListId) => {
  Board.findById(boardId).then(board => {
    // Board.findOneAndUpdate({ _id: boardId }, { lists: board.lists.concat(newListId) })
    board.lists = board.lists.concat(newListId);
    board.save();
  })
  .catch(err => {
    next(new HttpError("Adding list to board failed, please try again", 500))
  });
}

const createList = (req, res, next) => {
  const errors = validationResult(req.body);
  if (errors.isEmpty()) {
    List.create({"title": req.body.title, "boardId": req.body.boardId})
      .then((list) => {
        addListToBoard(list.boardId, list._id);
        res.json({
          title: list.title,
          _id: list._id,
          boardId: list.boardId,
          createdAt: list.createdAt,
          updatedAt: list.updatedAt,
        });
      })
      .catch((err) =>
        next(new HttpError("Creating list failed, please try again", 500))
      );
  } else {
    return next(new HttpError("The input field is empty.", 404));
  }
};

exports.createList = createList;
