const mongoose = require('mongoose');
var Schema = mongoose.Schema;
var mongoosePaginate = require('mongoose-paginate');

var categorySchema = Schema({
  name: String
});

categorySchema.plugin(mongoosePaginate);
module.exports = mongoose.model('Category', categorySchema);