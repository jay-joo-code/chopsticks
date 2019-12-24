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
  images: {
    type: [String],
    default: []
  },
  name: {
    type: String,
    default: ''
  },
  price: {
    type: Number,
    default: 0
  },
  deliveryCost: {
    type: Number,
    default: 0
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
  }
});

itemSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('Item', itemSchema);