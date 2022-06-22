const Board = require("../models/board");
const HttpError = require("../models/httpError");
const Card = require("../models/card");
const List = require("../models/list");
const { validationResult } = require("express-validator");

const getCard = (req, res, next) => {
  const cardId = req.params.id;

  Card.findById(cardId).then((card) => {
    if (!card) {
      return next(new HttpError("Card with specified ID does not exist", 404));
    } else {
      res.json(card);
    }
  }).catch((err) =>
    next(new HttpError("Retrieving card failed, please try again", 500))
  );
};

const addCardToList = (listId, newCardId) => {
  List.findById(listId).then(list => {
    // Board.findOneAndUpdate({ _id: boardId }, { lists: board.lists.concat(newListId) })
    list.cards = list.cards.concat(newCardId);
    list.save();
  })
  .catch(err => {
    next(new HttpError("Adding card to list failed, please try again", 500))
  });
};

const createCard = async (req, res, next) => {
  const errors = validationResult(req.body);

  if (errors.isEmpty()) {
    const { boardId } = await List.findById(req.body.listId);

    Card.create({"title": req.body.card.title, boardId, "listId": req.body.listId})
      .then((card) => {
        addCardToList(card.listId, card._id);
        res.json({
          title: card.title,
          _id: card._id,
          boardId: card.boardId,
          listId: card.listId,
          createdAt: card.createdAt,
          updatedAt: card.updatedAt,
        });
      })
      .catch((err) =>
        next(new HttpError("Creating card failed, please try again", 500))
      );
  } else {
    return next(new HttpError("The input field is empty.", 404));
  }
};

const createComment = (req, res, next) => {
  const errors = validationResult(req.body);

  if (errors.isEmpty()) {
    Card.findById(req.body.cardId)
      .then((card) => {
        card.comments = card.comments.concat(req.body.comment.text);
        card.commentsCount = card.comments.length;
        card.save();
        res.json(card);
      })
      .catch((err) =>
        next(new HttpError("Creating comment failed, please try again", 500))
      );
  } else {
    return next(new HttpError("The input field is empty.", 404));
  }
};

// - `title` - not empty
// - `listId` - not empty, needs to be a valid one that exists
// - `position` - not empty
// - `description` - not empty
// - `archived` - must be a boolean
// - `dueDate` - not empty (validate it's a type date/parse it as such??)
// - `completed` - not empty
// - `labels` - not empty
const validAttributePresent = (reqBody) => {

}

exports.getCard = getCard;
exports.createCard = createCard;
exports.createComment = createComment;
