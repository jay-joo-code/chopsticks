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
  state: { // new pending delivering complete exchanged refunded canceled cancelConfirmed error
    type: String,
    required: true,
    default: 'new'
  },
  createdAt: {
    type: Date,
    default: new Date
  }
});

orderSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('Order', orderSchema);