const { check, oneOf } = require('express-validator');

exports.validateBoard = [check("board.title").not().isEmpty()];

exports.validateList = [check("list.title").not().isEmpty()];

exports.validateAddCard = [check("card.title").not().isEmpty()];

exports.validateComment = [check("comment.text").not().isEmpty()];

exports.validateEditCard = [
  oneOf([
    check("card.title")
      .exists()
      .notEmpty(),
    check("card.listId")
      .exists(),
    check("card.position")
      .exists()
      .isNumeric(),
    check("card.archived")
      .exists(),
    check("card.dueDate")
      .exists(),
    check("card.completed")
      .exists(),
    check("card.labels")
      .exists(),
  ])
];
