const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const { ObjectId } = Schema.Types;

const CardSchema = new Schema({
  title: {
    type: String,
    required: [true, 'The Card title is required']
  },
  description: {
    type: String,
  },
  labels: [
    {
      type: String
    }
  ],
  position: {
    type: Number,
    required: true
  },
  archived: {
    type: Boolean,
    default: false
  },
  dueDate: {
    type: Date,
  },
  completed: {
    type: Boolean,
    default: false
  },
  comments: [
    {
      type: String
    }
  ],
  actions: [
    {
      type: String
    }
  ],
  commentsCount: {
    type: Number,
  },
  listId: {
    type: ObjectId,
    ref: "List"
  },
  boardId: {
    type: ObjectId,
    ref: "Board"
  }
})

const Card = mongoose.model('cards', CardSchema);

module.exports = Card;
