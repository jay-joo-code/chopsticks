const mongoose = require('mongoose');
var Schema = mongoose.Schema;
var mongoosePaginate = require('mongoose-paginate-v2');

var categorySchema = Schema({
  name: String
});

categorySchema.plugin(mongoosePaginate);
module.exports = mongoose.model('Category', categorySchema);