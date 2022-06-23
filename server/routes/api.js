const express = require ('express');
const router = express.Router();
const boardsController = require("../controllers/boardsController");
const listsController = require("../controllers/listsController");
const cardsController = require("../controllers/cardsController");
const { validateBoard, validateAddCard, validateEditCard, validateList, validateComment } = require("../validators/validators");

router.get('/boards',boardsController.getBoards );

router.get('/boards/:id',boardsController.getBoard );

router.post('/boards', validateBoard, boardsController.createBoard );

router.post('/lists', validateList, listsController.createList );

router.put('/lists/:id', listsController.editList);

router.get('/cards/:id', cardsController.getCard);

router.post('/cards', validateAddCard, cardsController.createCard);

router.post('/comments', validateComment, cardsController.createComment);

router.put('/cards/:id', validateEditCard, cardsController.editCard);

module.exports = router;
