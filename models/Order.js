const mongoose = require('mongoose');
var Schema = mongoose.Schema;
var mongoosePaginate = require('mongoose-paginate-v2');

var orderSchema = Schema({
  deliv : {
    type: Object,
    required: true,
  },
  bootpay : {
    type: Object,
    required: true,
  },
  cartObj: {
    type: Object,
    required: true,
  },
  buyer: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  seller: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  state: { // pending delivering complete exchanged refunded canceled error
    type: String,
    required: true,
    default: 'pending'
  },
  seen: {
    type: Boolean,
    required: true,
    default: false
  },
  createdAt: {
    type: Date,
    default: new Date
  }
});

orderSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('Order', orderSchema);