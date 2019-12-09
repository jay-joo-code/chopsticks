const mongoose = require('mongoose');

const pollSchema = new mongoose.Schema({
  name: String,
  sourcePosition: [],
  sourceId: String,
  questions: [{
    question: String,
    options: [{
      option: String,
      votes: [String]
    }]
  }],
  clients: {type: [String], default: []},
  active: {type: Boolean, default: true},
  currentQuestion: Number
})

const Poll = mongoose.model('Poll', pollSchema);

module.exports = Poll;
