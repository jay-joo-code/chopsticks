const mongoose = require('mongoose');
var Schema = mongoose.Schema;
var mongoosePaginate = require('mongoose-paginate-v2');

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
  created: {
    type: Boolean,
    default: false,
    required: true
  },
  image: String,
  name: {
    type: String,
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
  subcat: String,
  style: { // crafted || original
    type: String
  },
  content: String,
  intro: String,
  optGrps: {
    type: [{
      title: String,
      opts: [ String ]
    }],
    default: []
  },
  optData: {
    type: [{
      index: [ Number ],
      optString: String,
      diff: Number,
      qty: Number,
      trackQty: Boolean
    }],
    default: []
  },
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
    default: new Date
  }
});

itemSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('Item', itemSchema);