const mongoose = require('mongoose');
var Schema = mongoose.Schema;
var mongoosePaginate = require('mongoose-paginate');

var itemSchema = Schema({
  name: {
    type: String,
    required: true
  },
  src: {
    type: String,
    required: true
  },
  path: {
    type: String,
    requied: true
  },
  createdAt: {
    type: Date,
    default: new Date()
  }
});

itemSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('File', itemSchema);