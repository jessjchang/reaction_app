const Board = require("../models/board");
const HttpError = require("../models/httpError");
const Card = require("../models/card");
const List = require("../models/list");
const { validationResult } = require("express-validator");

const createList = (req, res, next) => {
  const errors = validationResult(req);

  if (errors.isEmpty()) {
    List.create(req.body.list)
      .then((list) => {
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
