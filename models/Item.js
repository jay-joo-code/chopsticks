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
    default: true,
    required: true
  },
  images: {
    type: [String],
    default: []
  },
  primaryImageIndex: {
    type: Number,
    default: 0
  },
  name: {
    type: String,
    default: ''
  },
  price: {
    type: Number,
    default: 0
  },
  madeOnOrder: {
    type: Boolean,
    default: false
  },
  stock: {
    type: Number,
    default: 0
  },
  category: {
    type: String,
    default: ''
  },
  content: String,
  desc: [{
    value: String,
    isImage: Boolean,
  }],
  options: [{
    name: String,
    priceChange: Number
  }],
  optionsTwo: [{
    name: String,
    priceChange: Number
  }],
  deliveryCost: {
    type: Number,
    default: 0
  },
  processingMin: {
    type: Number,
    default: 0
  },
  processingMax: {
    type: Number,
    default: 0
  },
  deliveryMin: {
    type: Number,
    default: 0
  },
  deliveryMax: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: new Date()
  }
});

itemSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('Item', itemSchema);