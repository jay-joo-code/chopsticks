const mongoose = require('mongoose');
var Schema = mongoose.Schema;
var mongoosePaginate = require('mongoose-paginate-v2');

var orderSchema = Schema({
  deliv : {
    type: {
      recipient: {
        type: String,
        required: true
      },
      address: {
        type: String,
        required: true
      },
      addressDetail: {
        type: String,
        required: true
      },
      mobile: {
        type: String,
        required: true
      },
      company: String,
      companyCode: String,
      invoice: String
    },
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
  state: { // pending delivering complete exchangePending exchanged exchangeRejected refundPending refunded cancelPending canceled error
    type: String,
    required: true,
    default: 'pending'
  },
  stateMsg: {
    type: String
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