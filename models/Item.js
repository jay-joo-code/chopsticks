const mongoose = require('mongoose');
var Schema = mongoose.Schema;
var mongoosePaginate = require('mongoose-paginate');

var itemSchema = Schema({
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  display: {
    type: Boolean,
    default: false,
    required: true
  },
  env: {
    type: String,
    required: true,
    default: 'dev'
  },
  images: {
    type: [String]
  },
  price: {
    type: Number
  },
  firstOrderOption: {
    type: Boolean
  },
  processing_min: {
    type: Number
  },
  processing_max: {
    type: Number
  },
  shipping_min: {
    type: Number
  },
  shipping_max: {
    type: Number
  },
  shipping_price: {
    type: Number
  },
  createdAt: {
    type: Date,
    default: new Date()
  },
  updated_at: {
    type: Date
  }
});

itemSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('Item', itemSchema);