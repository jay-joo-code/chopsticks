const mongoose = require('mongoose');
var Schema = mongoose.Schema;
var mongoosePaginate = require('mongoose-paginate-v2');

var transactionErrorSchema = Schema({
  error: {
    message: String,
    data: Object
  },
  createdAt: {
    type: Date,
    default: new Date
  }
});

transactionErrorSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('Transaction Error', transactionErrorSchema);