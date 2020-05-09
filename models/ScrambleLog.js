const mongoose = require('mongoose');

const { Schema } = mongoose;

const scrambleLogSchema = Schema({
  env: {
    type: String,
    default: 'none',
  },
  createdAt: {
    type: Date,
    default: new Date
  },
});

module.exports = mongoose.model('Scramble Log', scrambleLogSchema);
