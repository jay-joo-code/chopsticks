const mongoose = require('mongoose');

const { Schema } = mongoose;

const scrambleLogSchema = Schema({
  createdAt: {
    type: Date,
    default: new Date
  },
});

module.exports = mongoose.model('Scramble Log', scrambleLogSchema);
