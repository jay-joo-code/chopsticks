const mongoose = require('mongoose');
var Schema = mongoose.Schema;
var mongoosePaginate = require('mongoose-paginate-v2');

var transactionSchema = Schema({
  deliv : {
    type: Object,
    required: true,
  },
  cart: {
    type: Object,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  buyer: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  bootpay: {
    type: Object,
    required: true,
  },
  createdAt: {
    type: Date,
    default: new Date()
  }
});

transactionSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('Transaction', transactionSchema);