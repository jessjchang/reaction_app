const Board = require("../models/board");
const HttpError = require("../models/httpError");
const Card = require("../models/card");
const List = require("../models/list");
const { validationResult } = require("express-validator");

const getBoards = (req, res, next) => {
  Board.find({}, "title _id createdAt updatedAt").then((boards) => {
    res.json(boards);
  });
};

const getBoard = (req, res, next) => {
  const boardId = req.params.id;

  Board.findById(boardId).populate({
    path: "lists",
    populate: {
      path: "cards",
      model: "Card"
    }
  }).then((board) => {
    if (!board) {
      return next(new HttpError("Board with specified ID does not exist", 404));
    } else {
      res.json(board);
    }
  }).catch((err) =>
    next(new HttpError("Retrieving board failed, please try again", 500))
  );
}

const createBoard = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    Board.create(req.body.board)
      .then((board) => {
        res.json({
          title: board.title,
          _id: board._id,
          createdAt: board.createdAt,
          updatedAt: board.updatedAt,
        });
      })
      .catch((err) =>
        next(new HttpError("Creating board failed, please try again", 500))
      );
  } else {
    return next(new HttpError("The input field is empty.", 404));
  }
};

exports.getBoards = getBoards;
exports.getBoard = getBoard;
exports.createBoard = createBoard;
